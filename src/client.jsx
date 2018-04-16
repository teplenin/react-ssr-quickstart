import React from 'react'
import ReactDOM from 'react-dom'
import transit from 'transit-immutable-js'
import configureStore from 'redux/store'

import App from 'app'

const initialState = transit.fromJSON(window.__INITIAL_STATE__ || '{}')
const store = configureStore(initialState)

ReactDOM.render(<App store={store} />, document.getElementById('app'))
