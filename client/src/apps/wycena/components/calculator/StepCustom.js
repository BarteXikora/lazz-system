import StepSendMail from "./StepSendMail"

const StepCustom = () => {
    return <>
        <div className="row section-gray pt-4 pb-4 m-0">
            <div className="col-12 px-3">
                <h2 className="font-big fw-bold m-0 mt-2">Głowice specjalne:</h2>

                <p className="m-0">
                    Głowice spacjalne muszą zostać wycenione przez dział głowic!
                </p>
            </div>
        </div>

        <StepSendMail />
    </>
}

export default StepCustom