import React from "react";
import Wrapper from "../wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { Logo } from "./index";
import { toggleSidebar } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

import Navlinks from "./Navlinks";

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button
            className="close-btn"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <Navlinks toggleSidebar={() => dispatch(toggleSidebar())} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
