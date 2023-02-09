import WindowFilters from '../windows/WindowFilters'
import WindowMail from '../windows/WindowMail'

import NoWindow from '../windows/NoWindow'

const slugs = {
    filters: { title: 'Zastosuj filtry', content: <WindowFilters /> },
    email: { title: 'Wyślij kontakt w wiadomości e-mail', content: <WindowMail /> }
}

const find = (slug) => {
    return slugs[slug] || { title: 'Wystąpił błąd!', content: <NoWindow /> }
}

export default { slugs, find }