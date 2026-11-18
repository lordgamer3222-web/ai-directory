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
        <a href="mailto:ravitripathi@gmail.com">ravitripathi@gmail.com</a>
      </p>
    </footer>
  );
};

export default Footer;
