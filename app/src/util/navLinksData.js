const navLinkData = [
  {
    label: "Dashboard",
    path: "/userDashboard",
    roles: ["volunteer"] // Accessible only by volunteers
  },
  {
    label: "Dashboard",
    path: "/adminDashboard",
    roles: ["admin", "super-admin"] // Accessible only by admin and super-admin
  },
  {
    label: "Home",
    path: "/",
    roles: ["volunteer", "admin", "super-admin"] // Accessible by all roles
  },
  {
    label: "About",
    path: "/about",
    roles: ["volunteer", "admin", "super-admin"] // Accessible by all roles
  },
  {
    label: "Tasks",
    path: "/tasks",
    roles: ["volunteer", "admin", "super-admin"] // Accessible by all roles
  },
  {
    label: "Events",
    path: "/events",
    roles: ["volunteer", "admin", "super-admin"] // Accessible by all roles
  },
  {
    label: "Contact",
    path: "/contact",
    roles: ["volunteer", "admin", "super-admin"] // Accessible by all roles
  }
];

export default navLinkData;
