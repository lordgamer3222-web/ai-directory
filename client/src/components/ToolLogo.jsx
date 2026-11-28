import { useEffect, useMemo, useState } from "react";

const simpleIconBrands = {
  "adobe-firefly": "adobefirefly",
  "amazon-q-developer": "amazonaws",
  "canva-magic-studio": "canva",
  chatgpt: "openai",
  claude: "anthropic",
  cursor: "cursor",
  deepseek: "deepseek",
  elevenlabs: "elevenlabs",
  gemini: "googlegemini",
  "github-copilot": "githubcopilot",
  grammarly: "grammarly",
  lovable: "lovable",
  midjourney: "midjourney",
  "microsoft-copilot": "microsoftcopilot",
  "mistral-vibe-chat": "mistralai",
  "notion-ai": "notion",
  "openai-codex": "openai",
  perplexity: "perplexity",
  replit: "replit",
  runway: "runway",
  suno: "suno",
};

function isCustomIcon(value) {
  return typeof value === "string" &&
    /^\/uploads\/tool-icons\/[0-9a-f-]{36}\.(?:png|jpg|webp)$/i.test(value);
}

function getSimpleIconUrl(tool) {
  const identifiers = [
    tool?.icon,
    tool?.id,
    tool?.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  ];
  const slug = identifiers.map((identifier) => simpleIconBrands[identifier]).find(Boolean);
  return slug ? `https://cdn.simpleicons.org/${slug}` : "";
}

function getFaviconUrls(officialUrl) {
  try {
    const parsed = new URL(officialUrl);
    if (!["http:", "https:"].includes(parsed.protocol) || !parsed.hostname) return [];
    return [
      `${parsed.origin}/favicon.ico`,
      `${parsed.origin}/favicon.png`,
    ];
  } catch {
    return [];
  }
}

export default function ToolLogo({ tool, size = 44 }) {
  const sources = useMemo(() => {
    const customIcon = isCustomIcon(tool?.icon) ? tool.icon : "";
    return [customIcon, getSimpleIconUrl(tool), ...getFaviconUrls(tool?.url)].filter(Boolean);
  }, [tool?.icon, tool?.id, tool?.name, tool?.url]);
  const sourceKey = sources.join("|");
  const [sourceIndex, setSourceIndex] = useState(0);
  const imageSource = sources[sourceIndex] || "";
  const fallbackLetter = (tool?.name || "AI").trim().charAt(0).toUpperCase() || "A";

  useEffect(() => {
    setSourceIndex(0);
  }, [sourceKey]);

  return (
    <span
      className={imageSource ? "tool-logo has-logo" : "tool-logo"}
      style={{ width: size, height: size }}
      aria-label={`${tool?.name || "AI tool"} icon`}
    >
      {imageSource ? (
        <img
          src={imageSource}
          alt={`${tool?.name || "AI tool"} logo`}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setSourceIndex((current) => Math.min(current + 1, sources.length))}
        />
      ) : (
        <span aria-hidden="true">{fallbackLetter}</span>
      )}
    </span>
  );
}
