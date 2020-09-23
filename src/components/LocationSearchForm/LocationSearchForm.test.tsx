import React from 'react'
import { shallow } from 'enzyme'
import { LocationSearchForm } from './LocationSearchForm'

describe('LocationSearchForm', () => {
  it('should match snapshot', () => {
    const onSubmit = jest.fn()
    const isLoading = true
    const wrapper = shallow(<LocationSearchForm onSubmit={onSubmit} isLoading={isLoading} />)
    const submitBtn = wrapper.find('.btn').text()
    expect(submitBtn).not.toEqual('Submit')
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot', () => {
    const onSubmit = jest.fn()
    const isLoading = false
    const wrapper = shallow(<LocationSearchForm onSubmit={onSubmit} isLoading={isLoading} />)
    const submitBtn = wrapper.find('.btn').text()
    expect(submitBtn).toEqual('Submit')
    expect(wrapper).toMatchSnapshot()
  })

  it('should call onSubmit', () => {
    const onSubmit = jest.fn()
    const isLoading = false
    const wrapper = shallow(<LocationSearchForm onSubmit={onSubmit} isLoading={isLoading} />)
    const formWrapper = wrapper.find('form')
    formWrapper.simulate('submit')
    expect(onSubmit).toBeCalled()
  })
})
