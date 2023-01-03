const DockButton = ({ icon, title, label }) => {
    return <button title={label} className="btn btn-dock btn-full-width btn-icon">
        <img src={icon} alt={label} />
        <span>{title}</span>
    </button>
}

export default DockButton