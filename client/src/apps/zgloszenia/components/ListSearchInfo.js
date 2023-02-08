import iconX from '../../../img/icon-close.png'

const ListSearchInfo = ({ phrase, action }) => {
    return <div className="info-box my-4 d-flex align-items-center justify-content-between">
        <h2 className="fw-bold font-big mb-0">
            Wyniki wyszukiwania dla <q><i className="font-black">{phrase}</i></q>:
        </h2>

        <button className="btn btn-x btn-icon-small" onClick={action}>
            <img src={iconX} alt="Anuluj wyszukiwanie" />
        </button>
    </div>
}

export default ListSearchInfo