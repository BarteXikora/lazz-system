import { useState, useEffect } from 'react'
import formatePrices from '../../functions/formatePrices'

import TableBody from './TableBody'

const PricesTable = ({ prices, currency = 'PLN' }) => {
    const emptyFormatedPrices = { newCustomer: {}, regularCustomer: {} }

    const [formatedPrices, setFormatedPrices] = useState({ ...emptyFormatedPrices })

    useEffect(() => {
        if (!prices.newCustomer) return

        setFormatedPrices(formatePrices(prices, currency))

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