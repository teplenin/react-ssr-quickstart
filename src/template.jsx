import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import transit from 'transit-immutable-js'

export default class Template extends Component {
    static propTypes = {
        markup: PropTypes.string,
        store: PropTypes.object,
        manifest: PropTypes.object
    }

    static defaultProps = {
        markup: '',
        manifest: {}
    }

    resolve (files) {
        return files.map((src) => this.props.manifest[src]).filter((file) => file !== undefined)
    }

    render () {
        const helmet = Helmet.renderStatic()

        const styles = this.resolve(['vendor.css', 'main.css'])
        const scripts = this.resolve(['vendor.js', 'bundle.js', 'main.js'])

        const htmlAttrs = helmet.htmlAttributes.toComponent()
        const bodyAttrs = helmet.bodyAttributes.toComponent()

        const store = this.props.store.getState() || {}

        return (
            <html {...htmlAttrs}>
                <head>
                    <meta charSet='utf-8' />
                    {helmet.title.toComponent()}
                    {helmet.meta.toComponent()}
                    {helmet.link.toComponent()}
                    {styles.map((src, i) => <link key={i} rel='stylesheet' type='text/css' href={src} />)}
                </head>
                <body {...bodyAttrs}>
                    <div id='app' dangerouslySetInnerHTML={{ __html: this.props.markup }} />

                    <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__='${transit.toJSON(store)}';` }} charSet='UTF-8' />
                    {scripts.map((src, i) => <script src={src} key={i} />)}
                </body>
            </html>
        )
    }
}
