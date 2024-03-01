import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={"navbar is-dark"}>
            <div className={"navbar-brand"}>
                <span className={"navbar-item"}>Hourkeeper</span>
            </div>
            <div className={"navbar-start"}>
                <Link className={"navbar-item"} to={"/"}>Home</Link>
            </div>
            <div className={"navbar-end"}>
                <Link className={"navbar-item"} to={"/register"}>Sign up</Link>
                <Link className={"navbar-item"} to={"/login"}>Login</Link>
            </div>
        </div>
    )
}

export default Navbar;