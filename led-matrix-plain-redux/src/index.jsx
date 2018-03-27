import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {devToolsEnhancer} from 'redux-devtools-extension'
import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './reducer'

const store = createStore(
    reducer,
    devToolsEnhancer())

ReactDOM.render(
    <Provider store={store}>
        <div>
            Redux App Loaded
        </div>
    </Provider>,
    document.getElementById('main'))
