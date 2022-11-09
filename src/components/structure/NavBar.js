import {Link} from "react-router-dom";

const NavBar = () => {
    return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">

        <Link to={"/"}
              className="navbar-brand">
            UniProject
        </Link>

        <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={"/nets"}
                      className="nav-link">
                    N e t s
                </Link>
            </li>
            <li className="nav-item">
                <Link to={"/matmod"}
                      className="nav-link">
                    M a t M o d
                </Link>
            </li>
        </div>

    </nav>);
}
export default NavBar;
