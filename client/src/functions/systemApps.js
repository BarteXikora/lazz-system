const getSystemAppsList = (isAdmin) => {
    const systemApps = [
        { id: -100, slug: 'help', name: 'Pomoc' },
        { id: -101, slug: 'settings', name: 'Ustawienia' }
    ]

    if (isAdmin) systemApps.push({ id: -102, slug: 'admin', name: 'Administracja' })

    return systemApps
}


export default getSystemAppsList