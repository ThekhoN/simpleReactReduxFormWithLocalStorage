import {createStore, applyMiddleware} from 'redux'
//import {connect, Provider} from 'react-redux'
import userDetails from './reducer/userDetails'
import logger from './middleware/logger'

const store = createStore(userDetails, applyMiddleware(logger));

export default store;
