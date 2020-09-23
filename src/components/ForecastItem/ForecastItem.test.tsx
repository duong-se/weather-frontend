import React from 'react'
import { shallow } from 'enzyme'
import ForecastItem from './ForecastItem'
import { mockConsolidatedWeather } from '../../service/__mocks__/mockConsolidatedWeather'

describe('ForecastItem', () => {
  it('should match snapshot', () => {
    const mockOnClick = jest.fn()
    const wrapper = shallow(<ForecastItem consolidatedWeather={mockConsolidatedWeather} onClick={mockOnClick} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should call onClick when click', () => {
    const mockOnClick = jest.fn()
    const wrapper = shallow(<ForecastItem consolidatedWeather={mockConsolidatedWeather} onClick={mockOnClick} />)
    wrapper.simulate('click')
    expect(mockOnClick).toBeCalledTimes(1)
  })
  it('should show correct data', () => {
    const mockOnClick = jest.fn()
    const wrapper = shallow(<ForecastItem consolidatedWeather={mockConsolidatedWeather} onClick={mockOnClick} />)
    const dateText = wrapper.find('.card-subtitle').text()
    const minTempText = wrapper.find('[data-test="min-temp"]').text()
    const maxTempText = wrapper.find('[data-test="max-temp"]').text()
    expect(dateText).toEqual('Tuesday')
    expect(minTempText).toEqual('15℃')
    expect(maxTempText).toEqual('24℃')
  })
})
