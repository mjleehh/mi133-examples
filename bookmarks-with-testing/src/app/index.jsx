import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './reducer'
import './global.scss'
import App from './App'
import {requestSetBookmarks} from './actions'


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)))

store.dispatch(requestSetBookmarks())

ReactDOM.render(
    <Provider store={store}>
        <div className="pageContent">
            <App/>
        </div>
    </Provider>,
    document.getElementById('main'))
