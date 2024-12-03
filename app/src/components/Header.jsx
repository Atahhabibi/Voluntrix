import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, setNavLinksLogout } from "../features/user/userSlice";
import { parseJwt } from "../util/dataHandlingFunctions";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const decode = parseJwt(token);



  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUser());
    dispatch(setNavLinksLogout()); 
    localStorage.setItem("authToken",null);
    localStorage.setItem("user", null);
    localStorage.setItem("adminUser", null);
    toast.success("You have logged out successfully!");
  };

  return (
    <header className=" bg-neutral py-2 text-neutral-content ">
      <div className="align-element flex justify-center sm:justify-end ">
 
        {decode ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm capitalize ">
              Hello, {decode?.username}
            </p>
            <button
              className="btn btn-xs btn-outline btn-primary uppercase mr-8"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-3 justify-center items-center px-8 ">
            <Link
              to="/login"
              className="link link-hover text-xs sm:text-sm capitalize btn btn-primary btn-sm"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="link link-hover text-xs sm:text-sm  capitalize btn btn-primary btn-sm"
            >
              Create an Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
