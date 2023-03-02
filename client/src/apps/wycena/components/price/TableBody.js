const TableBody = ({ price, maxDiscount, discountValue, afterDiscount }) => {
    return <div className="d-flex">
        <div>
            <div className="price-table-field section-black px-3 py-2 pe-4">
                Cena:
            </div>

            <div className="price-table-field section-gray-d px-3 py-2 pe-4">
                Max rabat:
            </div>

            <div className="price-table-field section-black px-3 py-2 pe-4">
                Wartość max rabatu:
            </div>

            <div className="price-table-field section-gray-d px-3 py-2 pe-4">
                Cena po max rabacie:
            </div>
        </div>

        <div className="w-100 fw-bold">
            <div className="section-gray px-3 py-2 text-end">
                {price}
            </div>

            <div className="section-white px-3 py-2 text-end">
                {maxDiscount}
            </div>

            <div className="section-gray px-3 py-2 text-end">
                {discountValue}
            </div>

            <div className="section-white px-3 py-2 text-end">
                {afterDiscount}
            </div>
        </div>
    </div>
}

export default TableBody