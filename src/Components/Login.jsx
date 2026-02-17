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
      navigate("/products"); // ✅ Redirect after login
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
/*import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage({ isLogin, setLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const USERNAME = "admin";
  const PASSWORD = "admin123";

  const handleLogin = () => {
    if (username === USERNAME && password === PASSWORD) {
      setLogin(true);
      setError("");
      navigate("/products");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setLogin(false);
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {!isLogin ? (
          <>
            <h2>Login</h2>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            {error && <p className="error-text">{error}</p>}

            <button onClick={handleLogin}>Login</button>

            <p className="login-note">
              Username: <b>admin</b> <br />
              Password: <b>admin123</b>
            </p>
          </>
        ) : (
          <>
            <h2>Welcome, Admin 👋</h2>
            <p>You are logged in successfully</p>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
*/
