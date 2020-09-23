import { roundNumber } from './roundNumber'

describe('roundNumber', () => {
  it('should run correctly and return 15', () => {
    const input = 14.4
    const output = 15
    const result = roundNumber(input)
    expect(result).toEqual(output)
  })

  it('should run correctly and return 15', () => {
    const input = 14.6
    const output = 15
    const result = roundNumber(input)
    expect(result).toEqual(output)
  })

  it('should run correctly and return 15', () => {
    const input = 14.1
    const output = 15
    const result = roundNumber(input)
    expect(result).toEqual(output)
  })

  it('should run correctly and return 0', () => {
    const input = undefined
    const output = 0
    const result = roundNumber(input)
    expect(result).toEqual(output)
  })
})
