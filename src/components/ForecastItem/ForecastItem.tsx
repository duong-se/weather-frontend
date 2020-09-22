import React from 'react'
import { ConsolidatedWeather } from '../../typings'
import { roundNumber } from '../../utils/roundNumber'
import { getDay } from '../../utils/getDay'
import style from './ForecastItem.module.scss'

export type ForeCastItemProps = {
  consolidatedWeather: ConsolidatedWeather
}

export const ForecastItem: React.FC<ForeCastItemProps> = ({ consolidatedWeather }) => {
  return (
    <div className={`card mx-2 text-center ${style.root}`}>
      <div className="card-body p-1">
        <h6 className={`card-subtitle mb-2 mt-2 text-muted ${style.textFontSize}`}>{getDay(consolidatedWeather.applicable_date)}</h6>
        <div className={`${style.weatherStateImg} mb-2`}>
          <img src={`/static/img/weather/${consolidatedWeather.weather_state_abbr}.svg`}/>
        </div>
        <div className={`row card-text d-flex ${style.temperature}`}>
          <h6 className={style.textFontSize}>{roundNumber(consolidatedWeather.min_temp)}&#8451;</h6>
          <h6 className={style.textFontSize}>{roundNumber(consolidatedWeather.max_temp)}&#8451; </h6>
        </div>
      </div>
    </div>
  )
}

export default ForecastItem
