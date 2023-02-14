import WindowFilters from '../windows/WindowFilters'
import WindowMail from '../windows/WindowMail'
import WindowDelegate from '../windows/WindowDelegate'
import WindowDownload from '../windows/WindowDownload'

import NoWindow from '../windows/NoWindow'

const slugs = {
    filters: { title: 'Zastosuj filtry', content: <WindowFilters /> },
    email: { title: 'Wyślij kontakt w wiadomości e-mail', content: <WindowMail /> },
    delegate: { title: 'Przekaż pracownikowi', content: <WindowDelegate /> },
    download: { title: 'Pobierz listę kontaktów', content: <WindowDownload /> }
}

const find = (slug) => {
    return slugs[slug] || { title: 'Wystąpił błąd!', content: <NoWindow /> }
}

export default { slugs, find }