import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ handleLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = () => {
    const success = handleLogin(email, password);

    if (success) {
      setError("");
      navigate("/products"); 
    } else {
      setError("Please enter valid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error-text">{error}</p>}

        <button onClick={onSubmit}>Login</button>

        <p className="login-note">
          Admin: <b>admin@gmail.com</b>
          <br />
          User: <b>user@gmail.com</b>
        </p>
      </div>
    </div>
  );
}

export default Login;
