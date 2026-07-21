import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authApi";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();

  const email = sessionStorage.getItem("resetEmail");
  const otp = sessionStorage.getItem("resetOtp");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      setLoading(true);

      const { data } = await resetPassword({
        email,
        otp,
        newPassword,
      });

      alert(data.message);

      sessionStorage.removeItem("resetEmail");
      sessionStorage.removeItem("resetOtp");

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">

        <h2>Reset Password</h2>

        <p>Create your new password.</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>New Password</label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
          </div>

          <button
            className="reset-btn"
            disabled={loading}
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default ResetPassword;