import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader-ring"></div>

        <h2 className="loader-title">Bombay Jackpot</h2>

        <p className="loader-text">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;