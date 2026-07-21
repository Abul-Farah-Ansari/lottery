import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/authApi";
import "../styles/VerifyOtp.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const email = sessionStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await verifyOtp({
        email,
        otp,
      });

      alert(data.message);

      sessionStorage.setItem("resetOtp", otp);
navigate("/reset-password");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-red-600">
          Invalid Request. Please start from Forgot Password.
        </h2>
      </div>
    );
  }

  return (
   <div className="verify-container">
  <div className="verify-card">

    <h2>Verify OTP</h2>

    <p>
      Enter the OTP sent to
      <br />
      <strong>{email}</strong>
    </p>

    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="000000"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        className="verify-btn"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

    </form>

  </div>
</div>
  );
};

export default VerifyOtp;