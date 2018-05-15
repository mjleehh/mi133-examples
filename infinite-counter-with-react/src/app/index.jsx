import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import React from 'react'
import ReactDOM from 'react-dom'

import './global.scss'

import reducer from 'app/reducer'
import App from 'app/App'
import {reqGetCount} from "app/actions"

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)))

store.dispatch(reqGetCount())

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('main'))
