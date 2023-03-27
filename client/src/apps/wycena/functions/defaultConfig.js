export default {
    times: {
        validation: {
            timeProject: { min: .5, max: 100 },
            timeMilling: { min: .5, max: 100 },
            timeLathe: { min: .5, max: 100 },
            timeMontage: { min: .5, max: 100 }
        }
    },
    shipment: [
        { id: 0, name: 'Polska', price: 0 },
        { id: 1, name: 'UE', price: 0 }
    ],
    spindles: {
        types: [
            { id: 0, name: 'Szybkozłączka - standard', price: 0 },
            { id: 1, name: 'Wkręcane', price: 0 },
            { id: 2, name: 'Szybkozłączka WEKKE', price: 0 },
            { id: 3, name: 'Na koszyczek ( tuleja zaciskowa) 16mm', price: 0 },
        ],
        montage: [
            { id: 0, name: '6001 32 mm rozstaw', price: 0 },
            { id: 1, name: 'hk - rozstaw inny niż 32 mm', price: 0 },
        ],
        validation: {
            spindlesLimit: 2,
            cntSum: { min: 1, max: 10000 }
        }
    },
    body: {
        flatBars: [
            { id: 0, name: 'Płaskownik 80', price: 0 },
            { id: 1, name: 'Płaskownik 100', price: 0 },
            { id: 2, name: 'Płaskownik 120', price: 0 },
        ],
        validation: {
            length: { min: 1, max: 100000 }
        }
    },
    extra: {
        cluthes: [
            { id: 0, name: 'LAZZONI - na płetwę', price: 0 },
            { id: 1, name: 'Gomad', price: 0 }
        ]
    },
    allowedCurrencies: [
        { id: 'pln', name: 'PLN' },
        { id: 'eur', name: 'EUR' }
    ]
}