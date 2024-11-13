import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Contact, Error, HomeLayout, Landing, Login, Register } from "./pages";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path:"about",
        element:<About/>
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
