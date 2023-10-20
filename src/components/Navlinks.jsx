import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

const Navlinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map(({ id, text, path, icon }) => (
        <NavLink
          key={id}
          to={path}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={toggleSidebar}
          end
        >
          <span className="icon">{icon}</span>
          {text}
        </NavLink>
      ))}
    </div>
  );
};

export default Navlinks;
