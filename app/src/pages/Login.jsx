import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../util/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await customFetch.post("/login", data);

    // Store token and user data in localStorage
    localStorage.setItem("authToken", response.data.token); // Store token
    localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data (e.g., role, name)
    toast.success("login succesfully");

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
        className="card w-96 p-8 bg-base-200 shadow-lg flex flex-col gap-y-4  "
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="email"
          name="email"
          defaultValue="atah_habibi@gmail.com"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="atah_habibi@gmail.com"
        />

        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>

        <button type="button" className="btn btn-secondary btn-block uppercase">
          Admin only
        </button>

        <p className="text-center">
          Not a Volunteer yet ?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
