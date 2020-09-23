import fetch from 'isomorphic-fetch'
import { Weather, WeatherLocation } from '../typings'

export type FetchLocationParams = {
  locationName: string
}

export const ERROR_MESSAGE = {
  LOCATION_NOT_FOUND: 'Location Not Found',
  FALLBACK_ERROR: 'Error when get the weather',
}

export const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
}

export const fetchLocation = ({ locationName }: FetchLocationParams): Promise<WeatherLocation[]> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/location/search/?query=${locationName}`)
      .then((response) => {
        if (response.status !== HTTP_STATUS.OK) {
          reject({ message: ERROR_MESSAGE.FALLBACK_ERROR })
          return
        }
        if (response.status === HTTP_STATUS.OK) {
          return response.json()
        }
      })
      .then(resolve)
      .catch(reject)
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
        if (response.status === HTTP_STATUS.NOT_FOUND) {
          reject({ message: ERROR_MESSAGE.LOCATION_NOT_FOUND })
          return
        }
        if (response.status !== HTTP_STATUS.OK) {
          reject({ message: ERROR_MESSAGE.FALLBACK_ERROR })
          return
        }
        if (response.status === HTTP_STATUS.OK) {
          return response.json()
        }
      })
      .then(resolve)
      .catch(reject)
  })
}
