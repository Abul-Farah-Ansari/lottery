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
    <section
      className="disclaimer-section"
      id="rules"
      aria-labelledby="rules-heading"
    >
      <div className="container">

        {/* ==========================
            Section Heading
        ========================== */}

        <span className="section-badge">
          Game Rules & Disclaimer
        </span>

        <h2 id="rules-heading">
          Game Rules & Responsible Play
        </h2>

        <p className="section-description">
          Please read the following information carefully before
          participating in the Bombay Jackpot lucky draw.
        </p>

        {/* ==========================
            Rule Cards
        ========================== */}

        <div className="rules-grid">

          <div className="rule-card">
            <FaTicketAlt
              className="rule-icon"
              aria-hidden="true"
            />

            <h3>Valid Tickets</h3>

            <p>
              Only valid tickets entered for the applicable draw are
              eligible to participate. Keep your original ticket safe
              for verification.
            </p>
          </div>

          <div className="rule-card">
            <FaGift
              className="rule-icon"
              aria-hidden="true"
            />

            <h3>Prize Verification</h3>

            <p>
              Winning tickets and participant details may be verified
              before any prize is awarded.
            </p>
          </div>

          <div className="rule-card">
            <FaRandom
              className="rule-icon"
              aria-hidden="true"
            />

            <h3>Winner Selection</h3>

            <p>
              Winning ticket numbers are selected according to the
              applicable draw process and schedule.
            </p>
          </div>

          <div className="rule-card">
            <FaCheckCircle
              className="rule-icon"
              aria-hidden="true"
            />

            <h3>Result Checking</h3>

            <p>
              Check the published result carefully and retain your
              ticket until the applicable verification process is
              complete.
            </p>
          </div>

        </div>

        {/* ==========================
            General Information
        ========================== */}

        <div className="rules-content">

          <p>
            Bombay Jackpot provides draw result information,
            winning ticket numbers and related game information.
            Participants should review the applicable rules before
            participating.
          </p>

          <p>
            Only tickets that meet the applicable eligibility and
            participation requirements for the relevant draw should
            be considered for a prize.
          </p>

          <p>
            Participants are responsible for keeping their ticket
            information safe and providing accurate information when
            required for verification.
          </p>

        </div>

        {/* ==========================
            Important Disclaimer
        ========================== */}

        <div className="disclaimer-box">

          <FaExclamationTriangle
            className="warning-icon"
            aria-hidden="true"
          />

          <div>

            <h3>Important Disclaimer</h3>

            <div className="disclaimer-content">

              <p>
                <strong style={{ color: "#d32f2f" }}>
                  Disclaimer
                </strong>
              </p>

              <p>
                <strong style={{ color: "#d32f2f" }}>
                  This game involves financial risk and may be
                  addictive. Please participate responsibly and
                  within your financial limits.
                </strong>
              </p>

              {/* ==========================
                  Terms & Conditions
              ========================== */}

              <h3
                id="terms"
                className="policy-heading"
              >
                Terms & Conditions
              </h3>

              <ul>
                <li>
                  Participation is voluntary and subject to the
                  applicable game rules.
                </li>

                <li>
                  Only valid tickets are eligible for applicable
                  prize claims.
                </li>

                <li>
                  Winning tickets may be required for verification
                  before a prize is awarded.
                </li>

                <li>
                  Invalid, altered, damaged or duplicate tickets
                  may be rejected according to the applicable rules.
                </li>

                <li>
                  Draws may be modified, postponed, suspended or
                  cancelled for technical, legal or operational
                  reasons where applicable.
                </li>

                <li>
                  Participants are responsible for complying with
                  applicable rules and requirements.
                </li>
              </ul>

              {/* ==========================
                  Responsible Gaming
              ========================== */}

              <h3
                id="responsible-gaming"
                className="policy-heading"
              >
                Responsible Gaming
              </h3>

              <p>
                Please participate responsibly and only within
                your financial limits. This activity should not be
                considered a guaranteed source of income or an
                investment.
              </p>

              <p>
                If participation is negatively affecting your
                personal, financial or social well-being, consider
                taking a break and seeking appropriate support.
              </p>

              {/* ==========================
                  Privacy
              ========================== */}

              <h3
                id="privacy-policy"
                className="policy-heading"
              >
                Privacy Policy
              </h3>

              <p>
                Personal information should only be collected and
                used for legitimate purposes such as ticket
                verification, prize processing, customer support
                and required operational activities, subject to
                applicable privacy requirements.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Disclaimer;