const TableBody = ({ price, setPrice, discount, setDiscount }) => {
    return <table>
        <tr>
            <td className="price-table-name-e px-3 pe-4 py-2">Cena:</td>

            <td className="w-100 p-0">
                <div className="d-flex">
                    <input
                        type="number"
                        className="text-end"
                        value={price === 0 ? '' : price}
                        placeholder='0'
                        onChange={e => setPrice(Number(e.target.value))}
                    />

                    <div
                        className="input-unit input-unit-end"
                        title='Waluta: PLN'
                    >
                        PLN
                    </div>
                </div>
            </td>
        </tr>

        <tr>
            <td className="price-table-name-o px-3 pe-4 py-2 text-nowrap">Max. rabat:</td>

            <td className="w-100 p-0">
                <div className="d-flex">
                    <input
                        type="number"
                        className="text-end"
                        value={discount === 0 ? '' : discount}
                        placeholder='0'
                        onChange={e => setDiscount(Number(e.target.value))}
                    />

                    <div
                        className="input-unit input-unit-end text-center"
                        title='Jednostka: Procent'
                        style={{ minWidth: '55px' }}
                    >
                        %
                    </div>
                </div>
            </td>
        </tr>
    </table>
}

export const PTNewCustomer = ({ price, setPrice, discount, setDiscount }) => {
    return <div className="price-table mb-4">
        <div className="section-sec-d fw-bold py-2 px-3 font-big">Nowy klient:</div>

        <TableBody price={price} setPrice={setPrice} discount={discount} setDiscount={setDiscount} />
    </div>
}

export const PTRegularCustomer = ({ price, setPrice, discount, setDiscount }) => {
    return <div className="price-table mb-4">
        <div className="section-prim-d fw-bold py-2 px-3 font-big">Stały klient:</div>

        <TableBody price={price} setPrice={setPrice} discount={discount} setDiscount={setDiscount} />
    </div>
}
