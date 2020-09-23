import React from 'react'
import Spin from '../Spin'
import { ReactComponent as SearchIcon } from './SearchIcon.svg'
import style from './LocationSearchForm.module.scss'

export type LocationSearchFormProps = {
  onSubmit: (e: React.BaseSyntheticEvent<any>) => void
  isLoading: boolean
}

export const LocationSearchForm: React.FC<LocationSearchFormProps> = ({ onSubmit, isLoading }) => {
  return (
    <form className="w-100" onSubmit={onSubmit}>
      <div className="input-group flex-nowrap">
        <input
          name="locationName"
          type="text"
          className="form-control"
          id="locationName"
          placeholder="Search"
          required
        />
        <button type="submit" className={`input-group-prepend ${style.searchButton}`}>
          {isLoading ? (
            <Spin />
          ) : (
            <span className={style.searchIcon}>
              <SearchIcon />
            </span>
          )}
        </button>
      </div>
    </form>
  )
}

export default LocationSearchForm
