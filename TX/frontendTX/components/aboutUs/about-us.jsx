import "./about-us.css"

function AboutUs() {
    
    return (
        <div className="about-us-main-container">
            <div className="about-us-inner-container">
                <div className="about-us-title">
                    <span >About Us</span>
                </div>
                <div className="about-us-content">
                  <span>🚀 <strong>Unlocking the Secrets of Secure Communication</strong></span>
                  <span style={{fontSize: '22px', marginBottom: '10px'}}>🛡️ Mission: Protecting Military Systems</span>
                  <span style={{marginBottom: '10px'}}>
                    🌐 In the vast expanse of the Israeli Air Force and the IDF, there are a lot of connections between various entities.<br/> But amidst this complexity lie two main challenges: protecting the systems of the sender side and the need for fast data transmission.
                  </span>
                  <span style={{marginBottom: '10px'}}>
                    🔒 In a world where the slightest breach can jeopardize national security, safeguarding against infiltration is paramount. Our mission? To fortify military systems against unwelcome incursions, and ensuring the sender side systems still protected.
                  </span>
                  <span style={{marginBottom: '10px'}}>
                    🛠️ Enter into our system - an innovative software solution designed to facilitate one-way data traffic. By channeling the flow of information in one direction, we protect the transmitting party from the dangers of unauthorized access.
                  </span>
                  <span style={{marginBottom: '10px'}}>
                   ✨ Embark with us on this voyage of innovation and security. Together, we'll chart new horizons, safeguarding the integrity of military communications for generations to come.                  </span>
                </div>
                <div className="personal-info">
                    &#9989; To contact the software developer, please write us an email at: "IdanIzhaki346@gmail.com"
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
