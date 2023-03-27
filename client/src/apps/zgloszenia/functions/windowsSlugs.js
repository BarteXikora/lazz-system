import WindowFilters from '../windows/WindowFilters'
import WindowMail from '../windows/WindowMail'
import WindowDelegate from '../windows/WindowDelegate'
import WindowDownload from '../windows/WindowDownload'
import WindowAdd from '../windows/WindowAdd'
import WindowAddConfirm from '../windows/WindowAddConfirm'
import WindowListOptions from '../windows/WindowListOptions'
import WindowSort from '../windows/WindowSort'
import WindowNoPrivilages from '../windows/WindowNoPrivilages'

import NoWindow from '../windows/NoWindow'

const slugs = {
    filters: { title: 'Zastosuj filtry', content: <WindowFilters /> },
    email: { title: 'Wyślij kontakt w wiadomości e-mail', content: <WindowMail /> },
    delegate: { title: 'Przekaż pracownikowi', content: <WindowDelegate /> },
    download: { title: 'Pobierz listę kontaktów', content: <WindowDownload /> },
    add: { title: 'Dodaj kontakt', content: <WindowAdd /> },
    confirm: { title: 'Dodaj kontakt', content: <WindowAddConfirm /> },
    list: { title: 'Lista...', content: <WindowListOptions /> },
    sort: { title: 'Sortuj listę', content: <WindowSort /> },
    privilages: { title: 'Brak uprawnień', content: <WindowNoPrivilages /> }
}

const find = (slug) => {
    return slugs[slug] || { title: 'Wystąpił błąd!', content: <NoWindow /> }
}

export default { slugs, find }