import React from "react";
import RegisterUser from "../components/RegisterUser";
import { register } from "../utils/network-data";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const navigate = useNavigate();
  async function onRegisterHandler(name, email, password) {
    const { error } = await register({ name, email, password });
    if (!error) {
      navigate("/");
    }
  }
  return (
    <div className="register-page">
      <RegisterUser register={onRegisterHandler} />
    </div>
  );
}
