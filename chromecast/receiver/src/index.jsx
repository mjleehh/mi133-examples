import React from 'react'
import ReactDom from 'react-dom'

import GiraffeGame from "./GiraffeGame";

import './style.scss'

const {userAgent} = navigator

if (/ CrKey\//.test(userAgent)) {
    console.log('starting cast')
    cast.framework.CastReceiverContext.getInstance().start()
}

ReactDom.render(
    <GiraffeGame/>,
    document.getElementById('main'))
