import { useState, useEffect } from 'react'

import TableBody from './TableBody'

const PricesTable = ({ prices, currency = 'PLN' }) => {
    const emptyFormatedPrices = { newCustomer: {}, regularCustomer: {} }

    const [formatedPrices, setFormatedPrices] = useState({ ...emptyFormatedPrices })

    const doFormat = (number) => {
        number = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ').replace('.', ',')

        return number
    }

    useEffect(() => {
        let newFormatedPrices = { ...emptyFormatedPrices }

        if (!prices.newCustomer) return

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

        setFormatedPrices(newFormatedPrices)

    }, [prices])

    return <div className="px-3 py-4">
        <div className="price-table mb-4">
            <div className="section-sec-d fw-bold py-2 px-3 font-big">Nowy klient:</div>

            <TableBody
                pricesData={[
                    { name: 'Cena', value: formatedPrices.newCustomer.price },
                    { name: 'Max rabat', value: formatedPrices.newCustomer.maxDiscount },
                    { name: 'Wartość max rabatu', value: formatedPrices.newCustomer.discountValue },
                    { name: 'Cena z max rabatem', value: formatedPrices.newCustomer.afterDiscount }
                ]}
                isBig={true}
            />
        </div>

        <div className="price-table mb-3">
            <div className="section-prim-d fw-bold py-2 px-3 font-big">Stały klient:</div>

            <TableBody
                pricesData={[
                    { name: 'Cena', value: formatedPrices.regularCustomer.price },
                    { name: 'Max rabat', value: formatedPrices.regularCustomer.maxDiscount },
                    { name: 'Wartość max rabatu', value: formatedPrices.regularCustomer.discountValue },
                    { name: 'Cena z max rabatem', value: formatedPrices.regularCustomer.afterDiscount }
                ]}
                isBig={true}
            />
        </div>
    </div>
}

export default PricesTable

// price={formatedPrices.newCustomer.price}
            // maxDiscount={formatedPrices.newCustomer.maxDiscount}
            // discountValue={formatedPrices.newCustomer.discountValue}
            // afterDiscount={formatedPrices.newCustomer.afterDiscount}