import React from 'react'
import {Component} from 'react'
import {localStorageSupported, deleteLocalStorage, getSavedSettings} from '../module/localStorageUtils'

import FormComponent from '../component/FormComponent'

import store from '../store'
import {Provider, connect} from 'react-redux'
//console.log('store', store);

class FormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: {
        value: '',
        error: false,
        errorType: '',
      },
      email: {
        value: '',
        error: false,
        errorType: '',
      },
      mobile: {
        value: '',
        error: false,
        errorType: '',
      },
      userTime: ''
    }
    this.onChangeNameHandler = this.onChangeNameHandler.bind(this)
    this.onChangeEmailHandler = this.onChangeEmailHandler.bind(this)
    this.onChangeMobileHandler = this.onChangeMobileHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }
  onChangeNameHandler(name){
    if(name === '' || name.trim() === ""){
      this.setState({
        name: {
          error: true,
          errorType: 'empty'
        }
      })
    }
    else if(!(/^[A-Za-z\s]+$/.test(name))){
       this.setState({
        name: {
          error: true,
          errorType: 'invalid'
        }
       })
    }
    else {
      this.setState({
        name: {
          value: name,
          error: false
        }
      })
    }
  }
  onChangeEmailHandler(email){
    if(email === '' || email.trim() === ""){
      this.setState({
        email: {
          error: true,
          errorType: 'empty'
        }
      })
    }
    else if(!(/\S+@\S+\.\S+/.test(email))){
       this.setState({
        email: {
          error: true,
          errorType: 'invalid'
        }
       })
    }
    else {
      this.setState({
        email: {
          value: email,
          error: false
        }
      })
    }
  }
  onChangeMobileHandler(mobile){
    if(mobile === '' || mobile.trim() === ""){
      this.setState({
        mobile: {
          error: true,
          errorType: 'empty'
        }
      })
    }
    else if(!(/^\d{10}$/.test(mobile)) ||
        parseInt(mobile, 10) < 6999999999 ||
        mobile === "9999999999" ||
         mobile === "8888888888" ||
          mobile === "7777777777"){
       this.setState({
        mobile: {
          error: true,
          errorType: 'invalid'
        }
       })
    }
    else {
      this.setState({
        mobile: {
          value: mobile,
          error: false
        }
      })
    }
  }
  onSubmitHandler(){
    console.log('running submit handler. . . ')
    const {name, email, mobile} = this.state
    if(name.value !== '' && email.value !== '' && mobile.value !== '' && !name.error && !email.error && !mobile.error){
      let time = new Date();
      time = `${(time.getMonth() + 1)}/${time.getDate()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`

      //dispatch to store
      store.dispatch({
        type: 'UPDATE_USERDETAILS',
        userName: name.value,
        userEmail: email.value,
        userMobile: mobile.value,
        userTime: time
      })


      const updateStateMainContainer = {
        name: name.value,
        success: true,
        showSubmitSuccess: true,
        showForm: false,
        showFooterController: false
      }
      //dispatch to parentContainer
      this.props.onFormSubmitSuccess(updateStateMainContainer)
      //save to localStorage
      if (localStorageSupported('localStorage')) {
        localStorage.setItem('userName', store.getState().userName)
        localStorage.setItem('userEmail', store.getState().userEmail)
        localStorage.setItem('userMobile', store.getState().userMobile)
        localStorage.setItem('userTime', store.getState().userTime)
      }

      else {
        console.error('localStorage NOT supported, Failed to retrieve previous entry. . .')
      }
    }
    else {
      //name
      if(name.value === '' ){
        this.setState({
          name: {
            error: true,
            errorType: 'empty'
          }
        })
      }
      if(!(/^[A-Za-z\s]+$/.test(name.value))){
        this.setState({
          name: {
            error: true,
            errorType: 'invalid'
          }
        })
      }
      //email
      if(email.value === ''){
        this.setState({
          email: {
            error: true,
            errorType: 'empty'
          }
        })
      }
      if(!(/\S+@\S+\.\S+/.test(email.value))){
        this.setState({
          email: {
            error: true,
            errorType: 'invalid'
          }
        })
      }
      //mobile
      if(mobile.value === ''){
        this.setState({
          mobile: {
            error: true,
            errorType: 'empty'
          }
        })
      }
      if(!(/^\d{10}$/.test(mobile.value)) ||
         parseInt(mobile.value, 10) < 6999999999 ||
         mobile.value === "9999999999" ||
         mobile.value === "8888888888" ||
         mobile.value === "7777777777"){
        this.setState({
          mobile: {
            error: true,
            errorType: 'invalid'
          }
        })
      }
      console.error('missing form input -_-"')
      return false;
    }
  }
  componentDidMount(){
    if (!localStorageSupported('localStorage') || localStorage.getItem('userName') === '') {
      this.setState({
        showFooterController: false
      })
    }
    else {
      const lastSavedEntry = getSavedSettings();
      this.setState({
        lastSavedEntry: lastSavedEntry
      })
    }
  }
  render(){
    const {name, email, mobile, userTime} = this.state
    return (<FormComponent {...this.state}
      changeNameHandler={this.onChangeNameHandler}
      changeEmailHandler={this.onChangeEmailHandler}
      changeMobileHandler={this.onChangeMobileHandler}
      submitHandler={this.onSubmitHandler}
    />)
  }
}

export default FormContainer
