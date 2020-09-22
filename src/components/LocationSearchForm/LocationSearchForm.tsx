import React from 'react'
import LocationInput from '../LocationInput'

export const LocationSearchForm: React.FC = () => {
  return (
    <form className="w-100">
      <div className="row">
        <div className="col">
          <LocationInput />
        </div>
        <div className="col">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  )
}

export default LocationSearchForm
