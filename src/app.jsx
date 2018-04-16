import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { hot } from 'react-hot-loader'

import routes from 'routes'

@hot(module)
export default class App extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    }

    render () {
        return (
            <Provider store={this.props.store}>
                <BrowserRouter>
                    {renderRoutes(routes)}
                </BrowserRouter>
            </Provider>
        )
    }
}
