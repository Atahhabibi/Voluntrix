import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { customFetch } from "../util/customFetch";
import { toast } from "react-toastify";
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaUserShield
} from "react-icons/fa";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/register", data);
    toast.success("Account Created Successfully");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Please double-check your credentials";
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-200 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold flex items-center gap-2 justify-center">
          <FaUserPlus /> Register
        </h4>
        <div>
          <label className="text-lg font-medium flex items-center gap-2">
            <FaUser /> Username
          </label>
          <FormInput type="text" name="username" defaultValue="atah jan" />
        </div>
        <div>
          <label className="text-lg font-medium flex items-center gap-2">
            <FaEnvelope /> Email
          </label>
          <FormInput type="email" name="email" defaultValue="atah@gamil.com" />
        </div>
        <div>
          <label className="text-lg font-medium flex items-center gap-2">
            <FaLock /> Password
          </label>
          <FormInput type="password" name="password" defaultValue="secret" />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-block flex items-center justify-center gap-2"
          >
            <FaUserPlus /> Register
          </button>
        </div>

        <p className="text-center">
          Already a Volunteer?{" "}
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Login
          </Link>
        </p>

        <Link
          to="/adminLogin"
          className="btn btn-secondary btn-block flex items-center justify-center gap-2 uppercase mt-4"
        >
          <FaUserShield /> I am Admin
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

export default Register;
