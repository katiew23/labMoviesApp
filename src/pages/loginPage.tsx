import React, { useContext, useState } from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform login logic here (e.g., API call)
    // For demonstration purposes, we'll just log in if both fields are filled
    login();
    navigate("/home"); // Redirect to home page after login
  };

  return (
    <>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default LoginPage;