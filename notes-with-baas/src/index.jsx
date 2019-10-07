import React from 'react'
import ReactDom from 'react-dom'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import {composeWithDevTools} from 'redux-devtools-extension'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import 'antd/dist/antd.css'
import App from './App'

import apiConfig from './apiconf.cred'

import saga from './saga'

async function main() {
    function reducer(state = {}, action) {
        return state
    }

    console.log(firebase.firestore)


    firebase.initializeApp(apiConfig)

    const db = firebase.firestore()
    const auth = firebase.auth()

    auth.onAuthStateChanged(user => {
        if (user && window.location.pathname === '/login') {
            window.location = '/'
        } else if (!user && window.location.pathname !== '/login') {
            window.location = '/login'
        }
    })

    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))
    sagaMiddleware.run(saga(auth))

    ReactDom.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('main')
    )
}

main()