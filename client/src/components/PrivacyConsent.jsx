import { useEffect, useState } from "react";
import { ShieldCheck, SlidersHorizontal } from "lucide-react";
import { translations } from "../i18n";

const CONSENT_KEY = "ai-directory-privacy-consent";
const CONSENT_VERSION = 1;
const ADSENSE_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID || "";
const ADSENSE_CONFIGURED = /^ca-pub-[0-9]+$/.test(ADSENSE_CLIENT_ID);

export function readPrivacyConsent() {
  try {
    const choice = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
    if (
      choice?.version === CONSENT_VERSION &&
      typeof choice.adsAllowed === "boolean" &&
      typeof choice.updatedAt === "string"
    ) {
      return choice;
    }
  } catch {}
  return null;
}

export function useAdsConsent() {
  const [adsAllowed, setAdsAllowed] = useState(
    () => readPrivacyConsent()?.adsAllowed === true,
  );

  useEffect(() => {
    const refreshChoice = () =>
      setAdsAllowed(readPrivacyConsent()?.adsAllowed === true);
    window.addEventListener("ai-directory:privacy-choice", refreshChoice);
    window.addEventListener("storage", refreshChoice);
    return () => {
      window.removeEventListener("ai-directory:privacy-choice", refreshChoice);
      window.removeEventListener("storage", refreshChoice);
    };
  }, []);

  return adsAllowed;
}

export default function PrivacyConsent({ language = "en" }) {
  const copy = translations[language] || translations.en;
  const [open, setOpen] = useState(() => readPrivacyConsent() === null);

  useEffect(() => {
    const refreshChoice = () => {
      const nextChoice = readPrivacyConsent();
      setOpen(nextChoice === null);
    };
    window.addEventListener("storage", refreshChoice);
    return () => window.removeEventListener("storage", refreshChoice);
  }, []);

  if (!ADSENSE_CONFIGURED) return null;

  function saveChoice(adsAllowed) {
    const nextChoice = {
      version: CONSENT_VERSION,
      adsAllowed,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(nextChoice));
    } catch {}
    setOpen(false);
    window.dispatchEvent(new CustomEvent("ai-directory:privacy-choice"));
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          className="privacy-choice-trigger"
          onClick={() => setOpen(true)}
          aria-label={copy.privacyChoices}
          title={copy.privacyChoices}
        >
          <SlidersHorizontal size={16} aria-hidden="true" />
          <span>{copy.privacyChoices}</span>
        </button>
      )}
      {open && (
        <section
          className="privacy-consent-panel"
          role="region"
          aria-labelledby="privacy-consent-title"
          aria-live="polite"
        >
          <div className="privacy-consent-copy">
            <span className="privacy-consent-icon" aria-hidden="true">
              <ShieldCheck size={19} />
            </span>
            <div>
              <h2 id="privacy-consent-title">{copy.privacyChoicesTitle}</h2>
              <p>{copy.privacyChoicesText}</p>
              <a href="/privacy-policy">{copy.privacyPolicy}</a>
            </div>
          </div>
          <div className="privacy-consent-actions">
            <button
              type="button"
              className="privacy-consent-decline"
              onClick={() => saveChoice(false)}
            >
              {copy.declineOptionalAds}
            </button>
            <button
              type="button"
              className="privacy-consent-allow"
              onClick={() => saveChoice(true)}
            >
              {copy.allowOptionalAds}
            </button>
          </div>
        </section>
      )}
    </>
  );
}
