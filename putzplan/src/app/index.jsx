import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import React from 'react'
import Modal from 'react-modal'
import ReactDOM from 'react-dom'
import reducer from 'app/logic/reducer'

import './global.scss'
import {requestSetResidents, requestSetTasks} from 'app/logic/actions'

import App from './App'

import moment from 'moment'
global.moment = moment

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)))

store.dispatch(requestSetResidents())
store.dispatch(requestSetTasks())

const appElement = document.getElementById('main')

Modal.setAppElement(appElement)
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    appElement)
