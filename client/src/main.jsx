import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import Footer from "./footer";
import { languageOptions, translations } from "./i18n";
import toolsData from "./data/tools";
import ToolLogo from "./components/ToolLogo";
import AdminApp from "./admin/AdminApp";
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  LayoutGrid,
  Menu,
  Maximize2,
  MessageCircle,
  Mic,
  MicOff,
  Minimize2,
  Search,
  Send,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import "./styles.css";
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "https://ai-directory-mhje.onrender.com"
).replace(/\/+$/, "");

function apiFetch(path, options = {}) {
  return fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    ...options,
  });
}
const fallbackTools = [
  {
    name: "ChatGPT",
    category: "Productivity",
    pricing: "Freemium",
    description:
      "Write, brainstorm, code, learn, and turn ideas into useful work.",
    url: "https://chatgpt.com",
    tags: ["Chat", "Write", "Code"],
    icon: "✧",
  },
  {
    name: "Midjourney",
    category: "Image Generation",
    pricing: "Paid",
    description: "Create expressive artwork and images from text prompts.",
    url: "https://www.midjourney.com",
    tags: ["Images", "Art", "Creative"],
    icon: "◈",
  },
  {
    name: "Notion AI",
    category: "Writing",
    pricing: "Freemium",
    description: "Draft, summarize, and organize your work in Notion.",
    url: "https://www.notion.so/product/ai",
    tags: ["Docs", "Summaries", "Planning"],
    icon: "▤",
  },
  {
    name: "Perplexity",
    category: "Research",
    pricing: "Freemium",
    description: "Explore questions and research topics with sourced answers.",
    url: "https://www.perplexity.ai",
    tags: ["Search", "Answers", "Research"],
    icon: "⌕",
  },
  {
    name: "Gemini",
    category: "Productivity",
    pricing: "Freemium",
    description:
      "Get help exploring ideas, learning, and creating with Google AI.",
    url: "https://gemini.google.com",
    tags: ["Assistant", "Learning", "Ideas"],
    icon: "✦",
  },
  {
    name: "GitHub Copilot",
    category: "Coding",
    pricing: "Freemium",
    description: "Get coding suggestions in your development workflow.",
    url: "https://github.com/features/copilot",
    tags: ["Code", "Developer", "IDE"],
    icon: "⌘",
  },
];
const initialTools =
  Array.isArray(toolsData) && toolsData.length ? toolsData : fallbackTools;
const pricingOptions = ["All", "Free", "Freemium", "Paid", "Open Source"];
const PAGE_SIZE = 12;
const POPULAR_TOOL_NAMES = new Set([
  "ChatGPT",
  "Claude",
  "Google Gemini",
  "Microsoft Copilot",
  "Perplexity",
  "DeepSeek",
  "Midjourney",
  "GitHub Copilot",
  "Canva Magic Studio",
  "Cursor",
  "ElevenLabs",
  "NotebookLM",
]);

function toolKey(tool) {
  return tool?._id || tool?.id || tool?.name || "";
}

function shuffleItems(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }
  return shuffled;
}

function shuffleCatalog(items) {
  const popular = [];
  const remaining = [];
  for (const tool of items) {
    (tool.featured || POPULAR_TOOL_NAMES.has(tool.name)
      ? popular
      : remaining
    ).push(tool);
  }
  return [...shuffleItems(popular), ...shuffleItems(remaining)].map(toolKey);
}

function readStoredValue(key, allowedValues, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return allowedValues.includes(stored) ? stored : fallback;
  } catch {
    return fallback;
  }
}

function clampPanelLayout(layout) {
  if (typeof window === "undefined") return layout;
  const margin = 8;
  const maxWidth = Math.max(160, window.innerWidth - margin * 2);
  const maxHeight = Math.max(180, window.innerHeight - margin * 2);
  const minWidth = Math.min(320, maxWidth);
  const minHeight = Math.min(360, maxHeight);
  const width = Math.min(Math.max(layout.width, minWidth), maxWidth);
  const height = Math.min(Math.max(layout.height, minHeight), maxHeight);
  return {
    left: Math.min(
      Math.max(layout.left, margin),
      Math.max(margin, window.innerWidth - width - margin),
    ),
    top: Math.min(
      Math.max(layout.top, margin),
      Math.max(margin, window.innerHeight - height - margin),
    ),
    width,
    height,
  };
}

function readAssistantPanelLayout() {
  try {
    const value = JSON.parse(localStorage.getItem("ai-library-ask-me-layout"));
    if (
      value &&
      [value.left, value.top, value.width, value.height].every(Number.isFinite)
    ) {
      return clampPanelLayout(value);
    }
  } catch {}
  return null;
}

function readDescriptionTranslationCache() {
  try {
    const parsed = JSON.parse(
      localStorage.getItem("ai-library-description-translations") || "{}",
    );
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function safeExternalUrl(value) {
  try {
    const parsed = new URL(value);
    return ["http:", "https:"].includes(parsed.protocol) &&
      parsed.hostname.includes(".") &&
      !parsed.username &&
      !parsed.password
      ? parsed.href
      : "";
  } catch {
    return "";
  }
}

function renderInlineFormatting(text) {
  return String(text)
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={index}>{part.slice(1, -1)}</code>;
      }
      return part;
    });
}

