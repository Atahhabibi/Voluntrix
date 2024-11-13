import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NavLinks from "./Navlinks";

const Navbar = () => {

  const handleTheme = () => {
    dispatch(toggleTheme());
  };



  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center capitalize"
          >
            V
          </NavLink>

          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>

            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>

        <div className="navbar-end">
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />
            <BsMoonFill className="swap-on h-6 w-6" />
            <BsSunFill className="swap-off h-6 w-6" />
          </label>

            <div className="indicator ml-4">
             <NavLink className="btn btn-secondary capitalize btn-sm" to="/login">I am Admin</NavLink>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
