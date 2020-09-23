import React from 'react'
import Alert from '../../components/Alert/Alert'
import ForecastList from '../../components/ForecastList'
import LocationSearchForm from '../../components/LocationSearchForm'
import { fetchLocationWeather } from '../../service/api'
import { Weather } from '../../typings'
import { getDay } from '../../utils/getDay'
import { roundNumber } from '../../utils/roundNumber'
import style from './App.module.scss'

export const renderWeatherStateImage = (currentWeatherIndex: number, weather?: Weather) => {
  const weatherStateAbbr = weather?.consolidated_weather?.[currentWeatherIndex]?.weather_state_abbr
  if (!weatherStateAbbr) {
    return null
  }
  return (
    <div className="col text-center">
      <img
        alt={weatherStateAbbr}
        className={style.weatherStateImage}
        src={`/static/img/weather/${weatherStateAbbr}.svg`}
      />
    </div>
  )
}

export const renderCurrentWeatherInfo = (currentWeatherIndex: number, weather?: Weather) => {
  const currentWeather = weather?.consolidated_weather?.[currentWeatherIndex]
  if (!currentWeather) {
    return null
  }
  return (
    <div className="col">
      <h4>{weather?.title ?? ''}</h4>
      <h5>{currentWeather?.weather_state_name}</h5>
      <h6>{getDay(currentWeather?.applicable_date)}</h6>
      {currentWeather?.the_temp && <h1>{roundNumber(currentWeather?.the_temp)}&#8451;</h1>}
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

export const onSubmit = ({ setLoading, setError, setWeather }: OnSubmitParams) => (
  e: React.BaseSyntheticEvent<any>,
) => {
  e.preventDefault()
  setLoading(true)
  setError('')
  setWeather(undefined)
  const locationName = e?.target?.locationName?.value
  fetchLocationWeather({ locationName })
    .then((result) => {
      setWeather(result)
    })
    .catch((error) => {
      setError(error.message)
    })
    .finally(() => {
      setLoading(false)
    })
}

const App: React.FC = () => {
  const [weather, setWeather] = React.useState<Weather>()
  const [isLoading, setLoading] = React.useState<boolean>(false)
  const [errorMessage, setError] = React.useState<string>()
  const [currentWeatherIndex, setCurrentWeatherIndex] = React.useState<number>(0)

  return (
    <div className={`${style.root} container-fluid`}>
      <div className={`card p-4 ${style.weatherWidget}`}>
        <div className="row no-gutters my-4">
          <LocationSearchForm isLoading={isLoading} onSubmit={onSubmit({ setLoading, setError, setWeather })} />
        </div>
        {renderError(errorMessage)}
        <div className="row no-gutters mb-4">
          {renderWeatherStateImage(currentWeatherIndex, weather)}
          {renderCurrentWeatherInfo(currentWeatherIndex, weather)}
        </div>
        <div className="row no-gutters mb-4">
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
