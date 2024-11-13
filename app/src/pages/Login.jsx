import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";


export const action=async({request})=>{
  const formData=await request.formData(); 
  const data=Object.fromEntries(formData); 
  console.log(data);

}

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
          defaultValue="atah@gamil.com"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="secret"
        />

        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>

        <button type="button" className="btn btn-secondary btn-block uppercase">
         Admin only
        </button>

        <p className="text-center">
          Not a Volunteer yet ? <Link to="/register" className="ml-2 link link-hover link-primary capitalize">register</Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
