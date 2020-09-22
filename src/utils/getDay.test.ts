import { getDay } from './getDay'

describe('getDays', () => {
  it('should run correctly and return day', () => {
    const input = '2020-09-22'
    const ouput = 'Tuesday'
    const output = getDay(input)
    expect(output).toEqual(ouput)
  })
})

