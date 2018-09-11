import React from 'react'
import ReactDom from 'react-dom'

import GiraffeGame from "./GiraffeGame";

import './style.scss'

if (/ CrKey\//.test(navigator.userAgent)) {
    cast.framework.CastReceiverContext.getInstance().start()
    cast.framework.CastReceiverContext.getInstance().setLoggerLevel(cast.framework.LoggerLevel.VERBOSE)
    console.log('starting cast')
}

ReactDom.render(
    <GiraffeGame/>,
    document.getElementById('main'))
