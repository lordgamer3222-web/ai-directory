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
    </footer>
  );
};

export default Footer;
