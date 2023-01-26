import isAppInList from './isAppInList'

const selectAppSmart = (appsList, currentApp, configDefaultApp) => {
    appsList = appsList.filter(app => app.id > 0)

    if (currentApp)
        if (currentApp.slug !== undefined)
            if (isAppInList(currentApp.slug), appsList)
                return currentApp.slug

    const local = localStorage.getItem('current-app')
    if (local !== null)
        if (isAppInList(local, appsList))
            return local

    if (configDefaultApp !== null)
        if (isAppInList(configDefaultApp, appsList))
            return configDefaultApp

    if (appsList.length > 0) return appsList[0].slug

    return false
}

export default selectAppSmart