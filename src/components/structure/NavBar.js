import {Link} from "react-router-dom";

const NavBar = () => {
    return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">

        <Link to={"/"}
              className="navbar-brand">
            NirProject
        </Link>

        <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={"/nets"}
                      className="nav-link">
                    N e t s
                </Link>
            </li>
            <li className="nav-item">
                <Link to={"/results"}
                      className="nav-link">
                    R e s u l t s
                </Link>
            </li>
        </div>

    </nav>);
}
export default NavBar;
