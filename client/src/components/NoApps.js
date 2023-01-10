import noAppsPic from '../img/pic-x.png'

const NoApps = () => {
    return <div
        className="container-xy section-gradient-s d-flex align-items-center justify-content-center"
    >
        <div className="text-center mb-5 pb-5">
            <img src={noAppsPic} alt="Jaki tu spokój..." />

            <h2 className="font-wrong font-subtitle fw-bold mb-5">
                Nie posiadasz praw dostępu <br /> do żadnej aplikacji!
            </h2>

            <a href="#" className="btn btn-sec">Skontaktuj się z administratorem!</a>
        </div>
    </div>
}

export default NoApps