function FormattedAssistantText({ text }) {
  const blocks = [];
  let paragraph = [];
  let listItems = [];
  let listType = null;
  let blockIndex = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(
      <p key={`paragraph-${blockIndex++}`}>
        {renderInlineFormatting(paragraph.join(" "))}
      </p>,
    );
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    const List = listType === "ordered" ? "ol" : "ul";
    blocks.push(
      <List className="assistant-list" key={`list-${blockIndex++}`}>
        {listItems.map((item, index) => (
          <li key={index}>{renderInlineFormatting(item)}</li>
        ))}
      </List>,
    );
    listItems = [];
    listType = null;
  };

  for (const line of String(text || "").split(/\r?\n/)) {
    const trimmed = line.trim();
    const unordered = trimmed.match(/^(?:[-*•])\s+(.+)$/);
    const ordered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    const heading = trimmed.match(/^#{1,3}\s+(.+)$/);

    if (unordered || ordered) {
      flushParagraph();
      const nextType = ordered ? "ordered" : "unordered";
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      listItems.push((unordered || ordered)[1]);
      continue;
    }

    flushList();
    if (!trimmed) {
      flushParagraph();
      continue;
    }
    if (heading) {
      flushParagraph();
      blocks.push(
        <h3 key={`heading-${blockIndex++}`}>
          {renderInlineFormatting(heading[1])}
        </h3>,
      );
      continue;
    }
    paragraph.push(trimmed);
  }

  flushList();
  flushParagraph();
  return <div className="formatted-message">{blocks}</div>;
}

