import {
  Contact,
  Error,
  Events,
  HomeLayout,
  Landing,
  Login,
  Register,
  Tasks,
  UserDashbaord
} from "./pages";
import About from "./pages/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import AdminDasboard from './pages/AdminDasboard';
import { ClockInOut } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "tasks", element: <Tasks /> },
      { path: "events", element: <Events /> },
      { path: "userDashboard", element: <UserDashbaord /> },
      { path: "adminDashboard", element: <AdminDasboard /> },
      { path: "clockInOut", element: <ClockInOut /> }
    ]
  },
  { path: "/login", element: <Login />, action: loginAction },
  { path: "/register", element: <Register />, action: registerAction },

  { path: "*", element: <Error /> } // Catch-all for undefined routes
]);

function App() {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true
      }}
    />
  );
}

export default App;
