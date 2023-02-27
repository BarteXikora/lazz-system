const defaultAppReducer = {
    showCalculator: true,
    calculator: {
        times: {
            timeProject: 0,
            timeMilling: 0,
            timeLathe: 0,
            timeMontage: 0
        },
        shipment: { id: 0, name: 'Polska' },
        spindles: [{ id: 0, type: { id: -1, name: '' }, montage: { id: -1, name: '' }, cnt: 1 }]
    }
}

export default defaultAppReducer