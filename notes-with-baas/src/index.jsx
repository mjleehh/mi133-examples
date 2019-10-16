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
import Login from "./Login"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import {notesChanged} from './actions'
import reducer from './reducer'
import * as api from './api'

function loginHandler() {
    if(window.location === '/login') {
        window.location = '/'
    }
}

function logoutHandler() {
    if(window.location.pathname !== '/login') {
        window.location = '/login'
    }
}

async function main() {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

    function updateNoteHandler(event) {
        console.log(event.docChanges())
        const docs = event.docs.map(doc => ({id: doc.id, ...doc.data()}))
        store.dispatch(notesChanged(docs))
    }
    sagaMiddleware.run(saga())

    api.init({
        updateNoteHandler,
        loginHandler,
        logoutHandler,
    })



    ReactDom.render(
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={App}/>
                </Switch>
            </BrowserRouter>
        </Provider>,
        document.getElementById('main')
    )
}

main()