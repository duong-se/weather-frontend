import React from 'react'
import { shallow } from 'enzyme'
import ForecastList, { handleSelectDay } from './ForecastList'
import { mockConsolidatedWeathers } from '../../service/__mocks__/mockConsolidatedWeathers'

describe('ForecastList', () => {
  describe('ForecastList', () => {
    it('should match snapshot', () => {
      const mockSetCurrentWeather = jest.fn()
      const wrapper = shallow(
        <ForecastList consolidatedWeathers={mockConsolidatedWeathers} setCurrentWeather={mockSetCurrentWeather} />,
      )
      expect(wrapper).toMatchSnapshot()
    })
    it('should render current weather', () => {
      const mockSetCurrentWeather = jest.fn()
      const wrapper = shallow(
        <ForecastList consolidatedWeathers={mockConsolidatedWeathers} setCurrentWeather={mockSetCurrentWeather} />,
      )
      const items = wrapper.find('[data-test="forecast-item"]')
      expect(items).toHaveLength(6)
    })
    it('should render current weather', () => {
      const mockSetCurrentWeather = jest.fn()
      const wrapper = shallow(
        <ForecastList consolidatedWeathers={undefined as any} setCurrentWeather={mockSetCurrentWeather} />,
      )
      expect(wrapper).toMatchSnapshot()
    })
    it('should render current weather', () => {
      const mockSetCurrentWeather = jest.fn()
      const wrapper = shallow(
        <ForecastList consolidatedWeathers={undefined as any} setCurrentWeather={mockSetCurrentWeather} />,
      )
      const items = wrapper.find('[data-test="forecast-item"]')
      expect(items).toHaveLength(0)
    })
  })

  describe('handleSelectDay', () => {
    it('should call setCurrentWeather with index', () => {
      const mockSetCurrentWeather = jest.fn()
      const fn = handleSelectDay(1, mockSetCurrentWeather)
      fn()
      expect(mockSetCurrentWeather).toBeCalledWith(1)
    })
  })
})
