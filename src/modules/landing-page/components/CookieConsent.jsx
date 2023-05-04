import React, { useState, useEffect } from 'react';
// import data
import { cookieConsent } from '../../../assets/data/landing-page/data';

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  return (
    show && (
      <div className="cookie-consent">
        <div className="cookie-consent-content">
          <p>
          This website uses cookies to ensure you get the best experience on our website. Please review our cookie policy for more information.
          </p>
          <button className="cookie-consent-button" onClick={acceptCookies}>
            Acept cookies
          </button>
        </div>
      </div>
    )
  );
};

export default CookieConsent;
