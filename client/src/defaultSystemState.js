export default {
    apiLink: null,
    user: { loggedIn: false, id: '', name: '', email: '', authToken: '', admin: false },
    appsList: [],
    currentApp: {},
    notificationsList: [],
    isDockShown: false,
    isNotificationsCenterShown: false,
    window: { isOpen: false, title: '', content: '', data: {} },
    error: { isError: false, message: '', code: '' },
}