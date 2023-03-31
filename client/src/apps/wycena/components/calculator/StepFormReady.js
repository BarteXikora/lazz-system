import picSuccess from '../../../../img/pic-success.png'

const StepFormReady = () => {
    return <div className="row pt-5 pb-5 m-0">
        <div className="col-6 px-3">
            <div className="w-100 section-gray-l d-flex align-items-center px-3">
                <img src={picSuccess} width={100} />

                <div className='ps-4'>
                    <h5 className="font-big fw-bold m-0">Formularz wypełniony!</h5>

                    <p className='m-0'>
                        Wycena pojawi się w sekcji po lewej.
                    </p>
                </div>
            </div>
        </div>
    </div>
}

export default StepFormReady