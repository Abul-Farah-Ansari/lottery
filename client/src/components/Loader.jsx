import "../styles/loader.css";

function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="loader-content">

        <div className="loader-circle">
          <div className="loader-inner"></div>
        </div>

        <h2>Bombay Jackpot</h2>

        <p>Loading...</p>

      </div>
    </div>
  );
}

export default Loader;