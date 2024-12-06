import { FormInput } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { customFetch } from "../util/customFetch";
import { toast } from "react-toastify";
import {
  FaHome,
  FaUserShield,
  FaLock,
  FaSignInAlt,
  FaUser
} from "react-icons/fa";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Send login request to the backend
    const response = await customFetch.post("/adminLogin", data);

    // Store token and user data in localStorage
    const token = response.data.token;
    localStorage.setItem("authToken", token); // Store token
    localStorage.setItem("adminUser", JSON.stringify(response.data.admin)); // Store admin details

    // Show success toast and redirect
    toast.success("Login successful!");
    return redirect("/adminDashboard");
  } catch (error) {
    console.error(error?.response?.data?.message);

    // Display error message via toast
    toast.error(error?.response?.data?.message || "Login failed!");
    return null;
  }
};

const AdminLoginPage = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-200 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold flex items-center gap-2 justify-center">
          <FaUserShield /> Admin Login
        </h4>
        <div>
          <label className="text-lg font-medium flex items-center gap-2">
            <FaUser /> Email
          </label>
          <FormInput
            type="email"
            name="email"
            defaultValue="atahhabibi@gmail.com"
          />
        </div>
        <div>
          <label className="text-lg font-medium flex items-center gap-2">
            <FaLock /> Password
          </label>
          <FormInput
            type="password"
            name="password"
            defaultValue="atah123"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-block flex items-center justify-center gap-2"
          >
            <FaSignInAlt /> Admin Login
          </button>
        </div>

        <Link
          to="/login"
          className="btn btn-secondary btn-block flex items-center justify-center gap-2 uppercase"
        >
          <FaUser /> I am Volunteer
        </Link>

        <Link
          to="/"
          className="btn btn-outline btn-primary btn-block flex items-center justify-center gap-2 mt-4 rounded-lg"
        >
          <FaHome /> Back to Homepage
        </Link>
      </Form>
    </section>
  );
};

export default AdminLoginPage;
