import React from 'react'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import DisplayError from './DisplayError'

const emailInputErrorMessages = {
  empty: 'Please enter your email.',
  invalid: 'Please enter a valid email.'
}

const EmailInputText = ({changeHandler, placeholderName, error, errorType}) => (<div className='formRowElem'>
    <label>
      <input
        type='text'
        placeholder={placeholderName}
        onChange={(e)=>{changeHandler(e.target.value)}}
        onBlur={(e)=>{changeHandler(e.target.value)}}/>
    </label>
    <ReactCSSTransitionGroup
      transitionAppearTimeout={300}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={500}
      transitionName="transition"
      transitionAppear={true}>
      {error && <DisplayError errorMessage={emailInputErrorMessages[errorType]}/>}
  </ReactCSSTransitionGroup>
  </div>)

export default EmailInputText
