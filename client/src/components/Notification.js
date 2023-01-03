// Imports images:
import iconView from '../img/icon-view.png'
import iconUnview from '../img/icon-unview.png'
import iconArchive from '../img/icon-archive.png'

const Notification = ({ time, title, short, status }) => {
    return (
        <div className={`notification-box mb-2 py-3 d-flex ${status === 0 && 'active'}`}>
            <div className="d-flex align-items-center ps-3 pe-4">
                <div className="d-block">
                    <span className="date">{time}</span>
                    <h2 className="font-big fw-bold mb-1">{title}</h2>
                    <p className="p-0 m-0">{short}</p>
                </div>
            </div>

            <div className="notification-btns d-flex flex-column align-items-center justify-content-end">
                {
                    status === 0 ? (
                        <button title="Oznacz jako odczytane" className="btn btn-tr btn-icon btn-icon-small">
                            <img src={iconView} alt="Oznacz jako odczytane" />
                        </button>
                    ) : (
                        <button title="Oznacz jako nieodczytane" className="btn btn-tr btn-icon btn-icon-small">
                            <img src={iconUnview} alt="Oznacz jako nieodczytane" />
                        </button>
                    )
                }

                <button title="Archiwizuj" className="btn btn-tr btn-icon btn-icon-small">
                    <img src={iconArchive} alt="Archiwizuj" />
                </button>
            </div>
        </div>
    )
}

export default Notification