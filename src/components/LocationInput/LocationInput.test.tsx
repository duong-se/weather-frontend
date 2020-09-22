import React from 'react'
import { shallow } from "enzyme"
import LocationInput from "./LocationInput"

describe('LocationInput', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<LocationInput />)
    expect(wrapper).toMatchSnapshot()
  })
})
