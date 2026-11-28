import React from "react";
import { translations } from "./i18n";

const Footer = ({ language = "en" }) => {
  const copy = translations[language] || translations.en;
  return (
    <footer className="site-footer">
      <p>{copy.footerRights}</p>
      <p>{copy.createdBy}</p>
      <p>
        {copy.contact}:{" "}
        <a href="mailto:ravitripathi3222@gmail.com">ravitripathi3222@gmail.com</a>
      </p>
      <nav className="footer-links" aria-label="Site information">
        <a href="/ai-search">{copy.talkToAiNav || "Talk to AI"}</a>
        <a href="/about">{copy.aboutUs}</a>
        <a href="/contact">{copy.contactUs}</a>
        <a href="/privacy-policy">{copy.privacyPolicy}</a>
        <a href="/terms-and-conditions">{copy.termsAndConditions}</a>
      </nav>
    </footer>
  );
};

export default Footer;
