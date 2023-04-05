
import NoWindow from '../windows/NoWindow'

const slugs = {
    registerUser: { title: 'Utwórz konto użytkownika', content: <></> },
}

const find = (slug) => {
    return slugs[slug] || { title: 'Wystąpił błąd!', content: <NoWindow /> }
}

export default { slugs, find }