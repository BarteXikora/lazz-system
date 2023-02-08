import { useRef } from 'react'
import Moment from 'react-moment'

const ListItem = ({ contact, isActive, select, setStar }) => {
    const starRef = useRef()

    const handleItemClick = (event, id) => {
        if (event.target !== starRef.current && event.target !== starRef.current.children[0])
            select(id)
    }

    return <div
        className={`row mb-2 py-2 list-item ${isActive && 'list-item-active'}`}
        onClick={(event) => handleItemClick(event, contact.id)}
    >
        <div className="item-column col-2 py-1 ps-4 d-flex align-items-center">
            <div>
                <b><Moment format='DD.MM.YYYY'>{contact.date}</Moment></b> <br />
                <Moment format='HH:mm'>{contact.date}</Moment>
            </div>
        </div>

        <div className="item-column col-4 py-1 ps-3 d-flex align-items-center">
            <div>
                <b>
                    {
                        contact.company || contact.name || <span className="font-gray">[ brak danych ]</span>
                    }
                </b>

                <br />

                {contact.email}
                {(contact.email && contact.tel) && ', '}
                {contact.tel}
            </div>
        </div>

        <div className="item-column col-2 py-1 ps-3 d-flex align-items-center">
            <b>
                {
                    contact.department &&
                    contact.department.name ||
                    <span className="font-gray">[ brak danych ]</span>
                }
            </b>
        </div>

        <div className="item-column col-3 py-1 ps-3 d-flex align-items-center">
            <b>
                {
                    contact.worker &&
                    contact.worker.name ||
                    <span className="font-gray">[ nie przekazano ]</span>
                }
            </b>
        </div>

        <div className="item-column col-1 py-1 d-flex align-items-center justify-content-center">
            <button
                className={`btn btn-star ${contact.star && 'btn-star-active'}`}
                ref={starRef}
                onClick={() => setStar(contact.id, !contact.star)}
            >
                <span>★</span>
            </button>
        </div>
    </div>
}

export default ListItem