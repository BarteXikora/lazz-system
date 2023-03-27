const doFormat = (number) => {
    number = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ').replace('.', ',')

    return number
}

const formatePrices = (prices, currency) => {
    let newFormatedPrices = { newCustomer: {}, regularCustomer: {} }

    newFormatedPrices.newCustomer['price'] = doFormat(prices.newCustomer.price) + ' ' + currency
    newFormatedPrices.newCustomer['maxDiscount'] = prices.newCustomer.maxDiscount + ' %'
    newFormatedPrices.newCustomer['discountValue']
        = doFormat(prices.newCustomer.price * (prices.newCustomer.maxDiscount / 100)) + ' ' + currency
    newFormatedPrices.newCustomer['afterDiscount']
        = doFormat(prices.newCustomer.price * (1 - (prices.newCustomer.maxDiscount / 100))) + ' ' + currency

    newFormatedPrices.regularCustomer['price'] = doFormat(prices.regularCustomer.price) + currency
    newFormatedPrices.regularCustomer['maxDiscount'] = prices.regularCustomer.maxDiscount + ' %'
    newFormatedPrices.regularCustomer['discountValue']
        = doFormat(prices.regularCustomer.price * (prices.regularCustomer.maxDiscount / 100)) + ' ' + currency
    newFormatedPrices.regularCustomer['afterDiscount']
        = doFormat(prices.regularCustomer.price * (1 - (prices.regularCustomer.maxDiscount / 100))) + ' ' + currency

    return newFormatedPrices
}

export default formatePrices