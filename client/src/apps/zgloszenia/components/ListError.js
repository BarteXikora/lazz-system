import picError from '../../../img/pic-error.png'
import iconReload from '../img/icon-reload.png'

const ListError = ({ message, code }) => {
    return <div className="mt-5 pt-4 text-center">
        <img src={picError} alt="Wystąpił błąd!" />

        <h2 className="fw-bold font-title font-wrong">Nie udało się załadować listy!</h2>

        <p>
            {message}
        </p>

        {
            code && <span className="font-gray">Kod błędu: <b>{code}</b></span>
        }

        <div className="d-flex justify-content-center">
            <button className="mt-4 btn btn-prim btn-icon-text">
                <img src={iconReload} alt="Odśwież" />
                <span>Odśwież</span>
            </button>
        </div>

    </div>
}

export default ListError