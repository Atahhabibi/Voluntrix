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
  Profile,
  EventDetailsPage,
  EditProfilePage,
  SignupForTaskPage,
  RecordsPage,
  DetailChartsPage,
  AdminLoginPage,
  DetailTablesPage,
  EventDetailsError,
  AuthenticationError,
  AdminDashboardError,
  DetailTablesPageError,
  DetailChartsPageError,
  RecordsPageError,
  LandingError,
  VolunteerManagementPageError,
  TaskManagementPageError,
  UserDashboardError,
  SignupForTaskError,
  EventManagementError,
  ClockInOutError
} from "./pages";
import About from "./pages/About";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { ClockInOut } from "./components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import { loader as EventDetailLoader } from "./pages/EventDetailsPage";
import { loader as EditProfileLoader } from "./pages/EditProfilePage";
import { loader as signupTaskLoader } from "./pages/SignupForTaskPage";
import { loader as RecordLoader } from "./pages/RecordPage";
import { action as adminLoginAction } from "./pages/AdminLoginPage";
import ProfileError from "./pages/ErrorPages/ProfileError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <LandingError />,
    children: [
      { index: true, element: <Landing />, errorElement: <LandingError />},
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "tasks", element: <Tasks /> },
      { path: "events", element: <Events /> },
      {
        path: "events/:id",
        element: <EventDetailsPage />,
        loader: EventDetailLoader,
        errorElement: <EventDetailsError />
      },
      {
        path: "userDashboard",
        element: (
          <PrivateRoute
            element={<UserDashbaord />}
            allowedRoles={["volunteer"]}
          />
        ),
        errorElement: <UserDashboardError />
      },
      {
        path: "/tasks/:id",
        element: <SignupForTaskPage />,
        loader: signupTaskLoader,
        errorElement: <SignupForTaskError />
      },
      {
        path: "/profile/:id",
        element: <Profile />,
        errorElement: <ProfileError />
      },
      {
        path: "/editProfile/:id",
        element: <EditProfilePage />,
        loader: EditProfileLoader,
        errorElement: <ProfileError />
      },
      {
        path: "adminDashboard",
        element: (
          <PrivateRoute
            element={<AdminDashboard />}
            allowedRoles={["admin", "super-admin"]}
          />
        ),

        errorElement: <AdminDashboardError />
      },

      {
        path: "/volunteer-management",
        element: <VolunteerManagementPage />,
        errorElement: <VolunteerManagementPageError />
      },
      {
        path: "/task-management",
        element: <TaskManagementPage />,
        errorElement: <TaskManagementPageError />
      },
      {
        path: "/event-management",
        element: <EventManagementPage />,
        errorElement: <EventManagementError />
      },

      {
        path: "clockInOut",
        element: <ClockInOut />,
        errorElement: <ClockInOutError />
      },
      {
        path: "/records",
        element: <RecordsPage />,
        loader: RecordLoader,
        errorElement: <RecordsPageError />
      },
      {
        path: "/detailChartsPage",
        element: <DetailChartsPage />,
        errorElement: <DetailChartsPageError />
      },
      {
        path: "/detailTablesPage",
        element: <DetailTablesPage />,
        errorElement: <DetailTablesPageError />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
    errorElement: <AuthenticationError />
  },
  {
    path: "/adminLogin",
    element: <AdminLoginPage />,
    action: adminLoginAction,
    errorElement: <AuthenticationError />
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
    errorElement: <AuthenticationError />
  },

  { path: "*", element: <Error /> } // Catch-all for undefined routes
]);

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={1500} />
      <ReactQueryDevtools initialIsOpen={true} />
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
