import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './reducer'
import './style.css'
import App from './App'

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <div className="pageContent">
            <App/>
        </div>
    </Provider>,
    document.getElementById('main'))
