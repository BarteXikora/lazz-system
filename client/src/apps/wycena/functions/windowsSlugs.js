import WindowClearCalculator from '../windows/WindowClearCalculator'

import NoWindow from '../windows/NoWindow'

const slugs = {
    clearCalculator: { title: 'Czy na pewno...', content: <WindowClearCalculator /> }
}

const find = (slug) => {
    return slugs[slug] || { title: 'Wystąpił błąd!', content: <NoWindow /> }
}

export default { slugs, find }