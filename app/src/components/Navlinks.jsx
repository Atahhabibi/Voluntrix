const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "about", text: "about" },
  { id: 3, url: "tasks", text: "Tasks" },
  { id: 4, url: "Events", text: "Events" },
  { id: 5, url: "contact", text: "Contact" },

];
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const user ={username:'atah habibi'}

  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;

        if ((url === "checkout" || url === "orders") && !user) return null;

        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
