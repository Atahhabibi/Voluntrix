import {
  Contact,
  Error,
  EventManagementPage,
  Events,
  HomeLayout,
  Landing,
  Login,
  Register,
  TaskManagementPage,
  Tasks,
  UserDashbaord,
  VolunteerManagementPage,
  AdminDashboard,
  Profile
} from "./pages";
import About from "./pages/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { ClockInOut } from "./components";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import { action as TaskCreationAction } from "./components/TaskCreationForm";
import { loader as taskLoader } from "./pages/TaskManagementPage";
import { action as EventCreatinAction } from "./components/EventCreationForm";
import { loader  as eventLoader} from "./pages/EventManagementPage";

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
      {
        path: "userDashboard",
        element: (
          <PrivateRoute
            element={<UserDashbaord />}
            allowedRoles={["volunteer", "admin"]} // Allow both roles
          />
        )
      },
      { path: "/profile", element: <Profile /> },
      {
        path: "adminDashboard",
        element: (
          <PrivateRoute
            element={<AdminDashboard />}
            allowedRoles={["volunteer", "admin"]} // Only allow "admin" role
          />
        ),
        children: [
          { index: true, element: <VolunteerManagementPage /> },
          {
            path: "task-management",
            element: <TaskManagementPage />,
            action: TaskCreationAction,
            loader: taskLoader
          },
          {
            path: "event-management",
            element: <EventManagementPage />,
            action: EventCreatinAction,
            loader: eventLoader
          }
        ]
      },
      { path: "clockInOut", element: <ClockInOut /> }
    ]
  },
  { path: "/login", element: <Login />, action: loginAction },
  { path: "/register", element: <Register />, action: registerAction },
  { path: "*", element: <Error /> } // Catch-all for undefined routes
]);

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={1500} />
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
    </>
  );
}

export default App;
