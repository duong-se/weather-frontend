import React from 'react'
import { ConsolidatedWeather } from '../../typings'
import { roundNumber } from '../../utils/roundNumber'
import { getDay } from '../../utils/getDay'
import style from './ForecastItem.module.scss'

export type ForeCastItemProps = {
  consolidatedWeather: ConsolidatedWeather
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const ForecastItem: React.FC<ForeCastItemProps> = ({ consolidatedWeather, onClick }) => {
  return (
    <button className={`m-1 btn btn-light ${style.root}`} onClick={onClick}>
      <h6 className={'card-subtitle mb-2 mt-2 text-muted'}>{getDay(consolidatedWeather?.applicable_date)}</h6>
      <div className={`${style.weatherStateImg} mb-2`}>
        <img
          alt={consolidatedWeather?.weather_state_abbr}
          src={`/static/img/weather/${consolidatedWeather?.weather_state_abbr}.svg`}
        />
      </div>
      <div className={`row card-text d-flex ${style.temperature}`}>
        <h6 data-test="min-temp">{roundNumber(consolidatedWeather?.min_temp)}&#8451;</h6>
        <h6 data-test="max-temp">{roundNumber(consolidatedWeather?.max_temp)}&#8451;</h6>
      </div>
    </button>
  )
}

export default ForecastItem
