import picWIP from '../img/pic-wip.png'

const WorkInProgress = () => {
    return <div
        className="container-xy section-gradient-s d-flex align-items-center justify-content-center"
    >
        <div className="text-center mb-5 pb-5">
            <img src={picWIP} alt="Prace trwają..." />

            <h2 className="font-subtitle fw-bold mt-4 mb-2">
                Ta aplikacja nie jest <br /> jeszcze gotowa...
            </h2>

            <p>
                Proszę wybrać inną aplikację w <b>Docku</b>
            </p>
        </div>
    </div>
}

export default WorkInProgress