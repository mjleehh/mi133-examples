import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {devToolsEnhancer} from 'redux-devtools-extension'
import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './reducer'
import './style.css'
import App from './App'

const store = createStore(
    reducer,
    devToolsEnhancer())

ReactDOM.render(
    <Provider store={store}>
        <div className="pageContent">
            <App/>
        </div>
    </Provider>,
    document.getElementById('main'))
