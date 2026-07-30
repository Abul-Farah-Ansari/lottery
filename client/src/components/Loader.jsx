import "../styles/loader.css";
import loaderVideo from "../assets/images/loader.mp4";

function Loader() {
  return (
    <div className="loader-wrapper">

      <video
        className="loader-video"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
      >
        <source src={loaderVideo} type="video/mp4" />
      </video>

      <div className="loader-overlay"></div>

      <div className="loader-content">

        <h1 className="loader-title">
          Bombay Jackpot
        </h1>

        <p className="loader-subtitle">
          Loading your luck
          <span></span>
          <span></span>
          <span></span>
        </p>

      </div>

    </div>
  );
}

export default Loader;