import WindowRegisterUser from '../windows/WindowRegisterUser'

import NoWindow from '../windows/NoWindow'

const slugs = {
    registerUser: { title: 'Utwórz konto użytkownika', content: <WindowRegisterUser /> },
}

const find = (slug) => {
    return slugs[slug] || { title: 'Wystąpił błąd!', content: <NoWindow /> }
}

export default { slugs, find }