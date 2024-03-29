import React, { useState, useEffect } from "react";
import { allUsersError, allUsersLoading } from "../../store/usersSlice";
import "./login.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../home/logo-no-background.png";
const Login = () => {
  // const users = useSelector(allUsers)
  const { users } = useSelector((state) => state.users);
  const error = useSelector(allUsersError);
  const loading = useSelector(allUsersLoading);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  /* useEffect(()=>{

    //dispatch(fetchUsers())

  },[])*/

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && password) {
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        navigate("/admin");
      } else {
        alert("username or password are uncorrect !");
      }
    }
  };

  return (
    <div className="login-form-wrapper">
      <div className="logo-container">
        <img
          src={logo}
          alt="Logo"
          className="logo img-fluid"
          style={{
            width: "300px",
            height: "auto",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form-title">Login</h2>
        <div className="form-field">
          <label className="form-field-label" htmlFor="username">
            Username
          </label>
          <input
            className="form-field-input"
            type="text"
            id="username"
            placeholder="type user1"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-field">
          <label className="form-field-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-field-input"
            type="password"
            id="password"
            placeholder="type pass1"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="login-form-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
