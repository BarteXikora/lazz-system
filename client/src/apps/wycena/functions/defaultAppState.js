import defaultConfig from './defaultConfig'

const defaultAppReducer = {
    showCalculator: true,
    config: defaultConfig,
    calculator: {
        times: {
            timeProject: 0,
            timeMilling: 0,
            timeLathe: 0,
            timeMontage: 0
        },
        shipment: { id: 0, name: 'Polska' },
        spindles: [
            {
                id: 0,
                type: { id: 0 },
                montage: { id: 0 },
                cnt: 0
            }
        ]
    }
}

export default defaultAppReducer