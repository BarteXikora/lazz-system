import TableBody from '../components/price/TableBody'
import SelectInput from '../../../components/SelectInput'

const WindowCalculateDiscount = () => {
    return <div className='row px-2'>
        <div className="col-12">
            <h2 className='font-subtitle fw-bold m-0 mb-md-2'>
                Oblicz cenę głowicy z niestandardowym rabatem.
            </h2>
        </div>

        <div className="col-12 mb-2"><hr /></div>

        <div className="col-5 pe-5">
            <h3 className='font-big fw-bold'>Podaj rabat:</h3>

            <div className="input-group">
                <input
                    type="number"
                    className='form-control text-end'
                />

                <div className="input-unit input-unit-end" title='Jednostka: procent'>%</div>
            </div>

            <span className="d-block mt-4 mb-1">Najwyższe dopuszcalne rabaty:</span>

            <ul>
                <li>Nowy klient: <b>3%</b></li>
                <li>Stały klient: <b>3%</b></li>
            </ul>
        </div>

        <div className="col-7">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className='font-big fw-bold'>Aktualne ceny:</h3>

                <div style={{ width: '150px' }}>
                    <SelectInput
                        options={[{ id: 'pln', name: 'PLN' }, { id: 'eu', name: 'EUR' }]}
                        state={{ id: 'pln', name: 'PLN' }}
                        setState={null}
                    />
                </div>
            </div>

            <div className="section-sec-d fw-bold px-3 py-1">Nowy klient:</div>

            <TableBody
                pricesData={[
                    { name: 'Cena bez rabatu', value: '1 234,56 PLN' },
                    { name: 'Wartość rabatu', value: '234,56 PLN' },
                    { name: 'Cena z rabatem', value: '1 000 PLN' }
                ]}
                isBig={false}
            />

            <div className="section-prim-d fw-bold px-3 py-1 mt-4">Stały klient:</div>

            <TableBody
                pricesData={[
                    { name: 'Cena bez rabatu', value: '1 234,56 PLN' },
                    { name: 'Wartość rabatu', value: '234,56 PLN' },
                    { name: 'Cena z rabatem', value: '1 000 PLN' }
                ]}
                isBig={false}
            />
        </div>

        <div className="col-12 mt-4 text-end">
            <hr />

            <button className='btn btn-prim ms-2'>OK</button>
        </div>
    </div>
}

export default WindowCalculateDiscount