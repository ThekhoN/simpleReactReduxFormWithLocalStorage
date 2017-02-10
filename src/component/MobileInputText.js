import React from 'react'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import DisplayError from './DisplayError'

export const mobileInputErrorMessages = {
  empty: 'Please enter your mobile number.',
  invalid: 'Please enter a valid 10-digit mobile number.'
}
const MobileInputText = ({changeHandler, placeholderName, error, errorType}) => (<div className='formRowElem'>
    <label>
      <input
        type='text'
        maxLength="10"
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
      {error && <DisplayError errorMessage={mobileInputErrorMessages[errorType]}/>}
    </ReactCSSTransitionGroup>
  </div>)

export default MobileInputText
