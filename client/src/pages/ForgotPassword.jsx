import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authApi";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await forgotPassword({ email });

      alert(data.message);

      sessionStorage.setItem("resetEmail", email);

      navigate("/verify-otp");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">

        <h1 className="forgot-title">Forgot Password</h1>

        <p className="forgot-subtitle">
          Enter your registered email address.
          <br />
          We'll send you a verification code.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            className="send-btn"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

        </form>

        <div className="back-login">
          <Link to="/login">
            ← Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;