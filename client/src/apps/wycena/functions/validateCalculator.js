const translateFiledName = (slug) => {
    const calcularotFieldsNames = {
        timeProject: 'Czas wykonywania projektu',
        timeMilling: 'Czas frezowania',
        timeLathe: 'Czas pracy tokarki CNC',
        timeMontage: 'Czas montażu',
    }

    return calcularotFieldsNames[slug] || '[ niezdefinowane pole ]'
}

const validateSectionTimes = (config, values) => {
    let errorsList = []

    for (const [key, field] of Object.entries(values)) {
        if (field < config[key].min) errorsList.push({
            errID: key + '<',
            section: 'Czas pracy',
            message: `${translateFiledName(key)} powinien wynosić przynajmniej ${config[key].min} godz.`
        })

        else if (field > config[key].max) errorsList.push({
            errID: key + '>',
            section: 'Czas pracy',
            message: `${translateFiledName(key)} nie powinien przekraczać ${config[key].max} godz.`
        })
    }

    return errorsList
}

const validateSectionShipment = (value) => {
    return value.id < 0 ? [{
        errID: 'shipment',
        section: 'Wysyłka',
        message: 'Należy wybrać region wysyłki.'

    }] : []
}

const validateSectionSpindles = (config, values) => {
    let errorsList = []
    let allSpindles = 0

    values.forEach((spindle, n) => {
        allSpindles += spindle.cnt

        if (spindle.type.id < 0) errorsList.push({
            errID: 'spindle-type' + n,
            section: 'Wrzeciona',
            message: `Nie wybrano rodzaju ${n + 1} wrzeciona.`
        })

        if (spindle.montage.id < 0) errorsList.push({
            errID: 'spindle-montage' + n,
            section: 'Wrzeciona',
            message: `Nie wybrano normaliów montażu ${n + 1} wrzeciona.`
        })

        if (spindle.cnt <= 0) errorsList.push({
            errID: 'spindle-cnt' + n,
            section: 'Wrzeciona',
            message: `Liczba wrzecion na pozycji ${n + 1} powinna być większa od 0.`
        })
    })

    if (allSpindles < config.cntSum.min) errorsList.push({
        errID: 'spindle<',
        section: 'Wrzeciona',
        message: `Suma wrzecion nie powinna być mniejsza od ${config.cntSum.min}.`
    })

    if (allSpindles > config.cntSum.max) errorsList.push({
        errID: 'spindle>',
        section: 'Wrzeciona',
        message: `Suma wrzecion nie powinna być większa od ${config.cntSum.max}.`
    })

    return errorsList
}

const validateSectionBody = (config, values) => {
    let errorsList = []

    if (values.length < config.length.min) errorsList.push({
        errID: 'bodylen<',
        section: 'Korpus głowicy',
        message: `Długość korpusu głowicy nie powinna być mniejsza, niż ${config.length.min}.`
    })

    if (values.length > config.length.max) errorsList.push({
        errID: 'bodylen>',
        section: 'Korpus głowicy',
        message: `Długość korpusu głowicy nie powinna być większa, niż ${config.length.max}.`
    })

    if (values.flatBar.id < 0) errorsList.push({
        errID: 'bodyflatbar',
        section: 'Korpus głowicy',
        message: `Nie wybrano płaskownika.`
    })

    return errorsList
}

const validateSectionExtra = (values) => {
    if (values.cluth.id < 0) return [{
        errID: 'cluth',
        section: 'Sprzęgło i głowica',
        message: 'Nie wybrano sprzęgła i mocowania.'
    }]

    return []
}

const validateCalculator = (config, values) => {
    let errorsList = []

    errorsList = [
        ...validateSectionTimes(config.times.validation, values.times),
        ...validateSectionShipment(values.shipment),
        ...validateSectionSpindles(config.spindles.validation, values.spindles),
        ...validateSectionBody(config.body.validation, values.body),
        ...validateSectionExtra(values.extra)
    ]

    return errorsList
}

export default validateCalculator