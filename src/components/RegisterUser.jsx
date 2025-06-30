import React from "react";
import { useInput } from "../hooks/hooks";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles/register.css";

export default function RegisterUser({ register }) {
  const [name, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  function onSubmitHandler(event) {
    event.preventDefault();
    register(name, email, password);
  }
  return (
    <form onSubmit={onSubmitHandler} className="form-register">
      <h2>Daftar</h2>
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={handleNameChange}
      />
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
      <button>Register</button>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>Sudah punya akun?</p> <Link to={"/login"}>Login</Link>
      </div>
    </form>
  );
}

RegisterUser.propTypes = {
  register: PropTypes.func.isRequired,
};
