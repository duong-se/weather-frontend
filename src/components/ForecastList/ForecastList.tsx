import React from 'react'
import { ConsolidatedWeather } from '../../typings'
import ForecastItem from '../ForecastItem'

export type ForecastListProps = {
  consolidatedWeathers: ConsolidatedWeather[]
  setCurrentWeather: React.Dispatch<React.SetStateAction<number>>
}

export const handleSelectDay = (
  index: number,
  setCurrentWeather: React.Dispatch<React.SetStateAction<number>>,
) => () => {
  setCurrentWeather(index)
}

export const ForecastList: React.FC<ForecastListProps> = ({ consolidatedWeathers = [], setCurrentWeather }) => {
  return (
    <div className="row justify-content-center no-gutters">
      {consolidatedWeathers?.map((item: ConsolidatedWeather, index: number) => {
        return (
          <ForecastItem
            data-test="forecast-item"
            onClick={handleSelectDay(index, setCurrentWeather)}
            key={item.id}
            consolidatedWeather={item}
          />
        )
      })}
    </div>
  )
}

export default ForecastList
