import { FormInput } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { customFetch } from "../util/customFetch";
import { toast } from "react-toastify";
import {
  FaHome,
  FaUser,
  FaLock,
  FaSignInAlt,
  FaUserShield
} from "react-icons/fa";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await customFetch.post("/login", data);

    // Store token and user data in localStorage
    localStorage.setItem("authToken", response.data.token); // Store token
    localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data (e.g., role, name)
    toast.success("Login successful");
    return redirect("/userDashboard");
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);

    return null;
  }
};

const Login = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-200 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold flex items-center gap-2 justify-center">
          <FaUser /> Volunteer Login
        </h4>
        <div>
          <label className="text-lg font-medium flex items-center gap-2">
            <FaUser /> Email
          </label>
          <FormInput
            type="email"
            name="email"
          />
        </div>
        <div>
          <label className="text-lg font-medium flex items-center gap-2">
            <FaLock /> Password
          </label>
          <FormInput
            type="password"
            name="password"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-block flex items-center justify-center gap-2"
          >
            <FaSignInAlt /> Login
          </button>
        </div>

        <Link
          to="/adminLogin"
          className="btn btn-secondary btn-block flex items-center justify-center gap-2 uppercase"
        >
          <FaUserShield /> I am Admin
        </Link>

        <Link
          to="/"
          className="btn btn-outline btn-primary btn-block flex items-center justify-center gap-2 mt-4 rounded-lg"
        >
          <FaHome /> Back to Homepage
        </Link>

        <p className="text-center mt-4">
          Not a Volunteer yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
