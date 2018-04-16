import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './modules/reducers'

export default function configureStore (initialState = {}) {
    const composeEnhancers = (process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

    const store = createStore(reducers, initialState, composeEnhancers(
        applyMiddleware(thunk)
    ))

    return store
}
