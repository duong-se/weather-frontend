import React from 'react'
import LocationInput from '../LocationInput'
import Spin from '../Spin'

export type LocationSearchFormProps = {
  onSubmit: (e: React.BaseSyntheticEvent<any>) => void
  isLoading: boolean
}

export const LocationSearchForm: React.FC<LocationSearchFormProps> = ({ onSubmit, isLoading }) => {
  return (
    <form className="w-100" onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm-8 col-md-8 col-lg-3 mb-4">
          <LocationInput />
        </div>
        <div className="col-sm-4 cold-md-4 col-lg-3 mb-4">
          <button type="submit" className="btn btn-primary w-100">
            {isLoading ? <Spin /> : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default LocationSearchForm
