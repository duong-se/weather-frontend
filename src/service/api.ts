import fetch from 'isomorphic-fetch'
import { Weather, WeatherLocation } from '../typings'

export type FetchLocationParams = {
  locationName: string
}

export const ERROR_MESSAGE = {
  LOCATION_NOT_FOUND: 'Location Not Found',
  FALLBACK_ERROR: 'Error when get the weather',
}

export const fetchLocation = ({ locationName }: FetchLocationParams): Promise<WeatherLocation[]> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/location/search/?query=${locationName}`)
      .then((response) => {
        if (response.status !== 200) {
          reject({ message: ERROR_MESSAGE.FALLBACK_ERROR })
          return
        }
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((result) => resolve(result))
      .catch((error) => reject(error))
  })
}

export type FetchWeatherParams = {
  woeid: number
}

export const fetchWeather = ({ woeid }: FetchWeatherParams): Promise<Weather> => {
  return new Promise((resolve, reject) => {
    if (!woeid) {
      reject({ message: ERROR_MESSAGE.LOCATION_NOT_FOUND })
      return
    }
    fetch(`${process.env.REACT_APP_API_URL}/api/location/${woeid}/`)
      .then((response) => {
        if (response.status === 400) {
          reject({ message: ERROR_MESSAGE.LOCATION_NOT_FOUND })
          return
        }
        if (response.status !== 200) {
          reject({ message: ERROR_MESSAGE.FALLBACK_ERROR })
          return
        }
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((result) => resolve(result))
      .catch((error) => reject(error))
  })
}

export type FetchLocationWeather = {
  locationName: string
}

export const fetchLocationWeather = ({ locationName }: FetchLocationWeather): Promise<Weather> => {
  return new Promise((resolve, reject) => {
    fetchLocation({ locationName })
      .then((result) => {
        const firstWeatherLocationWoeid = result?.[0]?.woeid
        fetchWeather({ woeid: firstWeatherLocationWoeid }).then((result) => {
          resolve(result)
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}
