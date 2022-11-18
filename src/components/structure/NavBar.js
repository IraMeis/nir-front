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
                <Link to={"/chmmf"}
                      className="nav-link">
                    C H M M F
                </Link>
            </li>
        </div>

    </nav>);
}
export default NavBar;
