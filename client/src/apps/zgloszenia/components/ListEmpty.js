import picEmpty from '../../../img/pic-empty.png'
import iconReload from '../img/icon-reload.png'

const ListEmpty = () => {
    return <div className="mt-5 pt-4 text-center">
        <img src={picEmpty} alt="Wystąpił błąd!" />

        <h2 className="fw-bold font-title font-gray-d mb-3">Lista zgłoszeń jest pusta!</h2>

        <p>
            Jeżeli lista powinna zawierać pozycje, skontaktuj<br />
            się z administratorem systemu!
        </p>

        <div className="d-flex justify-content-center">
            <button className="mt-4 btn btn-prim btn-icon-text">
                <img src={iconReload} alt="Odśwież" />
                <span>Odśwież</span>
            </button>
        </div>

    </div>
}

export default ListEmpty