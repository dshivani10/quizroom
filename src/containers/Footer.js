import React from 'react';
import '../css/Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="copyright">
        <p>Copyright ©2022 Nisum Technologies, Inc.</p>
      </div>
      <div className="social-media-icons">
        <a href="https://www.facebook.com/NisumTech/">
          <img alt="facebook" className="social-icon" src="../../facebook.png" />
        </a>
        <a href="https://twitter.com/nisumtech/">
          <img alt="twitter" className="social-icon" src="../../twitter.png" />
        </a>
        <a href="https://www.linkedin.com/company/nisum-technologies/">
          <img alt="linkedin" className="social-icon" src="../../linkedin.png" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
