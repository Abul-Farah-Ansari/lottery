import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api"; // Change path if needed

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", formData);

      if (data.success) {
        localStorage.setItem("token", data.token);

        alert("Login Successful");

        navigate("/admin");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#000",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "350px",
          padding: "30px",
          borderRadius: "12px",
          background: "#111",
          color: "#fff",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#FFD700",
          }}
        >
          Admin Login
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#FFD700",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <Link
          to="/forgot-password"
          style={{
            color: "#0d6efd",
            textDecoration: "none",
          }}
        >
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}

export default Login;