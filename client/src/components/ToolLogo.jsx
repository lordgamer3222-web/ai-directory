import { useEffect, useState } from "react";

function getFaviconUrl(officialUrl) {
  try {
    const parsed = new URL(officialUrl);
    if (!["http:", "https:"].includes(parsed.protocol) || !parsed.hostname) return "";
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(parsed.hostname)}&sz=128`;
  } catch {
    return "";
  }
}

export default function ToolLogo({ tool, size = 44 }) {
  const [failedCustom, setFailedCustom] = useState(false);
  const [failedFavicon, setFailedFavicon] = useState(false);
  const customIcon =
    typeof tool?.icon === "string" &&
    /^\/uploads\/tool-icons\/[0-9a-f-]{36}\.(?:png|jpg|webp)$/i.test(tool.icon)
      ? tool.icon
      : "";
  const favicon = getFaviconUrl(tool?.url);
  const fallbackLetter = (tool?.name || "AI").trim().charAt(0).toUpperCase() || "A";

  useEffect(() => {
    setFailedCustom(false);
    setFailedFavicon(false);
  }, [customIcon, favicon]);

  const imageSource = customIcon && !failedCustom ? customIcon : !failedFavicon ? favicon : "";

  return (
    <span
      className="tool-logo"
      style={{ width: size, height: size }}
      aria-label={`${tool?.name || "AI tool"} icon`}
    >
      {imageSource ? (
        <img
          src={imageSource}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          onError={() => {
            if (customIcon && !failedCustom) setFailedCustom(true);
            else setFailedFavicon(true);
          }}
        />
      ) : (
        <span aria-hidden="true">{fallbackLetter}</span>
      )}
    </span>
  );
}
