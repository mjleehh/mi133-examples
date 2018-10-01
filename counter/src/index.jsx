import React from 'react'
import ReactDom from 'react-dom'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

import App from './App'

import './style.scss'


const theme = createMuiTheme({
    "palette": {
        "primary": {main: "#1b5e20"},
        "secondary": {main: "#388e3c"},
        "accent": {main: "#009688"}
    }
})

ReactDom.render(
  <MuiThemeProvider theme={theme}>
        <App/>
  </MuiThemeProvider>,
  document.getElementById('main')
)
