import fetch from 'isomorphic-fetch'
import { fetchLocation, fetchWeather } from './api'
import { mockLocation } from './__mocks__/mockLocation'
import { mockWeather } from './__mocks__/mockWeather'

jest.mock('isomorphic-fetch', () => jest.fn())

describe('api', () => {
  describe('fetchLocation', () => {
    it('should run correctly', async () => {
      ;(fetch as jest.Mocked<any>).mockReturnValueOnce(
        Promise.resolve({ status: 200, json: jest.fn().mockReturnValueOnce(Promise.resolve(mockLocation)) }),
      )
      const location = await fetchLocation({ locationName: 'london' })
      expect(location).toEqual(mockLocation)
    })
    it('should run correctly and return error', async () => {
      ;(fetch as jest.Mocked<any>).mockReturnValueOnce(Promise.reject({ status: 400, message: 'Not Found' }))
      try {
        const location = await fetchLocation({ locationName: 'london' })
        expect(location).toBeUndefined()
      } catch (error) {
        expect(error).toEqual({ message: 'Not Found', status: 400 })
      }
    })

    it('should run correctly and return error', async () => {
      ;(fetch as jest.Mocked<any>).mockReturnValueOnce(
        Promise.reject({ status: 500, message: 'Internal server Error' }),
      )
      try {
        const location = await fetchLocation({ locationName: 'london' })
        expect(location).toBeUndefined()
      } catch (error) {
        expect(error).toEqual({ message: 'Internal server Error', status: 500 })
      }
    })
  })

  describe('fetchWeather', () => {
    it('should run correctly', async () => {
      ;(fetch as jest.Mocked<any>).mockReturnValueOnce(
        Promise.resolve({ status: 200, json: jest.fn().mockReturnValueOnce(Promise.resolve(mockWeather)) }),
      )
      const location = await fetchWeather({ woeid: 123 })
      expect(location).toEqual(mockWeather)
    })
    it('should run correctly and return error', async () => {
      ;(fetch as jest.Mocked<any>).mockReturnValueOnce(Promise.reject({ status: 400, message: 'Not Found' }))
      try {
        const location = await fetchWeather({ woeid: 123 })
        expect(location).toBeUndefined()
      } catch (error) {
        expect(error).toEqual({ message: 'Not Found', status: 400 })
      }
    })

    it('should run correctly and return error', async () => {
      ;(fetch as jest.Mocked<any>).mockReturnValueOnce(
        Promise.reject({ status: 500, message: 'Internal server Error' }),
      )
      try {
        const location = await fetchWeather({ woeid: 123 })
        expect(location).toBeUndefined()
      } catch (error) {
        expect(error).toEqual({ message: 'Internal server Error', status: 500 })
      }
    })
  })
})
