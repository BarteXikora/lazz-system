import logoLazzoni from '../img/logo.png'
import logoLazzoniMobile from '../img/logo-mobile.png'
import iconDock from '../img/icon-dock.png'
import iconBell from '../img/icon-bell.png'

const Navbar = ({ showDock, showNC }) => {
    return <>
        <nav className="navbar">
            <div className="d-block">
                <button onClick={showDock} title="Otwórz Dock" className="btn btn-sec btn-icon">
                    <img src={iconDock} alt="Otwórz dock!" />
                </button>

                <img src={logoLazzoni} height="16" className="d-none d-md-inline px-3" alt="Logo Lazzoni Group" />
                <img src={logoLazzoniMobile} height="26" className="d-md-none px-3" alt="Logo Lazzoni Group" />
            </div>

            <div className="d-block">
                <button onClick={showNC} title="Otwórz centrum powiadomień" className="btn btn-sec btn-icon">
                    <img src={iconBell} alt="Otwórz centrum powiadomień!" />
                    <span className="d-none pill"></span>
                </button>
            </div>
        </nav>
    </>
}

export default Navbar