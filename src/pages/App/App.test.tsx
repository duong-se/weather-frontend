import React from 'react'
import { shallow } from 'enzyme'
import App, { renderCurrentWeatherInfo, renderError, renderWeatherStateImage, onSubmit } from './App'
import { fetchLocationWeather } from '../../service/api'
import { Weather } from '../../typings'
import { mockWeather } from '../../service/__mocks__/mockWeather'

jest.mock('../../service/api', () => ({ fetchLocationWeather: jest.fn() }))

describe('App', () => {
  describe('App', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<App />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderWeatherStateImage', () => {
    it('should render correctly and have image', () => {
      const wrapper = shallow(<div>{renderWeatherStateImage(1, mockWeather)}</div>)
      const imageWrapper = wrapper.find('img')
      expect(imageWrapper).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render correctly and return null', () => {
      const wrapper = shallow(<div>{renderWeatherStateImage(1, {} as Weather)}</div>)
      const imageWrapper = wrapper.find('img')
      expect(imageWrapper).toHaveLength(0)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderCurrentWeatherInfo', () => {
    it('should render correctly and have data', () => {
      const wrapper = shallow(<div>{renderCurrentWeatherInfo(1, mockWeather)}</div>)
      const colWrapper = wrapper.find('[className="col"]')
      expect(colWrapper).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render correctly and have title', () => {
      const wrapper = shallow(<div>{renderCurrentWeatherInfo(1, mockWeather)}</div>)
      const locationTitle = wrapper.find('h4').text()
      expect(locationTitle).toEqual('Ho Chi Minh City')
      const stateText = wrapper.find('h5').text()
      expect(stateText).toEqual('Heavy Rain')
      const dayText = wrapper.find('h6').text()
      expect(dayText).toEqual('Thursday')
      const tempText = wrapper.find('h1').text()
      expect(tempText).toEqual('32℃')
    })
  })

  describe('renderError', () => {
    it('should renderError', () => {
      const wrapper = shallow(<div>{renderError('MockError')}</div>)
      const alertWrapper = wrapper.find('Alert')
      expect(alertWrapper).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render null', () => {
      const wrapper = shallow(<div>{renderError('')}</div>)
      const alertWrapper = wrapper.find('Alert')
      expect(alertWrapper).toHaveLength(0)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('onSubmit', () => {
    it('should callSetLoading setError, setWeather', (done) => {
      ;(fetchLocationWeather as jest.Mocked<any>).mockReturnValueOnce(Promise.resolve({ data: mockWeather }))
      const mockEvent = {
        preventDefault: jest.fn(),
        target: {
          locationName: {
            value: 'mockValue',
          },
        },
      } as any
      const mockSetLoading = jest.fn()
      const mockSetError = jest.fn()
      const mockSetWeather = jest.fn()
      const fn = onSubmit({ setLoading: mockSetLoading, setError: mockSetError, setWeather: mockSetWeather })
      fn(mockEvent)
      expect(mockEvent.preventDefault).toBeCalled()
      expect(mockSetLoading).toBeCalledTimes(1)
      expect(mockSetError).toBeCalledWith('')
      expect(mockSetWeather).toBeCalledTimes(1)
      setTimeout(() => {
        expect(mockSetWeather).toBeCalledTimes(2)
        expect(mockSetLoading).toBeCalledTimes(2)
        done()
      }, 1000)
    })

    it('should call only setError', (done) => {
      ;(fetchLocationWeather as jest.Mocked<any>).mockReturnValueOnce(Promise.reject({ message: 'mockError' }))
      const mockEvent = {
        preventDefault: jest.fn(),
        target: {
          locationName: {
            value: 'mockValue',
          },
        },
      } as any
      const mockSetLoading = jest.fn()
      const mockSetError = jest.fn()
      const mockSetWeather = jest.fn()
      const fn = onSubmit({ setLoading: mockSetLoading, setError: mockSetError, setWeather: mockSetWeather })
      fn(mockEvent)
      expect(mockEvent.preventDefault).toBeCalled()
      expect(mockSetLoading).toBeCalledTimes(1)
      expect(mockSetError).toBeCalledWith('')
      expect(mockSetWeather).toBeCalledTimes(1)
      setTimeout(() => {
        expect(mockSetError).toBeCalledWith('mockError')
        done()
      }, 1000)
    })
  })
})
