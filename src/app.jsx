import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import routes from 'routes'

class App extends Component {
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

export default App
