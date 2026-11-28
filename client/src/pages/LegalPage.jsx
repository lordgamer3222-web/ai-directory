import React, { useEffect, useLayoutEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, FileText, Mail, ShieldCheck, Sparkles } from "lucide-react";
import Footer from "../footer";
import PrivacyConsent from "../components/PrivacyConsent";
import { languageOptions, translations } from "../i18n";

const CONTACT_EMAIL = "ravitripathi3222@gmail.com";
const LAST_UPDATED = "November 26, 2026";

const pageDetails = {
  about: {
    title: "About AI Directory",
    eyebrow: "ABOUT THE PROJECT",
    summary:
      "A straightforward place to explore AI tools and find options that fit the work you need to do.",
    description:
      "Learn what AI Directory is, how its catalog works, and who created it.",
    Icon: Sparkles,
  },
  privacy: {
    title: "Privacy policy",
    eyebrow: "PRIVACY & DATA",
    summary:
      "What the site stores, what is sent to service providers, and how cookies and advertising work.",
    description:
      "Learn how AI Directory handles account details, browser storage, cookies, AI prompts, Google ads, and third-party services.",
    Icon: ShieldCheck,
  },
  contact: {
    title: "Contact us",
    eyebrow: "WE’RE HERE TO HELP",
    summary:
      "Reach the AI Directory team about the catalog, your account, privacy requests, or a site issue.",
    description:
      "Contact AI Directory by email for help, corrections, privacy requests, or partnership questions.",
    Icon: Mail,
  },
  terms: {
    title: "Terms and conditions",
    eyebrow: "USING THE DIRECTORY",
    summary:
      "A few clear ground rules for using the directory, its AI search, and links to other services.",
    description:
      "Read the terms for using AI Directory, its catalog, AI recommendations, and external links.",
    Icon: FileText,
  },
};

