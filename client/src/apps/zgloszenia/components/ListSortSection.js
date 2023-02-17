const ListSortSection = ({ classes, text, isActive, isDesc, action }) => {
    return <div
        className={`${classes} p-0 d-flex align-items-center justify-content-between fw-bold py-1 py-md-0 overflow-hidden`}
    >
        <span className="ps-3">{text}</span>

        <button
            className={`btn btn-sort ${isActive && 'btn-sort-active'} ${isDesc && 'btn-sort-desc'} d-none d-md-flex`}
            onClick={action}
        >
        </button>
    </div>
}

export default ListSortSection