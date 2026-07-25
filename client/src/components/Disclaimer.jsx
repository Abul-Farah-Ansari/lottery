import "../styles/disclaimer.css";
import {
  FaTicketAlt,
  FaGift,
  FaRandom,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

function Disclaimer() {
  return (
    <section className="disclaimer-section" id="rules">
      <div className="container">

        <span className="section-badge">
          Game Rules & Disclaimer
        </span>

        <h2>
          Play Fair. Win Big.
        </h2>

        <p className="section-description">
          Please read the following rules carefully before participating
          in the Bombay Jackpot Lucky Draw.
        </p>

        <div className="rules-grid">

          <div className="rule-card">
            <FaTicketAlt className="rule-icon" />
            <h3>Unlimited Participation</h3>
            <p>
              Every lucky draw is open to all eligible participants. 
              Each valid ticket entered into the draw has an equal opportunity 
              to be selected as the winning ticket through a fair and transparent 
              random selection process.
            </p>
          </div>

          <div className="rule-card">
            <FaGift className="rule-icon" />
            <h3>Exciting Prizes</h3>
            <p>
              Attractive prizes are announced for every draw and awarded
              after successful ticket verification.
            </p>
          </div>

          <div className="rule-card">
            <FaRandom className="rule-icon" />
            <h3>Random Winner Selection</h3>
            <p>
              Winning ticket numbers are selected through a fair and
              transparent random process after the countdown ends.
            </p>
          </div>

          <div className="rule-card">
            <FaCheckCircle className="rule-icon" />
            <h3>Verified Winners</h3>
            <p>
              Prizes are distributed only after verifying the winning
              ticket and participant details.
            </p>
          </div>

        </div>

        <div className="rules-content">

          <p>
            Bombay Jackpot is a participation-based lucky draw game created
            for entertainment purposes. Each draw consists of a maximum of
            <strong> 10 participants</strong>, ensuring every participant
            has an equal chance of winning.
          </p>

          <p>
            After the countdown ends, one valid ticket number is randomly
            selected as the winner. Participants are advised to keep their
            ticket safe until the draw is completed.
          </p>

          <p>
            Only valid tickets purchased for the respective draw are
            eligible to win. Duplicate, altered, invalid or unauthorized
            tickets will not be accepted.
          </p>

          <p>
            Prize distribution will begin only after successful verification
            of the winning ticket and participant information. The
            organizer reserves the right to verify all winning entries
            before awarding prizes.
          </p>

        </div>

        <div className="disclaimer-box">

          <FaExclamationTriangle className="warning-icon" />

          <div>

            <h3>Important Disclaimer</h3>

            <p>
              Participation in Bombay Jackpot is completely voluntary.
              By participating, you agree to all applicable game rules,
              terms and conditions. The organizer reserves the right to
              modify, postpone or cancel any draw under exceptional
              circumstances. The organizer's decision regarding winner
              selection and prize distribution shall be final.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Disclaimer;