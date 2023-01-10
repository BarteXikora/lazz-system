import errorPic from '../img/pic-error.png'

const FatalError = ({ message, code, reload }) => {
    return <div
        className="container-xy section-gradient-s d-flex align-items-center justify-content-center"
    >
        <div className="text-center mb-5 pb-5">
            <img src={errorPic} alt="Wystąpił błąd krytyczny!" />

            <h2 className="font-wrong font-subtitle fw-bold mb-2">
                I to by było na tyle...
            </h2>

            <p>
                {message || 'Wystapił błąd krytyczny aplikacji.'}
            </p>

            {
                code && <span className="font-gray">Kod błedu: <b>{code}</b></span>
            }

            <div className="mt-5">
                <a href="#" className="btn btn-prim m-1">Skontaktuj się z administratorem</a> <br />
                <button onClick={reload} className="btn btn-sec m-1">Załaduj aplikację ponownie</button>
            </div>
        </div>
    </div>
}

export default FatalError