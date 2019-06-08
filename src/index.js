import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'

import JssProvider from 'react-jss/lib/JssProvider'
import { createGenerateClassName } from '@material-ui/core/styles'
import App from './components/App'

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'c',
})

ReactDOM.render(
  <JssProvider generateClassName={generateClassName}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </JssProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
