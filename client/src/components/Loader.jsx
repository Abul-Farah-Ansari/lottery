import "../styles/loader.css";

function Loader() {
  return (
    <div className="loader-wrapper">

      {/* Background Glow */}
      <div className="loader-bg-glow loader-glow-red"></div>
      <div className="loader-bg-glow loader-glow-yellow"></div>

      {/* Decorative Particles */}
      <div className="loader-particles">
        <span>✦</span>
        <span>◆</span>
        <span>✦</span>
        <span>★</span>
        <span>◆</span>
        <span>✦</span>
      </div>

      {/* Main Content */}
      <div className="loader-content">

        {/* Live Badge */}
        <div className="loader-badge">
          <span className="loader-live-dot"></span>
          LIVE LOTTERY
        </div>

        {/* Logo / Brand */}
        <h1 className="loader-title">
          <span className="loader-red">Bombay</span>{" "}
          <span className="loader-yellow">Jackpot</span>
        </h1>

        {/* Decorative Divider */}
        <div className="loader-divider">
          <span></span>
          <b>◆</b>
          <span></span>
        </div>

        {/* Subtitle */}
        <p className="loader-subtitle">
          Loading your luck
          <span className="loader-dots">
            <i>.</i>
            <i>.</i>
            <i>.</i>
          </span>
        </p>

        {/* Spinner */}
        <div className="loader-spinner">
          <div className="loader-spinner-inner">
            ★
          </div>
        </div>

        {/* Loading Text */}
        <p className="loader-wait">
          Please wait...
        </p>

      </div>

    </div>
  );
}

export default Loader;