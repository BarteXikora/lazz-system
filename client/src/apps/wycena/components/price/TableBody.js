import { useState, useEffect } from 'react'

const TableBody = ({ pricesData = {}, isBig = true }) => {
    const [PYClass, setPYClass] = useState('2')
    useEffect(() => setPYClass(isBig ? 'py-2' : 'py-1'), [isBig])

    return <div className="d-flex">
        <div>
            {
                pricesData.map((row, n) => <div
                    key={n}
                    className={`price-table-field 
                        price-table-name-${n % 2 === 0 ? 'e' : 'o'} 
                        px-3 ${PYClass} pe-4`}
                >
                    {row.name}:
                </div>)
            }
        </div>

        <div className="w-100 fw-bold">
            {
                pricesData.map((row, n) => <div
                    key={n}
                    className={`price-table-value-${n % 2 === 0 ? 'e' : 'o'} px-3 ${PYClass} text-end`}
                >
                    {row.value}
                </div>)
            }
        </div>
    </div>
}

export default TableBody