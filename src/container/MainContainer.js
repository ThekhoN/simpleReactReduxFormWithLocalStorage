import {Component} from 'react'
import React from 'react'


import {localStorageSupported, getSavedSettings, deleteLocalStorage} from '../module/localStorageUtils'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import FooterController from '../component/FooterController'
import FormSubmitSuccess from '../component/FormSubmitSuccess'
import FormContainer from './FormContainer'
import LastEntry from '../component/LastEntry'

import store from '../store'

class MainContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      lastEntry: {
        userName: '',
        userEmail: '',
        userMobile: '',
        userTime: ''
      },
      showLastEntry: false,
      name: '',
      showFooterController: true,
      showForm: true,
      showSubmitSuccess: false,
      success: false
    }
    this.handleFormSubmitSuccess = this.handleFormSubmitSuccess.bind(this)
    this.handleShowLastEntry = this.handleShowLastEntry.bind(this)
    this.handleDeleteFromLocalStorage = this.handleDeleteFromLocalStorage.bind(this)
  }
  handleDeleteFromLocalStorage(){
      deleteLocalStorage()
      this.setState({
        showFooterController: false,
        showLastEntry: false,
        showForm: true,
         lastEntry:{
           userName: '',
           userEmail: '',
           userMobile: '',
           userTime: ''
         }
      })
  }
  handleShowLastEntry(){
        const {showLastEntry, showForm, showFooterController, showSubmitSuccess} = this.state
        console.log('show last entry. . .');
        const lastEntry = getSavedSettings();
        console.info('lastEntry: ', lastEntry)
      if(showForm===true){
        if(showLastEntry === false){
          this.setState({
            lastEntry: lastEntry,
            showLastEntry: true,
            showForm: false
          })
        }
      }
      else if(showForm === false){
        if(showLastEntry === true){
          this.setState({
            showLastEntry: false,
            showForm: true
          })
        }
      }
  }
  handleFormSubmitSuccess(updatedState){
    console.log('updatedState: ', updatedState);
    this.setState({
      name: updatedState.name,
      showFooterController: updatedState.showFooterController,
      showForm: updatedState.showForm,
      showSubmitSuccess: updatedState.showSubmitSuccess,
      success: updatedState.success
    }, function(){
      console.log('updatedState this.state: ', this.state);
    })
    /*
    showFooterController:false,
    showForm:false,
    showSubmitSuccess:true,
    success:true
    */
  }
  componentDidMount(){
    if (!localStorageSupported('localStorage') || localStorage.getItem('userName') === '') {
      this.setState({
        showFooterController: false
      })
    }
    else {
      const lastSavedEntry = getSavedSettings();

      console.info('lastSavedEntry: ', lastSavedEntry)
      //dispatch to store
      store.dispatch({
        type: 'UPDATE_USERDETAILS',
        userName: lastSavedEntry.userName,
        userEmail: lastSavedEntry.userEmail,
        userMobile: lastSavedEntry.userEmail,
        userTime: lastSavedEntry.userTime
      })

      //console.log('redux state: ', store.getState())
      this.setState({
        showFooterController: true,
        lastEntry: store.getState()
      }, function(){
        console.info('updatedState this state: ', this.state)
      })
    }
  }
  render(){
    const {name, success, showLastEntry, showForm, showFooterController, showSubmitSuccess, lastEntry} = this.state
    return (<div className='MainContainer'>
          <ReactCSSTransitionGroup
            transitionAppearTimeout={300}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={500}
            transitionName="transition"
            transitionAppear={true}>
          {showLastEntry && <LastEntry data={store.getState()}/>}
        </ReactCSSTransitionGroup>
            {showFooterController && <FooterController
              showLastEntry={showLastEntry}
              handleDeleteFromLocalStorage={()=>{
                  console.log('delete from localStorage....')
                  this.handleDeleteFromLocalStorage()
              }}
              handleShowLastEntry={
                ()=>{
                  this.handleShowLastEntry()
                }
              }
            />}
        <ReactCSSTransitionGroup
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={500}
          transitionName="transition"
          transitionAppear={true}>
        {showForm && <FormContainer onFormSubmitSuccess={(updatedState)=>{
          console.log('form success from Main')
          this.handleFormSubmitSuccess(updatedState)
        }}/>}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={500}
          transitionName="transition"
          transitionAppear={true}>
        {showSubmitSuccess && <FormSubmitSuccess name={store.getState().userName} handleOnClickClose={
                ()=>{
                  this.setState({
                    showSubmitSuccess: false,
                    showForm: true,
                    showFooterController: true
                  })
                }
              }/>}
        </ReactCSSTransitionGroup>

      </div>)
  }
}

//const MainContainer = connect()(Main)

export default MainContainer
