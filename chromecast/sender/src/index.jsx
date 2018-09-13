import React from 'react'
import ReactDom from 'react-dom'
import {keyCodeToEvent} from "../../common/keybindings";
import App from './App'

import './style.scss'

window['__onGCastApiAvailable'] = function(isAvailable) {
    if (isAvailable) {
        cast.framework.CastContext.getInstance().setOptions({
            receiverApplicationId: '412A4B5B',
            autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
        })
    }
}

window.onkeydown = e => {
    const {keyCode} = e
    const action = keyCodeToEvent(keyCode)
    if (action !== null) {
        cast.framework.CastContext.getInstance().getCurrentSession()
            .sendMessage('urn:x-cast:com.appspott.giraffe-game', action)
        console.log('sending', action)
    }
}

ReactDom.render(
        <App/>,
        document.getElementById('main'))