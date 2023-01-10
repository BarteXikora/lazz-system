import React, { Suspense } from 'react'
import AppLoading from '../components/AppLoading'

const createAppsArray = (rawList) => {
    return rawList.map(app => {
        const Component = React.lazy(() => import(`../apps/${app.slug}/App`))

        return { ...app, component: <Suspense fallback={<AppLoading />}><Component /></Suspense> }
    })
}

export default createAppsArray