import AppContainer from 'containers/App'

import HomePageContainer from 'containers/HomePage'
import NotFoundPageContainer from 'containers/StaticPages/NotFound'

const routes = [
    {
        component: AppContainer,
        routes: [
            {
                path: '/',
                exact: true,
                component: HomePageContainer
            },
            {
                path: '*',
                component: NotFoundPageContainer
            }
        ]
    }
]

export default routes
