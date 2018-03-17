import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Helmet from 'react-helmet'
import { Route } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import 'static/styles/common.scss'

export default class AppContainer extends PureComponent {
    static propTypes = {
        route: PropTypes.object,
        location: PropTypes.object.isRequired
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            window.scrollTo(0, 0)
        }
    }

    render () {
        const helmetProps = {
            titleTemplate: '%s – Quick Project',
            defaultTemplate: 'Quick Project'
        }

        return (
            <React.Fragment>
                <Helmet {...helmetProps} />
                <Route render={() => renderRoutes(this.props.route.routes)} />
            </React.Fragment>
        )
    }
}
