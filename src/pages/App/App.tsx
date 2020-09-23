import React from 'react'
import Alert from '../../components/Alert/Alert'
import ForecastList from '../../components/ForecastList'
import LocationSearchForm from '../../components/LocationSearchForm'
import { fetchLocation, fetchWeather } from '../../service/api'
import { Weather } from '../../typings'
import { getDay } from '../../utils/getDay'
import { roundNumber } from '../../utils/roundNumber'
import style from './App.module.scss'

export const renderCurrentWeatherInfo = (currentWeatherIndex: number, weather?: Weather) => {
  const currentWeather = weather?.consolidated_weather?.[currentWeatherIndex]
  if (!currentWeather) {
    return null
  }
  return (
    <div className="text-center">
      <h1>{currentWeather?.weather_state_name}</h1>
      {currentWeather?.the_temp && (
        <div>
          <span className={style.temperatureText}>{roundNumber(currentWeather?.the_temp)}</span>
          <span>&#8451;</span>
        </div>
      )}
      <h4>{weather?.title ?? ''}</h4>
      <h6>{getDay(currentWeather?.applicable_date)}</h6>
    </div>
  )
}

export const renderError = (errorMessage?: string) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div className="row no-gutters mb-4">
      <Alert message={errorMessage} />
    </div>
  )
}

export type OnSubmitParams = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
  setWeather: React.Dispatch<React.SetStateAction<Weather | undefined>>
}

export const onSubmit = ({ setLoading, setError, setWeather }: OnSubmitParams) => async (
  e: React.BaseSyntheticEvent<any>,
) => {
  e.preventDefault()
  setLoading(true)
  setError('')
  setWeather(undefined)
  const locationName = e?.target?.locationName?.value
  try {
    const locations = await fetchLocation({ locationName })
    const firstWeatherLocationWoeid = locations?.[0]?.woeid
    const weathers = await fetchWeather({ woeid: firstWeatherLocationWoeid })
    setWeather(weathers)
  } catch (error) {
    setError(error?.message)
  } finally {
    setLoading(false)
  }
}

const App: React.FC = () => {
  const [weather, setWeather] = React.useState<Weather>()
  const [isLoading, setLoading] = React.useState<boolean>(false)
  const [errorMessage, setError] = React.useState<string>()
  const [currentWeatherIndex, setCurrentWeatherIndex] = React.useState<number>(0)

  return (
    <div className={`${style.root} container-fluid`}>
      <div className={`card p-4 ${style.weatherWidget}`}>
        <div className={`row no-gutters mb-4 ${style.information}`}>
          <LocationSearchForm isLoading={isLoading} onSubmit={onSubmit({ setLoading, setError, setWeather })} />
        </div>
        {renderError(errorMessage)}
        <div className={`row no-gutters mb-4 ${style.information}`}>
          {renderCurrentWeatherInfo(currentWeatherIndex, weather)}
        </div>
        <div className={`row no-gutters ${style.information}`}>
          <ForecastList
            setCurrentWeather={setCurrentWeatherIndex}
            consolidatedWeathers={weather?.consolidated_weather ?? []}
          />
        </div>
      </div>
    </div>
  )
}

export default App
