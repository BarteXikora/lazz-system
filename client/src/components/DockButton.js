const DockButton = ({ icon, title, label, action, classActive }) => {
    return <button
        onClick={action}
        title={label}
        className={`btn btn-dock btn-full-width btn-icon ${classActive && 'active'}`}
    >
        <img src={icon} alt={label} />
        <span>{title}</span>
    </button>
}

export default DockButton