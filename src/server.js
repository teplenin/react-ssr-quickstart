import path from 'path'
import Express from 'express'
import compression from 'compression'

import React from 'react'
import { Provider } from 'react-redux'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes, renderRoutes } from 'react-router-config'

import Template from '../src/template'
import configureStore from '../src/redux/store'
import routes from '../src/routes'

const SERVER_PORT = process.env.PORT || 8889

const manifest = require('../build/manifest.json')
const Server = new Express()
const store = configureStore()

Server.use(compression())
Server.use('/static', Express.static(path.join(__dirname, 'static')))
Server.use('/', Express.static(path.join(__dirname, 'misc')))

Server.get('*', (req, res) => {
    const branch = matchRoutes(routes, req.url)
    const context = {}

    const promises = branch.map(({ route, match }) => {
        const { fetchData } = route.component

        return fetchData instanceof Function ? fetchData(store, match, context) : Promise.resolve(null)
    })

    return Promise.all(promises).then((data) => {
        const markup = ReactDOMServer.renderToStaticMarkup(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    {renderRoutes(routes)}
                </StaticRouter>
            </Provider>
        )

        if (context.status === 302) {
            return res.redirect(302, context.url)
        }

        if (context.status === 404) {
            res.status(404)
        }

        res.write('<!DOCTYPE html>')
        ReactDOMServer.renderToNodeStream(
            <Template markup={markup} manifest={manifest} store={store} />
        ).pipe(res)
    }).catch(err => {
        console.error(err)

        res.status(500).send('Server error')
    })
})

Server.listen(SERVER_PORT, err => {
    if (err) throw err

    console.log('Server listening on port %s', SERVER_PORT)
})
