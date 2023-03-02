import SelectInput from '../../../../components/SelectInput'

const PricesHeader = () => {
    return <div className="d-flex align-items-center justify-content-between px-3 pt-4 mb-2">
        <h1 className="font-subtitle fw-bold m-0">Aktualna wycena głowicy:</h1>

        <div style={{ width: '200px' }}>
            <SelectInput
                options={[{ id: 'pln', name: 'PLN' }, { id: 'eu', name: 'EU' }]}
                state={{ id: 'pln' }}
                setState={null}
            />
        </div>
    </div>
}

export default PricesHeader