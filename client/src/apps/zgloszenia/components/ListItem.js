import { useRef } from 'react'
import moment from 'moment'

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
        <div className="item-column sep-right col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2 py-1 ps-4 d-flex align-items-center">
            <div>
                {
                    moment(contact.date).isValid() ? <>
                        <b>{moment(contact.date).format('DD.MM.YYYY')}</b> <br />
                        {moment(contact.date).format('HH:mm')}
                    </>

                        :

                        <span className="font-gray fw-bold">[ brak danych ]</span>
                }
            </div>
        </div>

        <div className="item-column sep-sm-right col-8 col-sm-4 py-1 ps-3 d-flex align-items-center">
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

        <div className="item-column sep-right d-none d-md-flex d-lg-none d-xl-flex col-2 py-1 ps-3 d-flex align-items-center">
            <b>
                {
                    contact.department &&
                    contact.department.name ||
                    <span className="font-gray">[ brak danych ]</span>
                }
            </b>
        </div>

        <div className="item-column sep-right d-none d-sm-flex col-3 py-1 ps-3 d-flex align-items-center">
            <b>
                {
                    contact.worker &&
                    contact.worker.name ||
                    <span className="font-gray">[ nie przekazano ]</span>
                }
            </b>
        </div>

        <div className="item-column d-none d-sm-flex col-2 col-md-1 col-lg-2 col-xl-1 py-1 d-flex align-items-center justify-content-center">
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