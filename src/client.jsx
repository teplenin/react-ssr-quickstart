import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import transit from 'transit-immutable-js'

import App from 'app'

import configureStore from 'redux/store'

const initialState = transit.fromJSON(window.__INITIAL_STATE__ || '{}')
const store = configureStore(initialState)

ReactDOM.render((
    <AppContainer>
        <App store={store} />
    </AppContainer>
), document.getElementById('app'))

if (module.hot) {
    module.hot.accept('./app', () => {
        const NewApp = require('./app').default

        ReactDOM.render((
            <AppContainer>
                <NewApp store={store} />
            </AppContainer>
        ), document.getElementById('app'))
    })
}
