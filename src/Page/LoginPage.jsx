import React from "react";
import LoginUser from "../components/LoginUser";
import { login } from "../utils/network-data";
import "../styles/login.css";
import PropTypes from "prop-types";
export default function LoginPage({ loginSuccess }) {
  async function onLoginHandler(email, password) {
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    }
  }
  return (
    <div className="login-page">
      <LoginUser login={onLoginHandler} />
    </div>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};
