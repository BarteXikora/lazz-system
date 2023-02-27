const Tab = ({ title, isActive, onClick }) => {
    return <button
        className={`tab ${isActive ? 'tab-active' : ''} py-2 px-4 mt-2 ms-2`}
        onClick={onClick}
    >
        {title}
    </button>
}

export default Tab