function readPreference(key, allowedValues, fallback) {
  try {
    const value = localStorage.getItem(key);
    return allowedValues.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function PageSection({ title, children }) {
  return (
    <section className="legal-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ResourceLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children} <ExternalLink size={13} aria-hidden="true" />
    </a>
  );
}

function AboutContent() {
  return (
    <>
      <PageSection title="Why AI Directory exists">
        <p>
          AI Directory helps people discover AI tools for writing, research,
          design, coding, and everyday work. Browse the catalog by category and
          pricing, or describe a task to Ask AI for relevant tools from the
          directory.
        </p>
      </PageSection>
      <PageSection title="How the directory works">
        <p>
          The catalog brings tool names, descriptions, categories, pricing, and
          official website links together in one place. Ask AI uses your request
          to select relevant entries from that catalog. Product features and
          prices can change, so check the provider’s official site before making
          a decision.
        </p>
      </PageSection>
      <PageSection title="Who created it">
        <p>
          AI Directory was created by <strong>Amar Kushwaha</strong>. It is an
          independent directory; a listing does not mean that a tool’s provider
          sponsors or endorses this site.
        </p>
      </PageSection>
      <PageSection title="Get in touch">
        <p>
          Have a correction or a tool to suggest? Visit the{" "}
          <a href="/contact">Contact us</a> page and send a note.
        </p>
      </PageSection>
    </>
  );
}

function PrivacyContent() {
  return (
    <>
      <PageSection title="Information we handle">
        <p>
          If you create an account, we store your email address and a salted
          password hash. We also store saved tools associated with your account.
          Passwords are not stored as readable text.
        </p>
        <p>
          If you submit a tool, send feedback, or email us, we receive the
          information you choose to provide, such as your name, email address,
          message, and details about a suggested tool. The site’s hosting and
          API providers may also process standard connection details, such as an
          IP address and browser information, to deliver the site and help
          protect it from abuse.
        </p>
      </PageSection>

      <PageSection title="Ask AI and AI providers">
        <p>
          When you use Ask AI, your current prompt and up to eight recent chat
          messages are sent to the site’s AI service along with selected public
          catalog entries. The service tries Groq first and may use Google
          Gemini if it needs to fall back. If you use description translation,
          selected tool names and descriptions are also sent for translation.
          Chat messages are held in the open page and are not saved to your AI
          Directory account database.
        </p>
        <p>
          The AI provider handling a request processes that content under its
          own terms and privacy practices. Please do not include passwords,
          payment details, or sensitive personal information in an AI prompt.
          See the providers’ notices for details: <ResourceLink href="https://groq.com/privacy-policy">Groq Privacy Policy</ResourceLink>{" "}
          and <ResourceLink href="https://ai.google.dev/gemini-api/terms">Google Gemini API terms</ResourceLink>.
        </p>
      </PageSection>

      <PageSection title="Cookies and browser storage">
        <p>
          When you sign in, the site uses an essential first-party session cookie
          named <code>ai_library_session</code>. It is HttpOnly, Secure in
          production, and set to expire after up to 30 days; signing out clears
          it. The cookie is used to keep your account session working.
        </p>
        <p>
          The site also uses browser storage for your theme, language, guest ID,
          signed-in saved-tools cache, Ask AI panel position and size, cached
          translated descriptions, and optional-ad choice. The current app only
          shows saved tools after sign-in; the browser cache mirrors that
          account’s saved IDs. The ad-choice record includes its version,
          decision, and time and stays in this browser. You can clear browser
          storage in your browser settings; this may reset preferences or sign
          you out.
        </p>
      </PageSection>

      <PageSection title="Age and parental consent">
        <p>
          Account registration currently does not collect or verify a date of
          birth, age, or parental consent, and the server does not enforce an
          age check. We do not have a verifiable parent or guardian identity
          provider configured, so we cannot confirm parental consent for a
          child’s account. The current registration flow does not reliably block
          under-18 users, and this notice is not an age check or parental
          consent process. Before intentionally offering accounts to children,
          a verifiable parent or guardian verification service and server-side
          checks must be selected and configured. If a child’s personal
          information was submitted, contact us to request its review or
          deletion. We will not treat a checkbox or self-entered date as
          verified parental consent.
        </p>
      </PageSection>

      <PageSection title="Google advertising and other Google services">
        <p>
          If AdSense is configured, its script remains off until you allow
          optional ads in the privacy choices panel. If you allow them, Google
          may use cookies and receive browser, device, network, and ad
          interaction information to deliver, personalize, and measure ads and
          help prevent fraud. Declining does not limit directory features. You
          can change your choice at any time using the privacy choices button.
          If you withdraw after the ad service has loaded, this site stops
          loading it again; cookies already set by Google may need to be managed
          through your browser or Google settings.
        </p>
        <p>
          You can manage Google ad personalization in{" "}
          <ResourceLink href="https://adssettings.google.com/">Google Ads Settings</ResourceLink>
          . You can also review how Google uses data on partner sites in its{" "}
          <ResourceLink href="https://policies.google.com/technologies/partner-sites?hl=en">partner-sites privacy notice</ResourceLink>
          , and use the industry opt-out page at{" "}
          <ResourceLink href="https://www.aboutads.info/choices/">aboutads.info</ResourceLink>
          . Tool cards may load logo images from the Simple Icons CDN or a tool’s
          official website. Your browser connects to that provider when an
          image loads. The site does not load Google Fonts or Google-hosted
          tool favicons.
        </p>
      </PageSection>

      <PageSection title="Voice input">
        <p>
          Voice input starts only when you press the microphone button. The
          browser’s speech-recognition feature processes the audio and may send
          it to a service operated by your browser provider. AI Directory does
          not record or store the audio; the recognized text is placed in the
          Ask AI prompt. It is sent to the AI providers only if you submit that
          prompt. Check your browser provider’s privacy information for how it
          handles speech requests.
        </p>
      </PageSection>

      <PageSection title="Other service providers and links">
        <p>
          The service uses MongoDB to store account, saved-tool, suggestion, and
          feedback records; Render hosts the API; and Resend sends transactional
          password-reset codes to the account email. There is no marketing email
          system. External AI tool links take you to services with their
          own privacy policies. These providers handle information under their
          own practices: <ResourceLink href="https://resend.com/legal/privacy-policy">Resend</ResourceLink>,{" "}
          <ResourceLink href="https://render.com/privacy">Render</ResourceLink>,{" "}
          <ResourceLink href="https://www.mongodb.com/legal/privacy-policy">MongoDB</ResourceLink>, and{" "}
          <ResourceLink href="https://policies.google.com/privacy">Google</ResourceLink>.
        </p>
        <p>
          No Google Analytics, advertising pixel, session-replay, mouse-tracking,
          or keystroke-recording integration is included in the current code.
          The browser uses locally installed system fonts and same-site custom
          icons or initials. Hosting providers still receive standard request
          information needed to deliver and secure the site.
        </p>
      </PageSection>

      <PageSection title="Retention and your choices">
        <p>
          Browser storage remains until you clear it. Account, saved-tool,
          feedback, and suggestion records remain in the service database until
          they are removed. Password-reset codes expire after 10 minutes. To
          request access, correction, or deletion of information associated
          with your account or a message, email us using the address on the{" "}
          <a href="/contact">Contact us</a> page.
        </p>
        <p>
          Your browser can block or clear cookies and local storage. Blocking
          the session cookie may prevent sign-in from working. Ad controls are
          managed through Google and your browser; disabling personalized ads
          may still leave contextual advertising.
        </p>
      </PageSection>
    </>
  );
}

function ContactContent() {
  return (
    <>
      <PageSection title="Email the team">
        <p>
          For account help, catalog corrections, privacy requests, or general
          questions, email us. Include the page or tool name if it helps explain
          your request, and never include your password or an API key.
        </p>
        <div className="legal-contact-card">
          <span className="legal-contact-icon">
            <Mail size={19} aria-hidden="true" />
          </span>
          <div>
            <span className="legal-contact-label">Email address</span>
            <a className="legal-contact-address" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </div>
          <a
            className="button button-primary legal-email-button"
            href={`mailto:${CONTACT_EMAIL}?subject=AI%20Directory%20support`}
          >
            Write to us <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </PageSection>
      <PageSection title="Tool suggestions">
        <p>
          Use the “Submit a tool” option on the directory to suggest a listing.
          Suggestions are reviewed before they appear in the catalog.
        </p>
      </PageSection>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <PageSection title="Using AI Directory">
        <p>
          AI Directory provides a searchable catalog of AI tools and an assistant
          that can suggest relevant entries. By using the site, you agree to
          these terms. If you do not agree, please stop using the site.
        </p>
      </PageSection>
      <PageSection title="Catalog information and external services">
        <p>
          Tool descriptions, availability, and pricing may change. Verify current
          details on the provider’s official website before relying on them. A
          listing is for discovery and does not by itself represent an
          endorsement, sponsorship, or partnership.
        </p>
        <p>
          Links to third-party websites are provided for convenience. Those
          websites have their own terms, privacy practices, and security. We do
          not control their content or availability.
        </p>
      </PageSection>
      <PageSection title="AI recommendations">
        <p>
          Ask AI generates suggestions from your request and the directory
          catalog. AI output can be incomplete, outdated, or incorrect. Treat it
          as general information, check important details independently, and do
          not rely on it as professional, legal, financial, medical, or other
          expert advice.
        </p>
      </PageSection>
      <PageSection title="Accounts and acceptable use">
        <p>
          Keep your sign-in details secure and use accurate information when you
          create an account. You are responsible for activity performed through
          your account. Do not misuse the site, interfere with its operation,
          attempt unauthorized access, or use it in violation of applicable law.
        </p>
      </PageSection>
      <PageSection title="Suggestions you submit">
        <p>
          Submit only information you have the right to share. We may review,
          edit for catalog consistency, decline, or remove a suggestion. Sending
          a suggestion does not guarantee that it will be published.
        </p>
      </PageSection>
      <PageSection title="Availability and liability">
        <p>
          We work to keep the site useful and available, but features may change
          or be unavailable. To the extent allowed by applicable law, the site
          and its catalog are provided as available without guarantees about
          accuracy, uptime, or suitability. Nothing in these terms limits a
          right that cannot legally be limited.
        </p>
      </PageSection>
      <PageSection title="Changes and contact">
        <p>
          We may update these terms as the site changes. The current version and
          its update date will appear on this page. Questions can be sent through
          the <a href="/contact">Contact us</a> page.
        </p>
      </PageSection>
    </>
  );
}

function PageContent({ page }) {
  if (page === "about") return <AboutContent />;
  if (page === "privacy") return <PrivacyContent />;
  if (page === "contact") return <ContactContent />;
  return <TermsContent />;
}

export default function LegalPage({ page }) {
  const details = pageDetails[page] || pageDetails.about;
  const Icon = details.Icon;
  const theme = useState(() =>
    readPreference("ai-library-theme", ["system", "light", "dark"], "system"),
  )[0];
  const language = useState(() =>
    readPreference(
      "ai-library-language",
      languageOptions.map((item) => item.value),
      "en",
    ),
  )[0];
  const copy = translations[language] || translations.en;

  useLayoutEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const activeTheme =
        theme === "system" ? (media.matches ? "dark" : "light") : theme;
      root.dataset.theme = activeTheme;
      root.style.colorScheme = activeTheme;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", activeTheme === "dark" ? "#141513" : "#f5f4ed");
    };

    applyTheme();
    if (theme === "system") {
      media.addEventListener?.("change", applyTheme);
      return () => media.removeEventListener?.("change", applyTheme);
    }
    return undefined;
  }, [theme]);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.content;
    const canonical = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.href;

    document.title = `${details.title} | AI Directory`;
    if (description) description.content = details.description;
    if (canonical) canonical.href = `${window.location.origin}${window.location.pathname}`;

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) {
        description.content = previousDescription;
      }
      if (canonical && previousCanonical) canonical.href = previousCanonical;
    };
  }, [details]);

  return (
    <>
      <div className="app-shell legal-shell">
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <header className="topbar legal-topbar">
          <a className="brand" href="/" aria-label="AI Directory home">
            <span className="brand-mark">
              <Sparkles size={25} aria-hidden="true" />
            </span>
            <span>
              AI <b>Directory</b>
            </span>
          </a>
          <a className="legal-back-link" href="/">
            <ArrowLeft size={15} aria-hidden="true" /> {copy.backToDirectory}
          </a>
        </header>

        <main className="legal-main">
          <section className="legal-hero" aria-labelledby="legal-title">
            <div className="legal-hero-icon">
              <Icon size={20} aria-hidden="true" />
            </div>
            <p className="legal-eyebrow">{details.eyebrow}</p>
            <h1 id="legal-title">{details.title}</h1>
            <p className="legal-summary">{details.summary}</p>
            <p className="legal-updated">Last updated {LAST_UPDATED}</p>
          </section>

          <article className="legal-card">
            <PageContent page={page} />
          </article>
        </main>
      </div>
      <Footer language={language} />
      <PrivacyConsent language={language} />
    </>
  );
}
