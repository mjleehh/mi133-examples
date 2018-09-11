import React from 'react'
import ReactDom from 'react-dom'

import GiraffeGame from "./GiraffeGame";

import './style.scss'

if (/ CrKey\//.test(navigator.userAgent)) {
    console.log('starting cast')
    cast.framework.CastReceiverContext.getInstance().start()
    cast.framework.CastReceiverContext.getInstance().setLoggerLevel(cast.framework.LoggerLevel.DEBUG)
}

ReactDom.render(
    <GiraffeGame/>,
    document.getElementById('main'))
