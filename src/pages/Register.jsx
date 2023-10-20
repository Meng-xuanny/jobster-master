import React, { useEffect, useState } from "react";
import { Logo } from "../components";
import Wrapper from "../wrappers/RegisterPage";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((store) => store.user);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields!");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user)
      setTimeout(() => {
        navigate("/");
      }, 2000);
  }, [user]);

  return (
    <Wrapper className="full-page">
      <form onSubmit={handleSubmit} className="form">
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button className="btn btn-block" type="submit" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>

        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: "testUser@test.com", password: "secret" })
            );
          }}
        >
          {isLoading ? "loading..." : "demo"}
        </button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
