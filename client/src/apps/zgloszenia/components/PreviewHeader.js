import iconDelegate from '../img/icon-delegate.png'
import iconSend from '../img/icon-send.png'
import iconPrint from '../img/icon-print.png'

const PreviewHeader = ({ contact, empty }) => {
    return <header className="mb-4 p-4 section-gray-d">
        <h2 className="font-big fw-bold">
            <span className="font-gray me-2">Zgłoszenie od:</span>
            {' '}

            {contact.company}
            {contact.name && contact.company && ', '}
            {contact.name}

            {!contact.name && !contact.company && <span className="font-gray me-2">[ brak danych ]</span>}
        </h2>

        <div className='mt-4'>
            <button className="btn btn-prim btn-icon-text-small me-2 mb-2 d-inline-block">
                <img src={iconDelegate} alt="Przekaż" />
                <span>Przekaż zgłoszenie...</span>
            </button>

            <button className="btn btn-prim btn-icon-text-small me-2 mb-2 d-inline-block">
                <img src={iconSend} alt="Wyślij" />
                <span>Wyślij e-mail...</span>
            </button>

            <button className="btn btn-prim btn-icon-text-small me-2 mb-2 d-inline-block">
                <img src={iconPrint} alt="Drukuj" />
                <span>Drukuj zgłoszenie</span>
            </button>
        </div>

        <div className="checkbox-container mt-3 ms-1">
            <label>
                Ukryj nieuzupełnione pola

                <input
                    type="checkbox"
                    checked={empty.hideEmptyFields}
                    onChange={() => empty.setHideEmptyFields(!empty.hideEmptyFields)}
                />

                <div className="checkmark"></div>
            </label>
        </div>
    </header>
}

export default PreviewHeader