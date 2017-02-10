import savedSettings from '../module/localStorageUtils'

const userDetails = (state=savedSettings, action) => {
  switch(action.type){
    case 'UPDATE_USERDETAILS':
      return {
        userName: action.userName,
        userEmail: action.userEmail,
        userMobile: action.userMobile,
        userTime: action.userTime
      }
    case 'DELETE_USERDETAILS':
      return {
        userName: '',
        userEmail: '',
        userMobile: '',
        userTime: ''
      }
    default:
      return state;
  }
}

export default userDetails
