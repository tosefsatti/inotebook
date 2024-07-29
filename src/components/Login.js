import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const host = "http://localhost:5000";
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      // redirect
      localStorage.setItem("token", json.authtoken);
      // console.log(json.authtoken);
      props.showAlert("Successfully Login", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-3">
      <h2 className="mt-3">Login to continue iNotebook</h2>
      <form onSubmit={handleSubmit} id="loginform" className="mt-3">
        <div className="mb-3 sections">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3 sections">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={onChange}
            name="password"
            value={credentials.password}
            className="form-control"
            id="password"
            required
          />
        </div>
        <button type="submit" className=" loginbtn btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
