import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../util/customFetch";
import { toast } from "react-toastify";
import store from "../../store";
import { setAuth } from "../features/admin/admin";

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
        className="card w-96 p-8 bg-base-200 shadow-lg flex flex-col gap-y-4  "
      >
        <h4 className="text-center text-3xl font-bold">Admin Login</h4>
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
          <SubmitBtn text="Admin login" />
        </div>

        <Link to={"/login"} className="btn btn-secondary btn-block uppercase">
          I am volunteer
        </Link>
      </Form>
    </section>
  );
};

export default AdminLoginPage;
