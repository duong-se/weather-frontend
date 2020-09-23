import { shallow } from 'enzyme'
import React from 'react'
import Alert from './Alert'

describe('Alert', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Alert message="mockMessage" />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should render message', () => {
    const mockMessage = 'mockMessage'
    const wrapper = shallow(<Alert message={mockMessage} />)
    const messageText = wrapper.find('.alert').text()
    expect(messageText).toEqual(mockMessage)
  })
})
