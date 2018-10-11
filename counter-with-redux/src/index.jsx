import React from 'react'
import ReactDom from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {devToolsEnhancer} from 'redux-devtools-extension'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

import App from './App'
import reducer from './reducer'
import './style.scss'

const theme = createMuiTheme({
    "palette": {
        "primary": {main: "#1b5e20"},
        "secondary": {main: "#388e3c"},
        "accent": {main: "#009688"}
    }
})

const store = createStore(reducer, devToolsEnhancer())

ReactDom.render(
  <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App/>
      </Provider>
  </MuiThemeProvider>,
  document.getElementById('main')
)
