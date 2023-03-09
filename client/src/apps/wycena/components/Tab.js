const Tab = ({ title, icon, isActive, onClick }) => {
    return <button
        className={`tab ${isActive ? 'tab-active' : ''} py-1 ps-3 pe-4 mt-2 ms-2`}
        onClick={onClick}
    >
        <img src={icon} alt={`Otwórz zakładkę: ${title}`} style={{ width: '35px' }} className='me-2' />

        {title}
    </button>
}

export default Tab