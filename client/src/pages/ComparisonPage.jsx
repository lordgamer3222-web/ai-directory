import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Footer from "../footer";
import ToolLogo from "../components/ToolLogo";
import toolsData from "../data/tools";
import { translations } from "../i18n";
import { Sparkles } from "lucide-react";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "" : "https://ai-directory-mhje.onrender.com")
).replace(/\/+$/, "");

function getToolKey(tool) {
  return tool?.id || tool?._id || tool?.name || "";
}

function getOfficialUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password
      ? url.href
      : "";
  } catch {
    return "";
  }
}

function readPreference(key, allowedValues, fallback) {
  try {
    const value = localStorage.getItem(key);
    return allowedValues.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export default function ComparisonPage() {
  const [tools, setTools] = useState(Array.isArray(toolsData) ? toolsData : []);
  const [firstId, setFirstId] = useState("chatgpt");
  const [secondId, setSecondId] = useState("claude");
  const [loading, setLoading] = useState(true);
  const [catalogFallback, setCatalogFallback] = useState(false);
  const [language] = useState(() =>
    readPreference("ai-library-language", Object.keys(translations), "en"),
  );
  const [theme] = useState(() =>
    readPreference("ai-library-theme", ["system", "light", "dark"], "system"),
  );

  const copy = translations[language] || translations.en;
  const sortedTools = useMemo(
    () => [...tools].sort((a, b) => a.name.localeCompare(b.name)),
    [tools],
  );
  const firstTool =
    sortedTools.find((tool) => getToolKey(tool) === firstId) || sortedTools[0];
  const secondTool =
    sortedTools.find(
      (tool) => getToolKey(tool) === secondId && getToolKey(tool) !== getToolKey(firstTool),
    ) || sortedTools.find((tool) => getToolKey(tool) !== getToolKey(firstTool));

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE_URL}/api/tools`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (active && Array.isArray(data) && data.length) setTools(data);
      })
      .catch(() => {
        if (active) setCatalogFallback(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const activeTheme = theme === "system" ? (media.matches ? "dark" : "light") : theme;
      root.dataset.theme = activeTheme;
      root.style.colorScheme = activeTheme;
    };
    applyTheme();
    if (theme === "system") {
      media.addEventListener?.("change", applyTheme);
      return () => media.removeEventListener?.("change", applyTheme);
    }
    return undefined;
  }, [theme]);

  useEffect(() => {
    const title = "Compare AI Tools | AI Directory";
    const description =
      "Compare AI tools by their directory category, listed pricing type, description, tags, and official website. Verify current details with each provider.";
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('link[rel="canonical"]')?.setAttribute(
      "href",
      "https://aidirectory.co.in/compare",
    );
  }, []);

  const firstUrl = getOfficialUrl(firstTool?.url);
  const secondUrl = getOfficialUrl(secondTool?.url);

  const comparisonRows = [
    { label: "Category", value: (tool) => tool?.category },
    { label: "Listed pricing type", value: (tool) => tool?.pricing },
    { label: "Directory description", value: (tool) => tool?.description },
    {
      label: "Tags",
      value: (tool) => Array.isArray(tool?.tags) && tool.tags.length ? tool.tags.join(", ") : "Not listed",
    },
  ];

  return (
    <>
      <div className="app-shell legal-shell comparison-shell">
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <header className="topbar legal-topbar">
          <a className="brand" href="/" aria-label="AI Directory home">
            <span className="brand-mark"><Sparkles size={25} aria-hidden="true" /></span>
            <span>AI <b>Directory</b></span>
          </a>
          <a className="legal-back-link" href="/">
            {copy.backToDirectory || translations.en.backToDirectory}
          </a>
        </header>

        <main className="legal-main comparison-main">
          <section className="legal-hero comparison-hero" aria-labelledby="comparison-title">
            <p className="legal-eyebrow">AI DIRECTORY</p>
            <h1 id="comparison-title">Compare AI tools</h1>
            <p className="legal-summary">
              Compare two listings by category, the directory’s pricing label, description, and tags.
              Use the official links to confirm current plans and features.
            </p>
          </section>

          <section className="legal-card comparison-card" aria-label="Tool comparison">
            <div className="comparison-selectors">
              <label>
                <span>First tool</span>
                <select
                  value={getToolKey(firstTool)}
                  onChange={(event) => setFirstId(event.target.value)}
                  aria-label="Choose the first AI tool"
                >
                  {sortedTools.map((tool) => (
                    <option key={getToolKey(tool)} value={getToolKey(tool)} disabled={getToolKey(tool) === getToolKey(secondTool)}>
                      {tool.name}
                    </option>
                  ))}
                </select>
              </label>
              <span className="comparison-vs" aria-hidden="true">VS</span>
              <label>
                <span>Second tool</span>
                <select
                  value={getToolKey(secondTool)}
                  onChange={(event) => setSecondId(event.target.value)}
                  aria-label="Choose the second AI tool"
                >
                  {sortedTools.map((tool) => (
                    <option key={getToolKey(tool)} value={getToolKey(tool)} disabled={getToolKey(tool) === getToolKey(firstTool)}>
                      {tool.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {loading && <p className="comparison-status" role="status">Loading the current directory catalog…</p>}
            {catalogFallback && (
              <p className="comparison-status" role="status">
                The live catalog could not be reached, so the bundled catalog is shown.
              </p>
            )}

            {firstTool && secondTool ? (
              <div className="comparison-table-wrap">
                <table className="comparison-table">
                  <caption>Directory listing comparison</caption>
                  <thead>
                    <tr>
                      <th scope="col">Directory field</th>
                      <th scope="col">
                        <span className="comparison-tool-heading">
                          <ToolLogo tool={firstTool} size={38} />
                          {firstTool.name}
                        </span>
                      </th>
                      <th scope="col">
                        <span className="comparison-tool-heading">
                          <ToolLogo tool={secondTool} size={38} />
                          {secondTool.name}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.label}>
                        <th scope="row">{row.label}</th>
                        <td>{row.value(firstTool) || "Not listed"}</td>
                        <td>{row.value(secondTool) || "Not listed"}</td>
                      </tr>
                    ))}
                    <tr>
                      <th scope="row">Official website</th>
                      <td>
                        {firstUrl ? <a href={firstUrl} target="_blank" rel="noopener noreferrer">Visit {firstTool.name}</a> : "Not listed"}
                      </td>
                      <td>
                        {secondUrl ? <a href={secondUrl} target="_blank" rel="noopener noreferrer">Visit {secondTool.name}</a> : "Not listed"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="comparison-status" role="status">The catalog does not contain enough tools to compare yet.</p>
            )}

            <p className="comparison-note">
              This page compares information in the AI Directory catalog; it does not rank tools or independently test them. Pricing and features can change, so confirm details on each official website.
            </p>
            <p className="comparison-more">
              Need help finding a match? <a href="/ai-search">Describe your task in AI Search</a> or <a href="/">browse the directory</a>.
            </p>
          </section>
        </main>
      </div>
      <Footer language={language} />
    </>
  );
}
