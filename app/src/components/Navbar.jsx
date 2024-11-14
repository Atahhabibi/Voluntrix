import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  // Function to close sidebar when a link is clicked
  const handleLinkClick = () => {
    const sidebarToggle = document.getElementById("sidebar-toggle");
    if (sidebarToggle) sidebarToggle.checked = false;
  };

  return (
    <div className="drawer drawer-mobile">
      {/* Sidebar Toggle */}
      <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="bg-base-200 navbar align-element">
          <div className="navbar-start">
            {/* Brand Logo */}
            <NavLink
              to="/"
              className="hidden lg:flex btn btn-primary text-3xl items-center capitalize"
            >
              V
            </NavLink>

            {/* Sidebar Toggle Button for Mobile */}
            <label htmlFor="sidebar-toggle" className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
          </div>

          {/* Center Navbar Links for Larger Screens */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal">
              <li>
                <NavLink to="/userDashboard" onClick={handleLinkClick}>
                  User Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/adminDashboard" onClick={handleLinkClick}>
                  Admin Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/" onClick={handleLinkClick}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={handleLinkClick}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/tasks" onClick={handleLinkClick}>
                  Tasks
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" onClick={handleLinkClick}>
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={handleLinkClick}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right Navbar Items */}
          <div className="navbar-end">
            <label className="swap swap-rotate">
              <input type="checkbox" onChange={handleTheme} />
              <BsMoonFill className="swap-on h-6 w-6" />
              <BsSunFill className="swap-off h-6 w-6" />
            </label>

            <div className="indicator ml-4">
              <NavLink
                to="/login"
                className="btn btn-secondary capitalize btn-sm"
              >
                I am Admin
              </NavLink>
            </div>
          </div>
        </nav>
      </div>

      {/* Sidebar Menu */}
      <div className="drawer-side">
        <label htmlFor="sidebar-toggle" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-base-200 text-base-content">
          <li>
            <NavLink to="/userDashboard" onClick={handleLinkClick}>
              User Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/adminDashboard" onClick={handleLinkClick}>
              Admin Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={handleLinkClick}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={handleLinkClick}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks" onClick={handleLinkClick}>
              Tasks
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" onClick={handleLinkClick}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={handleLinkClick}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
