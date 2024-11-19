import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../util/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/register", data);
    toast.success("Account Created Succesfully");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "please double check your credentials";
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-200 shadow-lg flex flex-col gap-y-4  "
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput
          type="text"
          label="Username"
          name="username"
          defaultValue="atah jan"
        />
        <FormInput
          type="email"
          label="email"
          name="email"
          defaultValue="atah@gamil.com"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="secret"
        />

        <div className="mt-4">
          <SubmitBtn text="Register" />
        </div>

        <p className="text-center">
          Already a Volunteer ?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
