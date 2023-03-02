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
                price={formatedPrices.newCustomer.price}
                maxDiscount={formatedPrices.newCustomer.maxDiscount}
                discountValue={formatedPrices.newCustomer.discountValue}
                afterDiscount={formatedPrices.newCustomer.afterDiscount}
            />
        </div>

        <div className="price-table mb-3">
            <div className="section-prim-d fw-bold py-2 px-3 font-big">Stały klient:</div>

            <TableBody
                price={formatedPrices.regularCustomer.price}
                maxDiscount={formatedPrices.regularCustomer.maxDiscount}
                discountValue={formatedPrices.regularCustomer.discountValue}
                afterDiscount={formatedPrices.regularCustomer.afterDiscount}
            />
        </div>
    </div>
}

export default PricesTable




/*

<table className="w-100">
        <tr>
            <td>.</td>

            <td>Cena:</td>

            <td>Max. rabat:</td>

            <td>Wartość max rabatu:</td>

            <td>Cena po max rabacie:</td>
        </tr>

        <tr>
            <td>Nowy klient:</td>

            <td>{prices.newCustomer.price} {currency}</td>

            <td>{prices.newCustomer.maxDiscount}%</td>

            <td>
                {(prices.newCustomer.price * (prices.newCustomer.maxDiscount / 100)).toFixed(2)}
                {' ' + currency}
            </td>

            <td>
                {(prices.newCustomer.price * (1 - (prices.newCustomer.maxDiscount / 100))).toFixed(2)}
                {' ' + currency}
            </td>
        </tr>

        <tr>
            <td>Stały klient:</td>

            <td>{prices.regularCustomer.price} {currency}</td>

            <td>{prices.regularCustomer.maxDiscount}%</td>

            <td>
                {(prices.regularCustomer.price * (prices.regularCustomer.maxDiscount / 100)).toFixed(2)}
                {' ' + currency}
            </td>

            <td>
                {(prices.regularCustomer.price * (1 - (prices.regularCustomer.maxDiscount / 100))).toFixed(2)}
                {' ' + currency}
            </td>
        </tr>
    </table>


*/