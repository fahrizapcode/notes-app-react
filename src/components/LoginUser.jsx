import React from "react";
import { useInput } from "../hooks/hooks";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function LoginUser({ login }) {
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const navigate = useNavigate();

  function onSubmitHandler(event) {
    event.preventDefault();
    const { error } = login(email, password);
    if (!error) {
      navigate("/");
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className="form-login">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button>Login</button>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>Belum punya akun?</p> <Link to={"/register"}>Daftar</Link>
      </div>
    </form>
  );
}

LoginUser.propTypes = {
  login: PropTypes.func.isRequired,
};
