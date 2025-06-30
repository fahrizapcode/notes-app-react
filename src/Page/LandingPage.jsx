import React from "react";
import "../styles/landing-page.css";
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <p>Selamat Datang di aplikasi Catatan</p>
      <div className="action-button">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Daftar</button>
      </div>
    </div>
  );
}
