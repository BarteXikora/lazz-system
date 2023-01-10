export default (slug, appsList) => {
    for (const app of appsList) {
        if (app.slug === slug) return true
    }

    return false
}