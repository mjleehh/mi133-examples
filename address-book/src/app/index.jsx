import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import React from 'react'
import Modal from 'react-modal'
import ReactDOM from 'react-dom'
import reducer from 'app/logic/reducer'

import MainScreen from 'app/ui/MainScreen'
import './global.gscss'

import moment from 'moment'
import {requestData} from "./logic/actions"
global.moment = moment

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)))

store.dispatch(requestData())

const appElement = document.getElementById('main')

Modal.setAppElement(appElement)
ReactDOM.render(
    <Provider store={store}>
        <MainScreen/>
    </Provider>,
    appElement)
