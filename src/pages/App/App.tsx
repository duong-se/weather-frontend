import React from 'react'
import ForecastList from '../../components/ForecastList';
import LocationSearchForm from '../../components/LocationSearchForm'
import { Weather, WeatherLocation } from '../../typings';

export type FetchWeatherAPIByLocationNameParams = {
  locationName: string
}


const fetchWeatherAPIByLocationName = ({ locationName }: FetchWeatherAPIParams) => {
  return new Promise((resolve, reject) => {
    fetch(`https://www.metaweather.com/api/location/search/?query=${locationName}`)
      .then((response) => response.json())
      .then(result => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
  })
}

const App: React.FC = () => {
  const [locations, setLocations] = React.useState<WeatherLocation[]>([])
  const [weather, setWeather] = React.useState<Weather>()
  const [selectedWeather, setSelectedWeather] = React.useState<number>(0)

  React.useEffect(() => {
    fetchWeatherAPI(location)
  })
  return (
    <div className="container">
      <div className="row">
        <LocationSearchForm />
      </div>
      <div className="row">{locations?.[0]?.title ?? ''}</div>
      <div className="row">{weather?.consolidated_weather?.[selectedWeather]?.applicable_date ?? ''}</div>
      <div className="row">{weather?.consolidated_weather?.[selectedWeather]?.the_temp}</div>
      <ForecastList consolidatedWeathers={[]} />
    </div>
  );
}

export default App;
