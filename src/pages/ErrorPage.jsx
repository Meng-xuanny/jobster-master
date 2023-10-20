import React from "react";
import img from "../assets/images/not-found.svg";
import { Link } from "react-router-dom";
import Wrapper from "../wrappers/ErrorPage";

const ErrorPage = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! Page not found</h3>
        <p>we can't seem to find the page you are looking for.</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
};

export default ErrorPage;
