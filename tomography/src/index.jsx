import React from 'react'
import ReactDom from 'react-dom'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import cppBinary from './main.cpp'
import App from './App'

import './style.scss'

const theme = createMuiTheme({
    "palette": {
        "primary": {main: "#1b5e20"},
        "secondary": {main: "#388e3c"},
        "accent": {main: "#009688"}
    }
})


async function main() {
    const cppModule = await cppBinary.init(imports => {
        imports._printInt = function (i) {
            console.log(i)
        }
        return imports
    })

    ReactDom.render(
        <MuiThemeProvider theme={theme}>
            <App module={cppModule}/>
        </MuiThemeProvider>,
        document.getElementById('main')
    )
}

main()