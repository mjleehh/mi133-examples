import React from 'react'
import ReactDom from 'react-dom'
import {createStore} from 'redux'
import {devToolsEnhancer} from 'redux-devtools-extension'
import {Provider} from 'react-redux'

import reducer from './logic/reducer'

import printVersion from './printVersion'
import Chromecast from './ui/Chromecast'
import GameEvents from './GameEvents'
import GiraffeGame from "./ui/GiraffeGame";

import './style.scss'

printVersion()

const store = createStore(
    reducer,
    devToolsEnhancer())

const chromecast = new Chromecast()
const gameEvents = new GameEvents(store)
gameEvents.connectChromecast(chromecast)


gameEvents.start()


ReactDom.render(
    <Provider store={store}>
        <GiraffeGame/>
    </Provider>,
    document.getElementById('main'))
