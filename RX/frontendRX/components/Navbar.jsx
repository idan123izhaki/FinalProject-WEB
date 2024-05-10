import { Link } from "react-router-dom"
import Logo from "./logo/logo";

function Navbar() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark" style={{height: '12vh'}}>
            <a className="navbar-brand" href="#">
                <Logo />
                {/* <img style={{borderRadius: '30px', border: '3px solid white', marginLeft: '20px'}} src="../images/logo.jpeg" height="55" alt="logo" /> */}
            </a>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link" style={{fontSize: '130%'}}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/session" className="nav-link" style={{fontSize: '130%'}}>Session Panel</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link" style={{fontSize: '130%'}}>About Us</Link>
                </li>
            </div>
        </nav>
    );
}

export default Navbar;