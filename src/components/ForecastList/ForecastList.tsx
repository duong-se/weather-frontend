import React from 'react'
import { ConsolidatedWeather } from '../../typings'
import ForecastItem from '../ForecastItem'

export type ForecastListProps = {
  consolidatedWeathers: ConsolidatedWeather[]
}


export const ForecastList: React.FC<ForecastListProps> = ({ consolidatedWeathers = [] }) => {
  return (
    <div className="row">
      {consolidatedWeathers?.map((item: ConsolidatedWeather) => <ForecastItem key={item.id} consolidatedWeather={item} />)}
    </div>
  )
}

export default ForecastList
