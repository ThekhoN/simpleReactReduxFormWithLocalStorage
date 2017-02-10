import React from 'react'

const FormSubmitSuccess = ({name, handleOnClickClose}) => (<div className='formSubmitSuccess'>
  <span onClick={()=>{ handleOnClickClose() }} className='close'>
    &times;
  </span>
  <h2>
    <span>Hi {name}! </span>
    <br/> {`Your form was successfully submitted :)`}
  </h2>
</div>)

export default FormSubmitSuccess
