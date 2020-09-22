import React from 'react'
import { shallow } from "enzyme"
import { LocationSearchForm } from "./LocationSearchForm"

describe('LocationSearchForm', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<LocationSearchForm />)
    expect(wrapper).toMatchSnapshot()
  })
})
