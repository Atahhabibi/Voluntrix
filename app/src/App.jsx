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
  AdminDashboard
} from "./pages";
import About from "./pages/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
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
      { path: "userDashboard", element: <UserDashbaord /> }, // Corrected naming here
      {
        path: "adminDashboard",
        element: <AdminDashboard />, // Corrected naming here
        children: [
          { path: "task-management", element: <TaskManagementPage /> },
          { path: "event-management", element: <EventManagementPage /> },
          { path: "volunteer-management", element: <VolunteerManagementPage /> }
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
