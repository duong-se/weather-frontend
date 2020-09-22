import React from 'react'
import { ReactComponent as SearchIcon } from './SearchIcon.svg'

export const TextInput: React.FC = () => {
  return (
    <div className="input-group flex-nowrap">
      <div className="input-group-prepend">
        <span className="input-group-text"><SearchIcon/></span>
      </div>
      <input name="locationName" type="text" className="form-control" id="locationName" placeholder="Search" />
    </div>
  )
}

export default TextInput
