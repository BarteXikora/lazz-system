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
        shipment: { id: -1 },
        spindles: [
            {
                type: { id: -1 },
                montage: { id: -1 },
                cnt: 0
            }
        ],
        body: {
            length: 0,
            flatBar: { id: -1 }
        },
        extra: {
            cluth: { id: -1 },
            backHead: false
        }
    }
}

export default defaultAppReducer