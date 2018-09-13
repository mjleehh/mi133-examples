import React from 'react'
import ReactDom from 'react-dom'
import {createStore} from 'redux'
import {devToolsEnhancer} from 'redux-devtools-extension'
import {Provider} from 'react-redux'

import reducer from './logic/reducer'

import printVersion from './printVersion'
import GiraffeGame from "./ui/GiraffeGame";
import Events from "./Events";

import './style.scss'


printVersion()

const store = createStore(
    reducer,
    devToolsEnhancer())

const events = new Events(store)
events.start()


ReactDom.render(
    <Provider store={store}>
        <GiraffeGame/>
    </Provider>,
    document.getElementById('main'))