function App() {
  const [tools, setTools] = useState(() => initialTools);
  const [catalogOrder, setCatalogOrder] = useState(() =>
    shuffleCatalog(initialTools),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [saved, setSaved] = useState(() => {
    try {
      const parsed = JSON.parse(
        localStorage.getItem("ai-library-saved-tools") || "[]",
      );
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [language, setLanguage] = useState(() =>
    readStoredValue(
      "ai-library-language",
      languageOptions.map((item) => item.value),
      "en",
    ),
  );
  const copy = translations[language] || translations.en;
  const [localizedDescriptions, setLocalizedDescriptions] = useState(
    readDescriptionTranslationCache,
  );
  const [descriptionTranslationStatus, setDescriptionTranslationStatus] =
    useState("idle");
  const translationRequestsRef = useRef(new Map());
  const [theme, setTheme] = useState(() =>
    readStoredValue("ai-library-theme", ["system", "light", "dark"], "system"),
  );
  const [assistantLayout, setAssistantLayout] = useState(
    readAssistantPanelLayout,
  );
  const assistantPanelRef = useRef(null);
  const assistantInteractionRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authNotice, setAuthNotice] = useState("");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [visitorId] = useState(() => {
    try {
      let id = localStorage.getItem("ai-library-visitor-id");
      if (!id) {
        id =
          globalThis.crypto?.randomUUID?.() ||
          `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        localStorage.setItem("ai-library-visitor-id", id);
      }
      return id;
    } catch {
      return "guest-session";
    }
  });
  const [toolsLoading, setToolsLoading] = useState(true);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantFullPage, setAssistantFullPage] = useState(false);
  const [voiceListening, setVoiceListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const speechRecognitionRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: translations[language]?.welcome || translations.en.welcome,
    },
  ]);
  const [prompt, setPrompt] = useState("");
  const [thinking, setThinking] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyPreferences = () => {
      const activeTheme =
        theme === "system" ? (media.matches ? "dark" : "light") : theme;
      root.dataset.theme = activeTheme;
      root.lang = language;
      root.style.colorScheme = activeTheme;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute(
          "content",
          activeTheme === "dark" ? "#141513" : "#f5f4ed",
        );
    };
    applyPreferences();
    try {
      localStorage.setItem("ai-library-theme", theme);
      localStorage.setItem("ai-library-language", language);
    } catch {}
    if (theme === "system") {
      media.addEventListener?.("change", applyPreferences);
      return () => media.removeEventListener?.("change", applyPreferences);
    }
    return undefined;
  }, [theme, language]);

  useEffect(() => {
    setMessages((current) =>
      current.length === 1 && current[0].role === "assistant"
        ? [{ role: "assistant", text: copy.welcome }]
        : current,
    );
  }, [language]);

  useEffect(() => {
    if (!assistantOpen || !assistantFullPage) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [assistantOpen, assistantFullPage]);

  useEffect(
    () => () => {
      speechRecognitionRef.current?.abort?.();
    },
    [],
  );

  function descriptionForTool(tool) {
    const translated = localizedDescriptions[language]?.[tool.id];
    return translated?.source === tool.description
      ? translated.text
      : tool.description;
  }

  function openAssistant() {
    setAssistantFullPage(true);
    setAssistantOpen(true);
    setMobileMenu(false);
  }

  function closeAssistant() {
    speechRecognitionRef.current?.stop?.();
    speechRecognitionRef.current = null;
    setVoiceListening(false);
    setVoiceStatus("");
    setAssistantOpen(false);
    setAssistantFullPage(false);
  }

  function toggleVoiceInput() {
    if (voiceListening) {
      speechRecognitionRef.current?.stop?.();
      setVoiceStatus("");
      return;
    }

    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceStatus(copy.voiceUnavailable);
      return;
    }

    const recognition = new Recognition();
    recognition.lang =
      { en: "en-US", hi: "hi-IN", fr: "fr-FR" }[language] || "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      setVoiceListening(true);
      setVoiceStatus(copy.listening);
    };
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim();
      if (transcript) {
        setPrompt((current) =>
          [current.trim(), transcript].filter(Boolean).join(" "),
        );
      }
      setVoiceStatus("");
    };
    recognition.onerror = (event) => {
      setVoiceListening(false);
      setVoiceStatus(
        event.error === "not-allowed" || event.error === "service-not-allowed"
          ? copy.voicePermissionDenied
          : copy.voiceUnavailable,
      );
    };
    recognition.onend = () => {
      setVoiceListening(false);
      speechRecognitionRef.current = null;
    };
    speechRecognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      speechRecognitionRef.current = null;
      setVoiceListening(false);
      setVoiceStatus(copy.voiceUnavailable);
    }
  }

  function saveAssistantPanelLayout(layout) {
    const next = clampPanelLayout(layout);
    setAssistantLayout(next);
    try {
      localStorage.setItem("ai-library-ask-me-layout", JSON.stringify(next));
    } catch {}
  }

  function beginAssistantPanelInteraction(event, mode) {
    if (event.button !== 0) return;
    if (
      mode === "move" &&
      event.target.closest("button, input, select, a, textarea")
    ) {
      return;
    }
    const panel = assistantPanelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    const initial = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
    panel.style.left = `${initial.left}px`;
    panel.style.top = `${initial.top}px`;
    panel.style.right = "auto";
    panel.style.bottom = "auto";
    panel.style.width = `${initial.width}px`;
    panel.style.height = `${initial.height}px`;
    assistantInteractionRef.current = {
      mode,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      initial,
      next: initial,
    };
    panel.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  }

  function moveAssistantPanelInteraction(event) {
    const interaction = assistantInteractionRef.current;
    const panel = assistantPanelRef.current;
    if (!interaction || !panel || interaction.pointerId !== event.pointerId) {
      return;
    }
    const { initial, mode } = interaction;
    const dx = event.clientX - interaction.startX;
    const dy = event.clientY - interaction.startY;
    const margin = 8;
    let next;
    if (mode === "move") {
      next = clampPanelLayout({
        ...initial,
        left: initial.left + dx,
        top: initial.top + dy,
      });
    } else {
      const maxWidth = Math.max(160, window.innerWidth - initial.left - margin);
      const maxHeight = Math.max(
        180,
        window.innerHeight - initial.top - margin,
      );
      next = {
        ...initial,
        width: Math.min(
          Math.max(initial.width + dx, Math.min(320, maxWidth)),
          maxWidth,
        ),
        height: Math.min(
          Math.max(initial.height + dy, Math.min(360, maxHeight)),
          maxHeight,
        ),
      };
    }
    panel.style.left = `${next.left}px`;
    panel.style.top = `${next.top}px`;
    panel.style.right = "auto";
    panel.style.bottom = "auto";
    panel.style.width = `${next.width}px`;
    panel.style.height = `${next.height}px`;
    interaction.next = next;
  }

  function finishAssistantPanelInteraction(event) {
    const interaction = assistantInteractionRef.current;
    const panel = assistantPanelRef.current;
    if (!interaction || interaction.pointerId !== event.pointerId) return;
    assistantInteractionRef.current = null;
    saveAssistantPanelLayout(interaction.next);
    if (panel?.hasPointerCapture?.(event.pointerId))
      panel.releasePointerCapture(event.pointerId);
  }

  function resizeAssistantPanelWithKeyboard(event) {
    const panel = assistantPanelRef.current;
    if (
      !panel ||
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    )
      return;
    event.preventDefault();
    const rect = panel.getBoundingClientRect();
    const current = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
    if (event.key === "ArrowLeft") current.width -= 16;
    if (event.key === "ArrowRight") current.width += 16;
    if (event.key === "ArrowUp") current.height -= 16;
    if (event.key === "ArrowDown") current.height += 16;
    const next = clampPanelLayout(current);
    panel.style.left = `${next.left}px`;
    panel.style.top = `${next.top}px`;
    panel.style.right = "auto";
    panel.style.bottom = "auto";
    panel.style.width = `${next.width}px`;
    panel.style.height = `${next.height}px`;
    saveAssistantPanelLayout(next);
  }
  const categoryOptions = useMemo(
    () => [
      "All",
      ...new Set(
        tools
          .map((tool) => tool.category)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b)),
      ),
    ],
    [tools],
  );

  useEffect(() => {
    const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID || "";
    if (!/^ca-pub-[0-9]+$/.test(clientId)) return undefined;
    if (document.querySelector("script[data-ai-library-adsense='true']"))
      return undefined;
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.aiLibraryAdsense = "true";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  useEffect(() => {
    let active = true;
    apiFetch("/api/tools")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (active && Array.isArray(data)) {
          setTools(data);
          setCatalogOrder(shuffleCatalog(data));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setToolsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    apiFetch("/api/auth/session", { credentials: "include" })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then(async (session) => {
        if (!active || !session?.user) return;
        setCurrentUser(session.user);
        await apiFetch("/api/auth/merge-saved", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId, toolIds: saved }),
        });
        const response = await apiFetch("/api/saved-tools", {
          credentials: "include",
        });
        if (!response.ok) return;
        const data = await response.json();
        if (!active || !Array.isArray(data.saved)) return;
        const ids = data.saved.map((item) => item.toolId);
        setSaved(ids);
        try {
          localStorage.setItem("ai-library-saved-tools", JSON.stringify(ids));
        } catch {}
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [visitorId]);

  useEffect(() => {
    if (!assistantOpen) return undefined;
    const keepPanelVisible = () => {
      const panel = assistantPanelRef.current;
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      const next = clampPanelLayout({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
      panel.style.left = `${next.left}px`;
      panel.style.top = `${next.top}px`;
      panel.style.right = "auto";
      panel.style.bottom = "auto";
      panel.style.width = `${next.width}px`;
      panel.style.height = `${next.height}px`;
      saveAssistantPanelLayout(next);
    };
    window.addEventListener("resize", keepPanelVisible);
    return () => window.removeEventListener("resize", keepPanelVisible);
  }, [assistantOpen]);
  const filtered = useMemo(() => {
    let list = tools.filter(
      (t) =>
        `${t.name} ${t.description} ${descriptionForTool(t)} ${(t.tags || []).join(" ")} ${t.category}`
          .toLowerCase()
          .includes(query.toLowerCase()) &&
        (category === "All" || t.category === category) &&
        (price === "All" || t.pricing === price),
    );
    if (showSavedOnly)
      list = list.filter((t) => saved.includes(t._id || t.name));
    const orderIndex = new Map(catalogOrder.map((key, index) => [key, index]));
    list = [...list].sort(
      (a, b) =>
        (orderIndex.get(toolKey(a)) ?? Number.MAX_SAFE_INTEGER) -
        (orderIndex.get(toolKey(b)) ?? Number.MAX_SAFE_INTEGER),
    );
    if (sort === "A–Z")
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "Free first")
      list = [...list].sort(
        (a, b) =>
          (a.pricing === "Free" ? 0 : 1) - (b.pricing === "Free" ? 0 : 1),
      );
    return list;
  }, [
    tools,
    catalogOrder,
    localizedDescriptions,
    language,
    query,
    category,
    price,
    sort,
    showSavedOnly,
    saved,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, category, price, sort, showSavedOnly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const activePage = Math.min(currentPage, totalPages);
  const pageTools = useMemo(
    () => filtered.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE),
    [filtered, activePage],
  );

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  useEffect(() => {
    if (language === "en" || toolsLoading || tools.length === 0) {
      setDescriptionTranslationStatus("idle");
      return undefined;
    }

    let active = true;
    const cachedForLanguage = localizedDescriptions[language] || {};
    const missing = pageTools.filter(
      (tool) =>
        tool.id &&
        tool.description &&
        cachedForLanguage[tool.id]?.source !== tool.description,
    );

    if (!missing.length) {
      setDescriptionTranslationStatus("idle");
      return undefined;
    }

    setDescriptionTranslationStatus("loading");

    async function translateCatalogDescriptions() {
      let nextCache = localizedDescriptions;
      let failed = false;
      const batches = [];
      for (let index = 0; index < missing.length; index += 8) {
        batches.push(missing.slice(index, index + 8));
      }

      for (let index = 0; index < batches.length; index += 3) {
        const batchGroup = batches.slice(index, index + 3);
        const results = await Promise.allSettled(
          batchGroup.map((batch) => {
            const requestKey = JSON.stringify([
              language,
              batch.map(({ id, description }) => [id, description]),
            ]);
            let request = translationRequestsRef.current.get(requestKey);
            if (!request) {
              request = apiFetch("/api/tools/translate-descriptions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  language,
                  toolIds: batch.map((tool) => tool.id),
                }),
              }).then(async (response) => {
                const data = await response.json();
                if (!response.ok)
                  throw new Error(data.error || "Translation unavailable");
                return data.translations;
              });
              translationRequestsRef.current.set(requestKey, request);
              request.then(
                () => translationRequestsRef.current.delete(requestKey),
                () => translationRequestsRef.current.delete(requestKey),
              );
            }
            return request;
          }),
        );

        if (!active) return;
        const translated = results.flatMap((result) => {
          if (result.status === "rejected") {
            failed = true;
            return [];
          }
          return Array.isArray(result.value) ? result.value : [];
        });

        if (translated.length) {
          const updatedLanguageCache = {
            ...(nextCache[language] || {}),
          };
          for (const item of translated) {
            const sourceTool = tools.find((tool) => tool.id === item.id);
            if (
              sourceTool &&
              typeof item.description === "string" &&
              item.description.trim()
            ) {
              updatedLanguageCache[item.id] = {
                source: sourceTool.description,
                text: item.description.trim(),
              };
            }
          }
          nextCache = { ...nextCache, [language]: updatedLanguageCache };
          setLocalizedDescriptions(nextCache);
          try {
            localStorage.setItem(
              "ai-library-description-translations",
              JSON.stringify(nextCache),
            );
          } catch {}
        }

        if (failed) break;
      }

      if (active) setDescriptionTranslationStatus(failed ? "error" : "idle");
    }

    translateCatalogDescriptions().catch(() => {
      if (active) setDescriptionTranslationStatus("error");
    });

    return () => {
      active = false;
    };
  }, [language, pageTools, tools, toolsLoading]);

  async function toggleSaved(tool) {
    if (!currentUser) {
      setAuthMode("login");
      setAuthError("");
      setAuthNotice(copy.saveRequiresLogin);
      setAuthOpen(true);
      return;
    }
    const key = tool._id || tool.name;
    const wasSaved = saved.includes(key);
    const next = wasSaved ? saved.filter((x) => x !== key) : [...saved, key];
    setSaved(next);
    try {
      localStorage.setItem("ai-library-saved-tools", JSON.stringify(next));
    } catch {}
    if (!tool._id) return;
    try {
      const response = await apiFetch(
        `/api/saved-tools${wasSaved ? `/${encodeURIComponent(tool._id)}` : ""}`,
        {
          method: wasSaved ? "DELETE" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: wasSaved ? undefined : JSON.stringify({ toolId: tool._id }),
        },
      );
      if (!response.ok) throw new Error("Save sync unavailable");
    } catch {
      setSaved(saved);
      try {
        localStorage.setItem("ai-library-saved-tools", JSON.stringify(saved));
      } catch {}
    }
  }

  async function submitAuth(e) {
    e.preventDefault();
    setAuthError("");
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    if (authMode === "register" && password !== form.get("confirmPassword")) {
      setAuthError(copy.passwordMismatch);
      return;
    }
    setAuthBusy(true);
    try {
      const response = await apiFetch(
        `/api/auth/${authMode === "register" ? "register" : "login"}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          {
            401: copy.authInvalid,
            409: copy.emailInUse,
            429: copy.authRateLimit,
            503: copy.authDatabase,
          }[response.status] ||
            data.error ||
            copy.authGenericError,
        );
      setCurrentUser(data.user);
      await apiFetch("/api/auth/merge-saved", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, toolIds: saved }),
      });
      const savedResponse = await apiFetch("/api/saved-tools", {
        credentials: "include",
      });
      if (savedResponse.ok) {
        const savedData = await savedResponse.json();
        const ids = (savedData.saved || []).map((item) => item.toolId);
        setSaved(ids);
        try {
          localStorage.setItem("ai-library-saved-tools", JSON.stringify(ids));
        } catch {}
      }
      setAuthOpen(false);
      setAuthNotice("");
    } catch (error) {
      setAuthError(error.message || copy.authGenericError);
    } finally {
      setAuthBusy(false);
    }
  }

  async function signOut() {
    await apiFetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
    setCurrentUser(null);
    setSaved([]);
    setShowSavedOnly(false);
    try {
      localStorage.removeItem("ai-library-saved-tools");
    } catch {}
  }

  async function askAI(e) {
    e?.preventDefault();
    const text = prompt.trim();
    if (!text || thinking) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setPrompt("");
    setThinking(true);
    try {
      const response = await apiFetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          language,
          history: messages.slice(-8).map(({ role, text: messageText }) => ({
            role,
            text: messageText,
          })),
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Could not get a recommendation.");
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: data.answer || copy.fallbackAnswer,
          recommendations: Array.isArray(data.recommendations)
            ? data.recommendations
            : [],
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: copy.assistantError,
        },
      ]);
    } finally {
      setThinking(false);
    }
  }
  async function submitTool(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const r = await apiFetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setSubmitted(true);
    } catch (err) {
      alert(
        err.message || "Could not submit tool. Make sure MongoDB is connected.",
      );
    }
  }
  const scrollTools = () =>
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <div className="app-shell" id="home">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <header className="topbar">
          <a className="brand" href="#home" aria-label="AI Library home">
            <span className="brand-mark">
              <Sparkles size={27} />
            </span>
            <span>
              AI <b>Library</b>
            </span>
          </a>
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenu((v) => !v)}
            aria-label={copy.toggleNav}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
          <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
            <a href="#explore" onClick={() => setMobileMenu(false)}>
              {copy.toolsNav}
            </a>
            <a href="#about-contact" onClick={() => setMobileMenu(false)}>
              {copy.aboutNav}
            </a>
            <button
              className="nav-text-button"
              onClick={() => {
                setShowSavedOnly((v) => !v);
                setMobileMenu(false);
                document
                  .getElementById("explore")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {showSavedOnly ? copy.allTools : copy.savedTools} ({saved.length})
            </button>
            <button
              className="nav-text-button"
              onClick={() => {
                setSubmitOpen(true);
                setSubmitted(false);
                setMobileMenu(false);
              }}
            >
              {copy.submitTool}
            </button>
            <button
              className="nav-text-button account-action"
              title={currentUser?.email || undefined}
              onClick={() => {
                setMobileMenu(false);
                if (currentUser) signOut();
                else {
                  setAuthMode("login");
                  setAuthError("");
                  setAuthNotice("");
                  setAuthOpen(true);
                }
              }}
            >
              {currentUser ? copy.signOut : copy.signIn}
            </button>
            <label className="preference-control">
              <span>{copy.language}</span>
              <select
                aria-label={copy.language}
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="preference-control">
              <span>{copy.theme}</span>
              <select
                aria-label={copy.theme}
                value={theme}
                onChange={(event) => setTheme(event.target.value)}
              >
                <option value="system">{copy.system}</option>
                <option value="light">{copy.light}</option>
                <option value="dark">{copy.dark}</option>
              </select>
            </label>
          </nav>
          <div className="nav-actions">
            <button
              className="button button-primary button-small"
              onClick={openAssistant}
            >
              <Sparkles size={15} /> {copy.talkToAiNav}
            </button>
          </div>
        </header>

        <main>
          <section className="hero">
            <div className="hero-orb orb-left" />
            <div className="hero-orb orb-right" />
            <div className="hero-spark spark-a">✦</div>
            <div className="hero-spark spark-b">✧</div>
            <div className="eyebrow">
              <span className="pulse-dot" /> {copy.heroEyebrow}
            </div>
            <h1>
              {copy.heroLineOne}
              <br />
              <span>
                {copy.heroLineTwo} <em>{copy.heroEmphasis}</em>
              </span>
            </h1>
            <p className="hero-subtitle">{copy.heroSubtitle}</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={scrollTools}>
                <Search size={18} /> {copy.exploreTools}{" "}
                <ArrowRight size={16} />
              </button>
              <button className="button button-outline" onClick={openAssistant}>
                <Sparkles size={17} /> {copy.askAI}
              </button>
            </div>
          </section>

          <section className="explore-section" id="explore">
            <div className="search-wrap">
              <Search className="search-icon" size={21} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.searchPlaceholder}
                aria-label={copy.searchAria}
              />
              <button
                className="search-ai"
                onClick={() => {
                  setPrompt(query);
                  openAssistant();
                }}
                title={copy.askAiTitle}
              >
                <Sparkles size={19} />
              </button>
            </div>
            <div className="filters">
              <button
                className={
                  showSavedOnly ? "saved-filter active" : "saved-filter"
                }
                onClick={() => setShowSavedOnly((v) => !v)}
              >
                <Bookmark size={15} />{" "}
                {showSavedOnly ? copy.showingSaved : copy.savedTools} (
                {saved.length})
              </button>
              <label className="filter-select">
                <LayoutGrid size={17} />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label={copy.filterCategory}
                >
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>
                      {c === "All" ? copy.category : c}
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} />
              </label>
              <label className="filter-select">
                <Zap size={16} />
                <select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  aria-label={copy.filterPrice}
                >
                  {pricingOptions.map((p) => (
                    <option key={p} value={p}>
                      {p === "All"
                        ? copy.price
                        : p === "Free"
                          ? copy.free
                          : p === "Freemium"
                            ? copy.freemium
                            : p === "Paid"
                              ? copy.paid
                              : copy.openSource}
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} />
              </label>
              <label className="filter-select">
                <span className="sort-icon">↕</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label={copy.sortTools}
                >
                  <option value="Featured">{copy.featured}</option>
                  <option value="A–Z">{copy.aToZ}</option>
                  <option value="Free first">{copy.freeFirst}</option>
                </select>
                <ChevronDown size={15} />
              </label>
              <span className="result-count">
                {copy.toolsFound.replace("{count}", String(filtered.length))}
              </span>
            </div>
            {descriptionTranslationStatus !== "idle" && (
              <div
                className={`description-translation-status ${descriptionTranslationStatus}`}
                role="status"
              >
                <Sparkles size={13} />
                {descriptionTranslationStatus === "loading"
                  ? copy.translatingDescriptions
                  : copy.translationUnavailable}
              </div>
            )}
            <div className="tool-grid">
              {pageTools.map((tool, i) => (
                <article
                  className="tool-card"
                  style={{ "--delay": `${i * 70}ms` }}
                  key={tool._id || tool.name}
                >
                  <div className={`tool-icon icon-${i % 4}`}>
                    <ToolLogo tool={tool} size={58} />
                  </div>
                  <div className="card-title-row">
                    <h2>{tool.name}</h2>
                    <button
                      className={
                        saved.includes(tool._id || tool.name)
                          ? "save-button saved"
                          : "save-button"
                      }
                      onClick={() => toggleSaved(tool)}
                      aria-label={
                        saved.includes(tool._id || tool.name)
                          ? copy.removeBookmark
                          : copy.bookmarkTool
                      }
                    >
                      {saved.includes(tool._id || tool.name) ? (
                        <Check size={17} />
                      ) : (
                        <Bookmark size={17} />
                      )}
                    </button>
                  </div>
                  <span className="category-pill">{tool.category}</span>
                  <p className="tool-description">{descriptionForTool(tool)}</p>
                  <span
                    className={`price-pill ${String(tool.pricing).toLowerCase()}`}
                  >
                    {tool.pricing === "Free"
                      ? copy.free
                      : tool.pricing === "Paid"
                        ? copy.paid
                        : tool.pricing === "Open Source"
                          ? copy.openSource
                          : copy.freemium}
                  </span>
                  <div className="tag-row">
                    {(tool.tags || []).slice(0, 4).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  {safeExternalUrl(tool.url) ? (
                    <a
                      className="view-tool"
                      href={safeExternalUrl(tool.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {copy.viewTool} <ArrowRight size={16} />
                    </a>
                  ) : (
                    <span className="view-tool disabled">
                      {copy.websiteUnavailable}
                    </span>
                  )}
                </article>
              ))}
            </div>
            {!toolsLoading && filtered.length > PAGE_SIZE && (
              <nav className="pagination" aria-label={copy.pagination}>
                <button
                  type="button"
                  className="pagination-step"
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={activePage === 1}
                >
                  <ChevronLeft size={16} />
                  {copy.previousPage}
                </button>
                <div className="pagination-pages">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        type="button"
                        key={page}
                        className={activePage === page ? "active" : ""}
                        aria-current={activePage === page ? "page" : undefined}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                <span className="pagination-count">
                  {copy.pageOf
                    .replace("{page}", String(activePage))
                    .replace("{pages}", String(totalPages))}
                </span>
                <button
                  type="button"
                  className="pagination-step"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  disabled={activePage === totalPages}
                >
                  {copy.nextPage}
                  <ChevronRight size={16} />
                </button>
              </nav>
            )}
            {toolsLoading && (
              <div className="loading-state" role="status">
                {copy.loadingTools}
              </div>
            )}
            {filtered.length === 0 && !toolsLoading && (
              <div className="empty-state">
                <Search size={30} />
                <h3>{copy.noTools}</h3>
                <p>{copy.tryAnother}</p>
                <button
                  className="button button-outline"
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                    setPrice("All");
                    setShowSavedOnly(false);
                  }}
                >
                  {copy.clearFilters}
                </button>
              </div>
            )}
          </section>
          <section className="about-section" id="about-contact">
            <div>
              <span className="about-kicker">AI LIBRARY</span>
              <h2>{copy.aboutTitle}</h2>
              <p>{copy.aboutCopy}</p>
            </div>
            <a
              className="about-contact-link"
              href="mailto:ravitripathi3222@gmail.com"
            >
              <span>{copy.contact}</span>
              <b>ravitripathi3222@gmail.com</b>
              <ArrowRight size={17} />
            </a>
          </section>
          <section className="bottom-cta">
            <div className="cta-icon">
              <Sparkles />
            </div>
            <div>
              <h2>{copy.ctaTitle}</h2>
              <p>{copy.ctaCopy}</p>
            </div>
            <button
              className="button button-primary"
              onClick={() => {
                setSubmitOpen(true);
                setSubmitted(false);
              }}
            >
              {copy.submitToolCta} <ArrowRight size={16} />
            </button>
          </section>
        </main>
        {!assistantOpen && (
          <button
            className="ask-fab"
            onClick={openAssistant}
            aria-label={copy.openAssistant}
          >
            <span className="fab-glow">
              <MessageCircle size={23} />
            </span>
            <b>Ask Me</b>
          </button>
        )}
        {assistantOpen && (
          <aside
            ref={assistantPanelRef}
            className={
              assistantFullPage
                ? "chat-panel chat-panel-fullpage"
                : "chat-panel"
            }
            role="dialog"
            aria-modal={assistantFullPage || undefined}
            style={
              !assistantFullPage && assistantLayout
                ? {
                    left: `${assistantLayout.left}px`,
                    top: `${assistantLayout.top}px`,
                    right: "auto",
                    bottom: "auto",
                    width: `${assistantLayout.width}px`,
                    height: `${assistantLayout.height}px`,
                  }
                : undefined
            }
            onPointerMove={moveAssistantPanelInteraction}
            onPointerUp={finishAssistantPanelInteraction}
            onPointerCancel={finishAssistantPanelInteraction}
          >
            <div
              className="chat-header"
              onPointerDown={
                assistantFullPage
                  ? undefined
                  : (event) => beginAssistantPanelInteraction(event, "move")
              }
              title={assistantFullPage ? undefined : copy.dragHint}
            >
              <div className="chat-avatar">
                <Sparkles size={18} />
              </div>
              <div>
                <b>
                  Ask Me <span className="online-dot" />
                </b>
                <small>{copy.chatSubtitle}</small>
              </div>
              <button
                type="button"
                onClick={() => setAssistantFullPage((fullPage) => !fullPage)}
                aria-label={
                  assistantFullPage
                    ? copy.useFloatingAssistant
                    : copy.openFullPageAssistant
                }
                title={
                  assistantFullPage
                    ? copy.useFloatingAssistant
                    : copy.openFullPageAssistant
                }
              >
                {assistantFullPage ? (
                  <Minimize2 size={18} />
                ) : (
                  <Maximize2 size={18} />
                )}
              </button>
              <button
                type="button"
                onClick={closeAssistant}
                aria-label={copy.closeAssistant}
              >
                <X size={19} />
              </button>
            </div>
            <div className="chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={`chat-message-group ${m.role}`}>
                  <div className={`chat-message ${m.role}`}>
                    {m.role === "assistant" ? (
                      <FormattedAssistantText text={m.text} />
                    ) : (
                      m.text
                    )}
                  </div>
                  {m.recommendations?.length > 0 && (
                    <div className="chat-recommendations">
                      {m.recommendations.map((tool) => (
                        <article className="chat-recommendation" key={tool.id}>
                          <ToolLogo tool={tool} size={36} />
                          <div>
                            <b>{tool.name}</b>
                            <p>{tool.reason || descriptionForTool(tool)}</p>
                            <a
                              href={safeExternalUrl(tool.url)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {copy.officialWebsite} <ExternalLink size={12} />
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {thinking && (
                <div className="chat-message assistant typing">
                  <i />
                  <i />
                  <i />
                </div>
              )}
            </div>
            <div className="suggestion-row">
              <button onClick={() => setPrompt(copy.studentPrompt)}>
                {copy.aiStudents}
              </button>
              <button onClick={() => setPrompt(copy.codingPrompt)}>
                {copy.codingTools}
              </button>
            </div>
            <form className="chat-input" onSubmit={askAI}>
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={copy.chatPlaceholder}
                aria-label={copy.chatInputAria}
                maxLength={3000}
              />
              <button
                type="button"
                className={
                  voiceListening
                    ? "voice-input-button listening"
                    : "voice-input-button"
                }
                onClick={toggleVoiceInput}
                disabled={
                  !window.SpeechRecognition && !window.webkitSpeechRecognition
                }
                aria-label={
                  voiceListening ? copy.stopVoiceInput : copy.voiceInput
                }
                title={
                  !window.SpeechRecognition && !window.webkitSpeechRecognition
                    ? copy.voiceUnavailable
                    : voiceListening
                      ? copy.stopVoiceInput
                      : copy.voiceInput
                }
              >
                {voiceListening ? <MicOff size={17} /> : <Mic size={17} />}
              </button>
              <button
                disabled={thinking || !prompt.trim()}
                aria-label={copy.sendMessage}
              >
                <Send size={17} />
              </button>
            </form>
            {voiceStatus && (
              <p className="voice-status" role="status">
                {voiceStatus}
              </p>
            )}
            <p className="chat-disclaimer">{copy.chatDisclaimer}</p>
            {!assistantFullPage && (
              <button
                type="button"
                className="chat-resize-handle"
                aria-label={copy.resizeAria}
                title={copy.resizeAria}
                onPointerDown={(event) => {
                  event.stopPropagation();
                  beginAssistantPanelInteraction(event, "resize");
                }}
                onKeyDown={resizeAssistantPanelWithKeyboard}
              />
            )}
          </aside>
        )}

        {authOpen && (
          <div className="modal-backdrop" onClick={() => setAuthOpen(false)}>
            <section
              className="submit-modal auth-modal"
              role="dialog"
              aria-modal="true"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="modal-close"
                type="button"
                onClick={() => setAuthOpen(false)}
                aria-label={copy.close}
              >
                <X />
              </button>
              <div className="modal-kicker">
                <Sparkles size={15} /> AI LIBRARY
              </div>
              <h2>
                {authMode === "register"
                  ? copy.authTitleRegister
                  : copy.authTitleLogin}
              </h2>
              <p className="modal-copy">{copy.authIntro}</p>
              {authNotice && <p className="auth-notice">{authNotice}</p>}
              <form className="submit-form auth-form" onSubmit={submitAuth}>
                <label>
                  {copy.email}
                  <input
                    name="email"
                    type="email"
                    autoComplete="username"
                    maxLength={254}
                    required
                  />
                </label>
                <label>
                  {copy.password}
                  <input
                    name="password"
                    type="password"
                    autoComplete={
                      authMode === "register"
                        ? "new-password"
                        : "current-password"
                    }
                    minLength={authMode === "register" ? 10 : undefined}
                    maxLength={128}
                    required
                  />
                </label>
                {authMode === "register" && (
                  <label>
                    {copy.confirmPassword}
                    <input
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      minLength={10}
                      maxLength={128}
                      required
                    />
                  </label>
                )}
                {authMode === "register" && <small>{copy.passwordHint}</small>}
                {authError && (
                  <p className="auth-error" role="alert">
                    {authError}
                  </p>
                )}
                <button
                  className="button button-primary submit-button"
                  disabled={authBusy}
                >
                  {authBusy
                    ? "…"
                    : authMode === "register"
                      ? copy.createAccount
                      : copy.continue}
                  <ArrowRight size={16} />
                </button>
              </form>
              <button
                type="button"
                className="auth-switch"
                onClick={() => {
                  setAuthMode((mode) =>
                    mode === "register" ? "login" : "register",
                  );
                  setAuthError("");
                }}
              >
                {authMode === "register" ? copy.hasAccount : copy.noAccount}
              </button>
            </section>
          </div>
        )}

        {submitOpen && (
          <div className="modal-backdrop" onClick={() => setSubmitOpen(false)}>
            <section
              className="submit-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSubmitOpen(false)}
                aria-label={copy.close}
              >
                <X />
              </button>
              {submitted ? (
                <div className="success-state">
                  <div className="success-icon">
                    <Check />
                  </div>
                  <h2>{copy.thanks}</h2>
                  <p>{copy.submittedReview}</p>
                  <button
                    className="button button-primary"
                    onClick={() => setSubmitOpen(false)}
                  >
                    {copy.done}
                  </button>
                </div>
              ) : (
                <>
                  <div className="modal-kicker">
                    <Sparkles size={15} /> {copy.communitySubmission}
                  </div>
                  <h2>{copy.submitTitle}</h2>
                  <p className="modal-copy">{copy.submitCopy}</p>
                  <form className="submit-form" onSubmit={submitTool}>
                    <label>
                      {copy.toolName}
                      <input
                        name="name"
                        required
                        placeholder={copy.toolNamePlaceholder}
                      />
                    </label>
                    <label>
                      {copy.categoryLabel}
                      <select
                        name="category"
                        required
                        defaultValue="Productivity"
                      >
                        {categoryOptions
                          .filter((c) => c !== "All")
                          .map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                      </select>
                    </label>
                    <label>
                      {copy.websiteUrl}
                      <input
                        name="url"
                        type="url"
                        required
                        placeholder={copy.websitePlaceholder}
                      />
                    </label>
                    <label>
                      {copy.pricing}
                      <select name="pricing" defaultValue="Freemium">
                        {pricingOptions
                          .filter((option) => option !== "All")
                          .map((option) => (
                            <option key={option} value={option}>
                              {option === "Free"
                                ? copy.free
                                : option === "Freemium"
                                  ? copy.freemium
                                  : option === "Paid"
                                    ? copy.paid
                                    : copy.openSource}
                            </option>
                          ))}
                      </select>
                    </label>
                    <label>
                      {copy.description}
                      <textarea
                        name="description"
                        required
                        rows="3"
                        placeholder={copy.descriptionPlaceholder}
                      />
                    </label>
                    <button className="button button-primary submit-button">
                      {copy.sendForReview} <ArrowRight size={16} />
                    </button>
                    <small>{copy.reviewNotice}</small>
                  </form>
                </>
              )}
            </section>
          </div>
        )}
      </div>
      <Footer language={language} />
    </>
  );
}

const root = document.getElementById("root");
const isAdminRoute = window.location.pathname.replace(/\/$/, "") === "/admin";

createRoot(root).render(
  <React.StrictMode>{isAdminRoute ? <AdminApp /> : <App />}</React.StrictMode>,
);
