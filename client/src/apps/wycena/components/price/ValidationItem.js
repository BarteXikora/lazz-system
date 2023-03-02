const ValidationItem = ({ number, section, message, addClass }) => {
    return <div className={`row m-0 py-2 mb-2 validation-list-item ${addClass}`}>
        <div className="col-1 text-end fw-bold">{number}.</div>

        <div className="col-3 ps-1 fw-bold">{section}:</div>

        <div className="col-8">{message}</div>
    </div>
}

export default ValidationItem