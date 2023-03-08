import WindowClearCalculator from '../windows/WindowClearCalculator'
import WindowCalculateDiscount from '../windows/WindowCalculateDiscount'

import NoWindow from '../windows/NoWindow'

const slugs = {
    clearCalculator: { title: 'Czy na pewno...', content: <WindowClearCalculator /> },
    calculateDiscount: { title: 'Oblicz niestandardowy rabat', content: <WindowCalculateDiscount /> }
}

const find = (slug) => {
    return slugs[slug] || { title: 'Wystąpił błąd!', content: <NoWindow /> }
}

export default { slugs, find }