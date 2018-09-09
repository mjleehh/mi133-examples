import React from 'react'
import ReactDom from 'react-dom'

import GiraffeGame from "./GiraffeGame";

import './style.scss'

function gameLoop() {
    console.log('now')
    requestAnimationFrame(gameLoop)
}

//requestAnimationFrame(gameLoop)

ReactDom.render(
    <GiraffeGame/>,
    document.getElementById('main'))
