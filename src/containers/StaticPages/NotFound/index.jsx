import React, { PureComponent, Fragment } from 'react'

import Helmet from 'react-helmet'
import { Route } from 'react-router-dom'

export default class NotFoundPageContainer extends PureComponent {
    renderContent = ({ staticContext }) => {
        if (staticContext) {
            staticContext.status = 404
        }

        return (
            <Fragment>
                <Helmet>
                    <title>Страница не найдена</title>
                </Helmet>
                <div>
                    <h1>Страница не найдена</h1>
                </div>
            </Fragment>
        )
    }

    render () {
        return (
            <Route render={this.renderContent} />
        )
    }
}
