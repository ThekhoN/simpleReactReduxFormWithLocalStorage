import React from 'react'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import DisplayError from './DisplayError'

export const nameInputErrorMessages = {
  empty: 'Please enter your name.',
  invalid: 'Please enter a valid name.'
}

const NameInputText = ({changeHandler, placeholderName, error, errorType}) => (<div className='formRowElem'>
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
    {error && <DisplayError errorMessage={nameInputErrorMessages[errorType]}/>}
  </ReactCSSTransitionGroup>
</div>)

export default NameInputText
