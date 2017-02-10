import React from 'react'

import NameInputText from './NameInputText'
import EmailInputText from './EmailInputText'
import MobileInputText from './MobileInputText'


const FormComponent = ({
    changeNameHandler,
    changeEmailHandler,
    changeMobileHandler,
    submitHandler,
    name,
    email,
    mobile
  }) => (<div className='formContainer'>
        <form onSubmit={(e)=>{
            e.preventDefault()
            submitHandler()
          }}>
          <fieldset>
            <legend>A Simple Form </legend>
            <NameInputText
              error={name.error}
              errorType={name.errorType}
              placeholderName='Name'
              changeHandler={(value)=>{changeNameHandler(value)}}/>
            <EmailInputText
              error={email.error}
              errorType={email.errorType}
              placeholderName='user@email.com'
              changeHandler={(value)=>{changeEmailHandler(value)}}/>
            <MobileInputText
              error={mobile.error}
              errorType={mobile.errorType}
              placeholderName='10-digit mobile number'
              changeHandler={(value)=>{changeMobileHandler(value)}}/>
            <div className='formRowElem'>
              <button type='submit'>Submit</button>
            </div>
          </fieldset>
        </form>
</div>)

export default FormComponent
