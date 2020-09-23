import React from 'react'
import { shallow } from 'enzyme'
import Spin from './Spin'

describe('Spin', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Spin />)
    expect(wrapper).toMatchSnapshot()
  })
})
