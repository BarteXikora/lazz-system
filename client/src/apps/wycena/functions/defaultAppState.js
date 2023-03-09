import defaultConfig from './defaultConfig'
import defaultCalculatorValues from './defaultCalculatorValues'

const defaultAppReducer = {
    showCalculator: true,
    config: defaultConfig,
    calculator: defaultCalculatorValues,
    prices: {
        newCustomer: { price: 0, maxDiscount: 0 },
        regularCustomer: { price: 0, maxDiscount: 0 }
    },
    currency: { id: 'pln' }
}

export default defaultAppReducer