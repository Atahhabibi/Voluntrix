import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, setNavLinksLogout } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { parseJwt } from "../util/dataHandlingFunctions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  const decode=parseJwt(token); 

  const username=decode?.username || "user"; 

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("adminUser");
    toast.success("You have logged out successfully!");
    navigate("/"); // Navigate to Home
  };

  return (
    <header className=" bg-neutral py-2 text-neutral-content ">
      <div className="align-element flex justify-center sm:justify-end ">
        {token ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm capitalize">Welcome! {username}</p>
            <button
              className="btn btn-xs btn-outline btn-primary uppercase mr-8"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-3 justify-center items-center px-8 ">
            <Link
              to="/login"
              className="link link-hover text-xs sm:text-sm capitalize btn btn-primary btn-sm"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="link link-hover text-xs sm:text-sm capitalize btn btn-primary btn-sm"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
