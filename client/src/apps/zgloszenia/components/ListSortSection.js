const ListSortSection = ({ cols, text, isActive, isDesc, isEven, action }) => {
    return <div
        className={`col-${cols} p-0 section-gray${isEven ? '-d' : ''} d-flex align-items-center justify-content-between fw-bold`}
    >
        <span className="ps-3">{text}</span>

        <button
            className={`btn btn-sort ${isActive && 'btn-sort-active'} ${isDesc && 'btn-sort-desc'}`}
            onClick={action}
        >
        </button>
    </div>
}

export default ListSortSection