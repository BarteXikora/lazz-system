import SelectInput from '../../../../components/SelectInput'

const SectionBody = () => {
    const _flatBars = [
        { id: 0, name: 'Płaskownik 80' }
    ]

    return <div className="row section-gray py-4 mt-4 m-0">
        <div className="col-12 px-3">
            <h2 className="font-big fw-bold m-0">Korpus głowicy:</h2>
        </div>

        <div className="col-6 px-3 mt-3">
            <label>
                <span>Długość korpusu:</span>

                <div className="input-group">
                    <input type="text" className='form-control text-end' />

                    <div className="input-unit input-unit-end">mm</div>
                </div>

            </label>
        </div>

        <div className="col-6 px-3 mt-3">
            <label>
                <span>Płaskownik:</span>

                <SelectInput
                    options={_flatBars}
                    state={_flatBars[0]}
                    setState={null}
                />
            </label>
        </div>
    </div>
}

export default SectionBody