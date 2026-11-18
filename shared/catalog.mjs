// Corrected AI tools catalog: unique IDs and consistent categories. Pricing can change.
const toolsData = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "An AI assistant for writing, research, analysis, coding, and image tasks.",
    category: "Assistant",
    pricing: "Freemium",
    url: "https://chatgpt.com/",
    icon: "chatgpt",
    tags: ["AI", "chatbot", "writing", "research"]
  },
  {
    id: "claude",
    name: "Claude",
    description: "An AI assistant for writing, analysis, coding, and working with long documents.",
    category: "Assistant",
    pricing: "Freemium",
    url: "https://claude.ai/",
    icon: "claude",
    tags: ["AI", "chatbot", "writing", "coding"]
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Google's AI assistant for answering questions and working across text, images, and files.",
    category: "Assistant",
    pricing: "Freemium",
    url: "https://gemini.google.com/",
    icon: "gemini",
    tags: ["AI", "chatbot", "google", "multimodal"]
  },
  {
    id: "microsoft-copilot",
    name: "Microsoft Copilot",
    description: "An AI assistant for web answers, writing, image creation, and Microsoft services.",
    category: "Assistant",
    pricing: "Freemium",
    url: "https://copilot.microsoft.com/",
    icon: "microsoft-copilot",
    tags: ["AI", "chatbot", "productivity", "microsoft"]
  },
  {
    id: "perplexity",
    name: "Perplexity",
    description: "An AI answer engine that searches the web and provides linked sources.",
    category: "Assistant",
    pricing: "Freemium",
    url: "https://www.perplexity.ai/",
    icon: "perplexity",
    tags: ["AI", "search", "research", "citations"]
  },
  {
    id: "poe",
    name: "Poe",
    description: "A platform for chatting with AI models and creating custom bots.",
    category: "Assistant",
    pricing: "Freemium",
    url: "https://poe.com/",
    icon: "poe",
    tags: ["AI", "chatbot", "models", "bots"]
  },
  {
    id: "meta-ai",
    name: "Meta AI",
    description: "Meta's AI assistant for chat, questions, and image generation.",
    category: "Assistant",
    pricing: "Free",
    url: "https://www.meta.ai/",
    icon: "meta-ai",
    tags: ["AI", "chatbot", "image-generation", "assistant"]
  },
  {
    id: "character-ai",
    name: "Character.AI",
    description: "A platform for chatting with customizable AI characters.",
    category: "Assistant",
    pricing: "Freemium",
    url: "https://character.ai/",
    icon: "character-ai",
    tags: ["AI", "chatbot", "characters", "roleplay"]
  },
  {
    id: "youcom",
    name: "You.com",
    description: "An AI assistant and search platform for answers, research, and writing.",
    category: "Assistant",
    pricing: "Freemium",
    url: "https://you.com/",
    icon: "youcom",
    tags: ["AI", "search", "assistant", "research"]
  },
  {
    id: "grok",
    name: "Grok",
    description: "An AI assistant from xAI for conversation, research, and image tasks.",
    category: "Assistant",
    pricing: "Freemium",
    url: "https://grok.com/",
    icon: "grok",
    tags: ["AI", "chatbot", "search", "xai"]
  },
  {
    id: "mistral-vibe-chat",
    name: "Mistral Vibe Chat",
    description: "Mistral's conversational assistant for questions, writing, and document tasks.",
    category: "Assistant",
    pricing: "Freemium",
    url: "https://chat.mistral.ai/",
    icon: "mistral-vibe-chat",
    tags: ["AI", "chatbot", "assistant", "multilingual"]
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "An AI chat assistant for general questions, reasoning, and coding help.",
    category: "Assistant",
    pricing: "Free",
    url: "https://chat.deepseek.com/",
    icon: "deepseek",
    tags: ["AI", "chatbot", "reasoning", "coding"]
  },
  {
    id: "qwen-chat",
    name: "Qwen Chat",
    description: "Alibaba's AI assistant for conversation, reasoning, and multimodal tasks.",
    category: "Assistant",
    pricing: "Free",
    url: "https://chat.qwen.ai/",
    icon: "qwen-chat",
    tags: ["AI", "chatbot", "multimodal", "assistant"]
  },
  {
    id: "kimi",
    name: "Kimi",
    description: "An AI assistant for research, writing, and working with long documents.",
    category: "Assistant",
    pricing: "Freemium",
    url: "https://www.kimi.com/",
    icon: "kimi",
    tags: ["AI", "chatbot", "research", "documents"]
  },
  {
    id: "huggingchat",
    name: "HuggingChat",
    description: "A free chat interface for trying open models from Hugging Face.",
    category: "Assistant",
    pricing: "Free",
    url: "https://huggingface.co/chat/",
    icon: "huggingchat",
    tags: ["AI", "chatbot", "open-models", "hugging-face"]
  },
  {
    id: "duckai",
    name: "Duck.ai",
    description: "DuckDuckGo's private AI chat for conversations with selected language models.",
    category: "Assistant",
    pricing: "Free",
    url: "https://duck.ai/",
    icon: "duckai",
    tags: ["AI", "chatbot", "privacy", "assistant"]
  },
  {
    id: "elicit",
    name: "Elicit",
    description: "An AI research assistant for finding and summarizing academic papers.",
    category: "Research",
    pricing: "Freemium",
    url: "https://elicit.com/",
    icon: "elicit",
    tags: ["AI", "research", "papers", "summaries"]
  },
  {
    id: "consensus",
    name: "Consensus",
    description: "A search engine that summarizes findings from scientific research papers.",
    category: "Research",
    pricing: "Freemium",
    url: "https://consensus.app/",
    icon: "consensus",
    tags: ["AI", "research", "papers", "citations"]
  },
  {
    id: "scite",
    name: "Scite",
    description: "A research platform that uses citation context to assess scholarly claims.",
    category: "Research",
    pricing: "Freemium",
    url: "https://scite.ai/",
    icon: "scite",
    tags: ["AI", "research", "citations", "papers"]
  },
  {
    id: "scispace",
    name: "SciSpace",
    description: "A research workspace for discovering, reading, and understanding academic papers.",
    category: "Research",
    pricing: "Freemium",
    url: "https://scispace.com/",
    icon: "scispace",
    tags: ["AI", "research", "papers", "study"]
  },
  {
    id: "research-rabbit",
    name: "ResearchRabbit",
    description: "A literature discovery tool that maps related papers and researchers.",
    category: "Research",
    pricing: "Free",
    url: "https://www.researchrabbit.ai/",
    icon: "research-rabbit",
    tags: ["AI", "research", "papers", "discovery"]
  },
  {
    id: "semantic-scholar",
    name: "Semantic Scholar",
    description: "A free academic search engine with AI-powered research features.",
    category: "Research",
    pricing: "Free",
    url: "https://www.semanticscholar.org/",
    icon: "semantic-scholar",
    tags: ["AI", "research", "papers", "search"]
  },
  {
    id: "connected-papers",
    name: "Connected Papers",
    description: "A visual tool for exploring connections among academic papers.",
    category: "Research",
    pricing: "Freemium",
    url: "https://www.connectedpapers.com/",
    icon: "connected-papers",
    tags: ["AI", "research", "papers", "visualization"]
  },
  {
    id: "litmaps",
    name: "Litmaps",
    description: "A literature mapping tool for finding and monitoring related research papers.",
    category: "Research",
    pricing: "Freemium",
    url: "https://www.litmaps.com/",
    icon: "litmaps",
    tags: ["AI", "research", "papers", "literature-review"]
  },
  {
    id: "scholarcy",
    name: "Scholarcy",
    description: "An AI reading assistant that summarizes research papers and reports.",
    category: "Research",
    pricing: "Freemium",
    url: "https://www.scholarcy.com/",
    icon: "scholarcy",
    tags: ["AI", "research", "summaries", "papers"]
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    description: "A source-grounded research assistant for summarizing and exploring your materials.",
    category: "Research",
    pricing: "Free",
    url: "https://notebooklm.google.com/",
    icon: "notebooklm",
    tags: ["AI", "research", "documents", "summaries"]
  },
  {
    id: "undermind",
    name: "Undermind",
    description: "An AI co-researcher that searches scholarly literature for relevant papers.",
    category: "Research",
    pricing: "Freemium",
    url: "https://www.undermind.ai/",
    icon: "undermind",
    tags: ["AI", "research", "papers", "discovery"]
  },
  {
    id: "keenious",
    name: "Keenious",
    description: "A research discovery tool that recommends papers based on your text or documents.",
    category: "Research",
    pricing: "Freemium",
    url: "https://keenious.com/",
    icon: "keenious",
    tags: ["AI", "research", "papers", "discovery"]
  },
  {
    id: "grammarly",
    name: "Grammarly",
    description: "An AI writing assistant for grammar, clarity, tone, and text generation.",
    category: "Writing",
    pricing: "Freemium",
    url: "https://www.grammarly.com/",
    icon: "grammarly",
    tags: ["AI", "writing", "grammar", "editing"]
  },
  {
    id: "jasper",
    name: "Jasper",
    description: "An AI content platform for marketing copy and brand-consistent writing.",
    category: "Writing",
    pricing: "Paid",
    url: "https://www.jasper.ai/",
    icon: "jasper",
    tags: ["AI", "writing", "marketing", "content"]
  },
  {
    id: "copy-ai",
    name: "Copy.ai",
    description: "An AI platform for creating marketing content and automating go-to-market tasks.",
    category: "Writing",
    pricing: "Freemium",
    url: "https://www.copy.ai/",
    icon: "copy-ai",
    tags: ["AI", "writing", "marketing", "copywriting"]
  },
  {
    id: "writesonic",
    name: "Writesonic",
    description: "An AI writing and search visibility platform for marketing teams.",
    category: "Writing",
    pricing: "Freemium",
    url: "https://writesonic.com/",
    icon: "writesonic",
    tags: ["AI", "writing", "marketing", "seo"]
  },
  {
    id: "rytr",
    name: "Rytr",
    description: "An AI writing tool for drafting emails, posts, and other short-form content.",
    category: "Writing",
    pricing: "Freemium",
    url: "https://rytr.me/",
    icon: "rytr",
    tags: ["AI", "writing", "copywriting", "content"]
  },
  {
    id: "quillbot",
    name: "QuillBot",
    description: "An AI writing suite for paraphrasing, summarizing, and checking text.",
    category: "Writing",
    pricing: "Freemium",
    url: "https://quillbot.com/",
    icon: "quillbot",
    tags: ["AI", "writing", "paraphrasing", "summaries"]
  },
  {
    id: "wordtune",
    name: "Wordtune",
    description: "An AI writing companion for rewriting, summarizing, and improving text.",
    category: "Writing",
    pricing: "Freemium",
    url: "https://www.wordtune.com/",
    icon: "wordtune",
    tags: ["AI", "writing", "rewriting", "editing"]
  },
  {
    id: "sudowrite",
    name: "Sudowrite",
    description: "An AI writing partner designed for fiction writers and storytellers.",
    category: "Writing",
    pricing: "Paid",
    url: "https://www.sudowrite.com/",
    icon: "sudowrite",
    tags: ["AI", "writing", "fiction", "storytelling"]
  },
  {
    id: "writer-com",
    name: "Writer",
    description: "An enterprise AI platform for writing, knowledge search, and workflow automation.",
    category: "Writing",
    pricing: "Paid",
    url: "https://writer.com/",
    icon: "writer-com",
    tags: ["AI", "writing", "enterprise", "productivity"]
  },
  {
    id: "deepl-write",
    name: "DeepL Write",
    description: "An AI writing assistant for improving grammar, phrasing, and tone.",
    category: "Writing",
    pricing: "Freemium",
    url: "https://www.deepl.com/write",
    icon: "deepl-write",
    tags: ["AI", "writing", "editing", "translation"]
  },
  {
    id: "hyperwrite",
    name: "HyperWrite",
    description: "An AI writing assistant for drafting, rewriting, and completing text.",
    category: "Writing",
    pricing: "Freemium",
    url: "https://www.hyperwriteai.com/",
    icon: "hyperwrite",
    tags: ["AI", "writing", "assistant", "content"]
  },
  {
    id: "anyword",
    name: "Anyword",
    description: "An AI writing platform for creating and evaluating marketing copy.",
    category: "Writing",
    pricing: "Paid",
    url: "https://www.anyword.com/",
    icon: "anyword",
    tags: ["AI", "writing", "marketing", "copywriting"]
  },
  {
    id: "frase",
    name: "Frase",
    description: "An AI platform for researching, drafting, and optimizing search-focused content.",
    category: "Writing",
    pricing: "Paid",
    url: "https://www.frase.io/",
    icon: "frase",
    tags: ["AI", "writing", "seo", "research"]
  },
  {
    id: "surfer-seo",
    name: "Surfer SEO",
    description: "An SEO content platform with AI tools for research and optimization.",
    category: "Writing",
    pricing: "Paid",
    url: "https://surferseo.com/",
    icon: "surfer-seo",
    tags: ["AI", "writing", "seo", "marketing"]
  },
  {
    id: "scalenut",
    name: "Scalenut",
    description: "An AI platform for planning, writing, and optimizing SEO content.",
    category: "Writing",
    pricing: "Paid",
    url: "https://www.scalenut.com/",
    icon: "scalenut",
    tags: ["AI", "writing", "seo", "marketing"]
  },
  {
    id: "jenni-ai",
    name: "Jenni AI",
    description: "An AI writing assistant for academic drafting, citations, and research workflows.",
    category: "Writing",
    pricing: "Freemium",
    url: "https://jenni.ai/",
    icon: "jenni-ai",
    tags: ["AI", "writing", "academic", "citations"]
  },
  {
    id: "textcortex",
    name: "TextCortex",
    description: "An AI writing and knowledge assistant for business content and workflows.",
    category: "Writing",
    pricing: "Freemium",
    url: "https://textcortex.com/",
    icon: "textcortex",
    tags: ["AI", "writing", "business", "assistant"]
  },
  {
    id: "prowritingaid",
    name: "ProWritingAid",
    description: "A writing editor with AI feedback for style, grammar, and readability.",
    category: "Writing",
    pricing: "Freemium",
    url: "https://prowritingaid.com/",
    icon: "prowritingaid",
    tags: ["AI", "writing", "editing", "grammar"]
  },
  {
    id: "simplified",
    name: "Simplified",
    description: "An AI workspace for writing, design, video, and social media content.",
    category: "Writing",
    pricing: "Freemium",
    url: "https://simplified.com/",
    icon: "simplified",
    tags: ["AI", "writing", "design", "marketing"]
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "An AI image generation platform for creating images from text prompts.",
    category: "Image",
    pricing: "Paid",
    url: "https://www.midjourney.com/",
    icon: "midjourney",
    tags: ["AI", "image-generation", "art", "design"]
  },
  {
    id: "adobe-firefly",
    name: "Adobe Firefly",
    description: "Adobe's generative AI tools for creating and editing images, video, and design assets.",
    category: "Image",
    pricing: "Freemium",
    url: "https://firefly.adobe.com/",
    icon: "adobe-firefly",
    tags: ["AI", "image-generation", "design", "editing"]
  },
  {
    id: "leonardo-ai",
    name: "Leonardo AI",
    description: "A creative platform for generating and editing images and visual assets.",
    category: "Image",
    pricing: "Freemium",
    url: "https://leonardo.ai/",
    icon: "leonardo-ai",
    tags: ["AI", "image-generation", "art", "design"]
  },
  {
    id: "ideogram",
    name: "Ideogram",
    description: "An AI image generator known for rendering text in designed visuals.",
    category: "Image",
    pricing: "Freemium",
    url: "https://ideogram.ai/",
    icon: "ideogram",
    tags: ["AI", "image-generation", "design", "typography"]
  },
  {
    id: "recraft",
    name: "Recraft",
    description: "An AI design platform for generating and editing images, vectors, and brand assets.",
    category: "Image",
    pricing: "Freemium",
    url: "https://www.recraft.ai/",
    icon: "recraft",
    tags: ["AI", "image-generation", "vector", "design"]
  },
  {
    id: "krea",
    name: "Krea",
    description: "A visual AI studio for image generation, editing, and enhancement.",
    category: "Image",
    pricing: "Freemium",
    url: "https://www.krea.ai/",
    icon: "krea",
    tags: ["AI", "image-generation", "editing", "design"]
  },
  {
    id: "playground",
    name: "Playground",
    description: "An AI creative platform for generating and editing images and visual designs.",
    category: "Image",
    pricing: "Freemium",
    url: "https://playgroundart.ai/",
    icon: "playground",
    tags: ["AI", "image-generation", "design", "editing"]
  },
  {
    id: "canva-magic-studio",
    name: "Canva Magic Studio",
    description: "Canva's collection of AI tools for creating and editing visual content.",
    category: "Image",
    pricing: "Freemium",
    url: "https://www.canva.com/magic/",
    icon: "canva-magic-studio",
    tags: ["AI", "design", "image-generation", "productivity"]
  },
  {
    id: "microsoft-designer",
    name: "Microsoft Designer",
    description: "An AI design app for creating social graphics, invitations, and images.",
    category: "Image",
    pricing: "Freemium",
    url: "https://designer.microsoft.com/",
    icon: "microsoft-designer",
    tags: ["AI", "design", "image-generation", "social-media"]
  },
  {
    id: "fotor",
    name: "Fotor AI",
    description: "An online photo editor with AI tools for image creation and enhancement.",
    category: "Image",
    pricing: "Freemium",
    url: "https://www.fotor.com/",
    icon: "fotor",
    tags: ["AI", "image-editing", "image-generation", "design"]
  },
  {
    id: "pixlr",
    name: "Pixlr AI",
    description: "A browser-based image editor with AI generation and photo editing tools.",
    category: "Image",
    pricing: "Freemium",
    url: "https://pixlr.com/",
    icon: "pixlr",
    tags: ["AI", "image-editing", "image-generation", "photo"]
  },
  {
    id: "clipdrop",
    name: "Clipdrop",
    description: "A suite of AI tools for image cleanup, background removal, and visual creation.",
    category: "Image",
    pricing: "Freemium",
    url: "https://clipdrop.co/",
    icon: "clipdrop",
    tags: ["AI", "image-editing", "background-removal", "design"]
  },
  {
    id: "remove-bg",
    name: "remove.bg",
    description: "An AI tool that removes image backgrounds automatically.",
    category: "Image",
    pricing: "Freemium",
    url: "https://www.remove.bg/",
    icon: "remove-bg",
    tags: ["AI", "image-editing", "background-removal", "photo"]
  },
  {
    id: "photoroom",
    name: "PhotoRoom",
    description: "An AI photo editor for product images, backgrounds, and marketing visuals.",
    category: "Image",
    pricing: "Freemium",
    url: "https://www.photoroom.com/",
    icon: "photoroom",
    tags: ["AI", "image-editing", "product-photos", "background-removal"]
  },
  {
    id: "pixelcut",
    name: "Pixelcut",
    description: "An AI photo and design editor for product images and social content.",
    category: "Image",
    pricing: "Freemium",
    url: "https://www.pixelcut.ai/",
    icon: "pixelcut",
    tags: ["AI", "image-editing", "product-photos", "design"]
  },
  {
    id: "freepik-ai",
    name: "Freepik AI",
    description: "Freepik's generative tools for creating and editing images and design assets.",
    category: "Image",
    pricing: "Freemium",
    url: "https://www.freepik.com/ai",
    icon: "freepik-ai",
    tags: ["AI", "image-generation", "design", "stock-assets"]
  },
  {
    id: "nightcafe",
    name: "NightCafe",
    description: "An online creative community and studio for AI-generated artwork.",
    category: "Image",
    pricing: "Freemium",
    url: "https://nightcafe.studio/",
    icon: "nightcafe",
    tags: ["AI", "image-generation", "art", "community"]
  },
  {
    id: "kittl-ai",
    name: "Kittl AI",
    description: "A design editor with AI tools for creating graphics, illustrations, and typography.",
    category: "Image",
    pricing: "Freemium",
    url: "https://www.kittl.com/",
    icon: "kittl-ai",
    tags: ["AI", "design", "image-generation", "typography"]
  },
  {
    id: "getimg-ai",
    name: "getimg.ai",
    description: "An AI image platform for generating, editing, and expanding images.",
    category: "Image",
    pricing: "Freemium",
    url: "https://getimg.ai/",
    icon: "getimg-ai",
    tags: ["AI", "image-generation", "image-editing", "design"]
  },
  {
    id: "artbreeder",
    name: "Artbreeder",
    description: "A collaborative tool for creating and remixing AI-generated images.",
    category: "Image",
    pricing: "Freemium",
    url: "https://www.artbreeder.com/",
    icon: "artbreeder",
    tags: ["AI", "image-generation", "art", "characters"]
  },
  {
    id: "runway",
    name: "Runway",
    description: "A creative AI platform for generating and editing video, images, and audio.",
    category: "Video",
    pricing: "Freemium",
    url: "https://runway.com/",
    icon: "runway",
    tags: ["AI", "video-generation", "video-editing", "creative"]
  },
  {
    id: "pika",
    name: "Pika",
    description: "An AI video tool for generating and transforming short clips from prompts and images.",
    category: "Video",
    pricing: "Freemium",
    url: "https://pika.art/",
    icon: "pika",
    tags: ["AI", "video-generation", "animation", "creative"]
  },
  {
    id: "luma-dream-machine",
    name: "Luma Dream Machine",
    description: "A generative AI tool for creating and editing video from text and images.",
    category: "Video",
    pricing: "Freemium",
    url: "https://lumalabs.ai/dream-machine",
    icon: "luma-dream-machine",
    tags: ["AI", "video-generation", "image-to-video", "creative"]
  },
  {
    id: "kling-ai",
    name: "Kling AI",
    description: "An AI media studio for generating video and images from prompts and references.",
    category: "Video",
    pricing: "Freemium",
    url: "https://kling.ai/",
    icon: "kling-ai",
    tags: ["AI", "video-generation", "image-generation", "creative"]
  },
  {
    id: "synthesia",
    name: "Synthesia",
    description: "A video platform for creating presenter-led videos with AI avatars and voiceovers.",
    category: "Video",
    pricing: "Freemium",
    url: "https://www.synthesia.io/",
    icon: "synthesia",
    tags: ["AI", "video-generation", "avatars", "training"]
  },
  {
    id: "heygen",
    name: "HeyGen",
    description: "An AI video platform for avatars, voiceovers, and multilingual video translation.",
    category: "Video",
    pricing: "Freemium",
    url: "https://www.heygen.com/",
    icon: "heygen",
    tags: ["AI", "video-generation", "avatars", "translation"]
  },
  {
    id: "descript",
    name: "Descript",
    description: "An audio and video editor that lets you edit recordings through their transcripts.",
    category: "Video",
    pricing: "Freemium",
    url: "https://www.descript.com/",
    icon: "descript",
    tags: ["AI", "video-editing", "transcription", "audio"]
  },
  {
    id: "invideo-ai",
    name: "InVideo AI",
    description: "An AI video maker that turns prompts and scripts into editable videos.",
    category: "Video",
    pricing: "Freemium",
    url: "https://invideo.io/ai/",
    icon: "invideo-ai",
    tags: ["AI", "video-generation", "social-media", "marketing"]
  },
  {
    id: "veed",
    name: "VEED",
    description: "An online video editor with AI tools for subtitles, clips, and video generation.",
    category: "Video",
    pricing: "Freemium",
    url: "https://www.veed.io/",
    icon: "veed",
    tags: ["AI", "video-editing", "subtitles", "social-media"]
  },
  {
    id: "kapwing",
    name: "Kapwing",
    description: "A browser-based video editor with AI features for editing and repurposing content.",
    category: "Video",
    pricing: "Freemium",
    url: "https://www.kapwing.com/",
    icon: "kapwing",
    tags: ["AI", "video-editing", "subtitles", "social-media"]
  },
  {
    id: "opusclip",
    name: "OpusClip",
    description: "An AI video editor that turns longer recordings into short social clips.",
    category: "Video",
    pricing: "Freemium",
    url: "https://www.opus.pro/",
    icon: "opusclip",
    tags: ["AI", "video-editing", "clips", "social-media"]
  },
  {
    id: "fliki",
    name: "Fliki",
    description: "An AI tool for turning scripts and articles into narrated videos.",
    category: "Video",
    pricing: "Freemium",
    url: "https://fliki.ai/",
    icon: "fliki",
    tags: ["AI", "video-generation", "voiceover", "content"]
  },
  {
    id: "pictory",
    name: "Pictory",
    description: "An AI video platform for turning text and long recordings into videos and clips.",
    category: "Video",
    pricing: "Freemium",
    url: "https://pictory.ai/",
    icon: "pictory",
    tags: ["AI", "video-generation", "video-editing", "content"]
  },
  {
    id: "captions",
    name: "Captions",
    description: "An AI video creation app for captions, editing, dubbing, and avatars.",
    category: "Video",
    pricing: "Freemium",
    url: "https://www.captions.ai/",
    icon: "captions",
    tags: ["AI", "video-editing", "captions", "dubbing"]
  },
  {
    id: "d-id",
    name: "D-ID",
    description: "A platform for creating talking-avatar videos from images, text, and audio.",
    category: "Video",
    pricing: "Freemium",
    url: "https://www.d-id.com/",
    icon: "d-id",
    tags: ["AI", "video-generation", "avatars", "presentations"]
  },
  {
    id: "hedra",
    name: "Hedra",
    description: "A creative platform for generating videos with expressive AI characters.",
    category: "Video",
    pricing: "Freemium",
    url: "https://www.hedra.com/",
    icon: "hedra",
    tags: ["AI", "video-generation", "characters", "animation"]
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    description: "An AI audio platform for text-to-speech, voice design, and dubbing.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://elevenlabs.io/",
    icon: "elevenlabs",
    tags: ["AI", "text-to-speech", "voice", "audio"]
  },
  {
    id: "suno",
    name: "Suno",
    description: "An AI music tool for creating songs from text prompts and lyrics.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://suno.com/",
    icon: "suno",
    tags: ["AI", "music-generation", "audio", "creative"]
  },
  {
    id: "udio",
    name: "Udio",
    description: "An AI music creation platform for generating songs from text prompts.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://www.udio.com/",
    icon: "udio",
    tags: ["AI", "music-generation", "audio", "creative"]
  },
  {
    id: "aiva",
    name: "AIVA",
    description: "An AI music composer for generating and customizing original tracks.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://www.aiva.ai/",
    icon: "aiva",
    tags: ["AI", "music-generation", "composition", "audio"]
  },
  {
    id: "soundraw",
    name: "Soundraw",
    description: "An AI music generator for creating and customizing royalty-cleared tracks.",
    category: "Audio",
    pricing: "Paid",
    url: "https://soundraw.io/",
    icon: "soundraw",
    tags: ["AI", "music-generation", "audio", "royalty-free"]
  },
  {
    id: "beatoven-ai",
    name: "Beatoven.ai",
    description: "An AI music tool for composing background tracks for video and podcasts.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://www.beatoven.ai/",
    icon: "beatoven-ai",
    tags: ["AI", "music-generation", "audio", "background-music"]
  },
  {
    id: "mubert",
    name: "Mubert",
    description: "An AI music platform for generating soundtracks and royalty-free music.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://mubert.com/",
    icon: "mubert",
    tags: ["AI", "music-generation", "audio", "royalty-free"]
  },
  {
    id: "murf-ai",
    name: "Murf AI",
    description: "An AI voice platform for creating voiceovers and text-to-speech audio.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://murf.ai/",
    icon: "murf-ai",
    tags: ["AI", "text-to-speech", "voiceover", "audio"]
  },
  {
    id: "playht",
    name: "PlayHT",
    description: "An AI voice platform for generating speech and conversational audio.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://playht.co/",
    icon: "playht",
    tags: ["AI", "text-to-speech", "voice", "audio"]
  },
  {
    id: "speechify",
    name: "Speechify",
    description: "A text-to-speech app that reads documents, web pages, and other text aloud.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://speechify.com/",
    icon: "speechify",
    tags: ["AI", "text-to-speech", "accessibility", "audio"]
  },
  {
    id: "adobe-podcast",
    name: "Adobe Podcast",
    description: "A web audio tool for recording, transcribing, and enhancing spoken audio.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://podcast.adobe.com/",
    icon: "adobe-podcast",
    tags: ["AI", "audio-editing", "podcast", "voice"]
  },
  {
    id: "krisp",
    name: "Krisp",
    description: "An AI meeting app for noise cancellation, transcription, and call notes.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://krisp.ai/",
    icon: "krisp",
    tags: ["AI", "audio", "meetings", "transcription"]
  },
  {
    id: "otter-ai",
    name: "Otter.ai",
    description: "An AI meeting assistant for recording, transcribing, and summarizing conversations.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://otter.ai/",
    icon: "otter-ai",
    tags: ["AI", "meetings", "transcription", "summaries"]
  },
  {
    id: "fireflies-ai",
    name: "Fireflies.ai",
    description: "An AI meeting assistant that transcribes and summarizes conversations.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://fireflies.ai/",
    icon: "fireflies-ai",
    tags: ["AI", "meetings", "transcription", "summaries"]
  },
  {
    id: "fathom",
    name: "Fathom",
    description: "An AI meeting assistant for recording, transcribing, and sharing call summaries.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://fathom.video/",
    icon: "fathom",
    tags: ["AI", "meetings", "transcription", "summaries"]
  },
  {
    id: "tldv",
    name: "tl;dv",
    description: "An AI meeting recorder for transcripts, summaries, and searchable call highlights.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://tldv.io/",
    icon: "tldv",
    tags: ["AI", "meetings", "transcription", "summaries"]
  },
  {
    id: "moises",
    name: "Moises",
    description: "An AI music practice app for separating vocals and instruments and editing audio.",
    category: "Audio",
    pricing: "Freemium",
    url: "https://moises.ai/",
    icon: "moises",
    tags: ["AI", "audio-editing", "music", "practice"]
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description: "An AI coding assistant for code completion, chat, and development workflows.",
    category: "Coding",
    pricing: "Freemium",
    url: "https://github.com/features/copilot",
    icon: "github-copilot",
    tags: ["AI", "coding", "developer-tools", "autocomplete"]
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "An AI code editor for understanding codebases and making code changes.",
    category: "Coding",
    pricing: "Freemium",
    url: "https://cursor.com/",
    icon: "cursor",
    tags: ["AI", "coding", "code-editor", "developer-tools"]
  },
  {
    id: "replit",
    name: "Replit",
    description: "An online coding workspace with AI assistance for building and deploying apps.",
    category: "Coding",
    pricing: "Freemium",
    url: "https://replit.com/ai",
    icon: "replit",
    tags: ["AI", "coding", "app-builder", "developer-tools"]
  },
  {
    id: "tabnine",
    name: "Tabnine",
    description: "An AI coding assistant that provides code completions and development help.",
    category: "Coding",
    pricing: "Freemium",
    url: "https://www.tabnine.com/",
    icon: "tabnine",
    tags: ["AI", "coding", "autocomplete", "developer-tools"]
  },
  {
    id: "amazon-q-developer",
    name: "Amazon Q Developer",
    description: "AWS's AI assistant for software development and cloud-related tasks.",
    category: "Coding",
    pricing: "Freemium",
    url: "https://aws.amazon.com/q/developer/",
    icon: "amazon-q-developer",
    tags: ["AI", "coding", "aws", "developer-tools"]
  },
  {
    id: "cline",
    name: "Cline",
    description: "An open-source coding agent that can edit projects and run development tools.",
    category: "Coding",
    pricing: "Open Source",
    url: "https://cline.bot/",
    icon: "cline",
    tags: ["AI", "coding", "open-source", "agent"]
  },
  {
    id: "aider",
    name: "Aider",
    description: "An open-source AI pair programmer that works with your local code repository.",
    category: "Coding",
    pricing: "Open Source",
    url: "https://aider.chat/",
    icon: "aider",
    tags: ["AI", "coding", "open-source", "pair-programming"]
  },
  {
    id: "v0",
    name: "v0",
    description: "An AI tool for generating user interfaces and web applications from prompts.",
    category: "Coding",
    pricing: "Freemium",
    url: "https://v0.app/",
    icon: "v0",
    tags: ["AI", "coding", "app-builder", "frontend"]
  },
  {
    id: "bolt",
    name: "Bolt.new",
    description: "A browser-based AI environment for creating and iterating on web applications.",
    category: "Coding",
    pricing: "Freemium",
    url: "https://bolt.new/",
    icon: "bolt",
    tags: ["AI", "coding", "app-builder", "web-development"]
  },
  {
    id: "lovable",
    name: "Lovable",
    description: "An AI app builder for turning natural-language requests into web applications.",
    category: "Coding",
    pricing: "Freemium",
    url: "https://lovable.dev/",
    icon: "lovable",
    tags: ["AI", "coding", "app-builder", "web-development"]
  },
  {
    id: "devin",
    name: "Devin",
    description: "An AI software engineering agent for completing development tasks.",
    category: "Coding",
    pricing: "Paid",
    url: "https://devin.ai/",
    icon: "devin",
    tags: ["AI", "coding", "agent", "developer-tools"]
  },
  {
    id: "qodo",
    name: "Qodo",
    description: "An AI coding platform for code generation, review, and software quality.",
    category: "Coding",
    pricing: "Freemium",
    url: "https://www.qodo.ai/",
    icon: "qodo",
    tags: ["AI", "coding", "code-review", "testing"]
  },
  {
    id: "coderabbit",
    name: "CodeRabbit",
    description: "An AI code review tool that analyzes pull requests and suggests improvements.",
    category: "Coding",
    pricing: "Freemium",
    url: "https://coderabbit.ai/",
    icon: "coderabbit",
    tags: ["AI", "coding", "code-review", "developer-tools"]
  },
  {
    id: "openai-codex",
    name: "OpenAI Codex",
    description: "An AI coding agent for software engineering tasks, code review, and development workflows.",
    category: "Coding",
    pricing: "Paid",
    url: "https://openai.com/codex/",
    icon: "openai-codex",
    tags: ["AI", "coding", "agent", "developer-tools"]
  },
  {
    id: "jetbrains-ai",
    name: "JetBrains AI Assistant",
    description: "AI coding features integrated into JetBrains development environments.",
    category: "Coding",
    pricing: "Freemium",
    url: "https://www.jetbrains.com/ai/",
    icon: "jetbrains-ai",
    tags: ["AI", "coding", "ide", "developer-tools"]
  },
  {
    id: "zed",
    name: "Zed",
    description: "A code editor with AI assistance for writing and understanding code.",
    category: "Coding",
    pricing: "Freemium",
    url: "https://zed.dev/",
    icon: "zed",
    tags: ["AI", "coding", "code-editor", "developer-tools"]
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    description: "AI writing, search, and summarization features inside Notion workspaces.",
    category: "Productivity",
    pricing: "Paid",
    url: "https://www.notion.so/product/ai",
    icon: "notion-ai",
    tags: ["AI", "productivity", "writing", "knowledge-management"]
  },
  {
    id: "mem",
    name: "Mem",
    description: "An AI-powered workspace for organizing notes and retrieving personal knowledge.",
    category: "Productivity",
    pricing: "Freemium",
    url: "https://mem.ai/",
    icon: "mem",
    tags: ["AI", "productivity", "notes", "knowledge-management"]
  },
  {
    id: "gamma",
    name: "Gamma",
    description: "An AI tool for creating presentations, documents, and simple web pages.",
    category: "Productivity",
    pricing: "Freemium",
    url: "https://gamma.app/",
    icon: "gamma",
    tags: ["AI", "productivity", "presentations", "design"]
  },
  {
    id: "beautiful-ai",
    name: "Beautiful.ai",
    description: "A presentation platform with AI-assisted slide creation and layout tools.",
    category: "Productivity",
    pricing: "Paid",
    url: "https://www.beautiful.ai/",
    icon: "beautiful-ai",
    tags: ["AI", "productivity", "presentations", "design"]
  },
  {
    id: "pitch",
    name: "Pitch",
    description: "A presentation workspace with AI tools for drafting and designing slide decks.",
    category: "Productivity",
    pricing: "Freemium",
    url: "https://pitch.com/",
    icon: "pitch",
    tags: ["AI", "productivity", "presentations", "collaboration"]
  },
  {
    id: "plus-ai",
    name: "Plus AI",
    description: "An AI presentation tool that creates and edits slides in Google Slides and PowerPoint.",
    category: "Productivity",
    pricing: "Freemium",
    url: "https://www.plusai.com/",
    icon: "plus-ai",
    tags: ["AI", "productivity", "presentations", "slides"]
  },
  {
    id: "napkin-ai",
    name: "Napkin AI",
    description: "An AI tool that turns written ideas into diagrams and visual explanations.",
    category: "Productivity",
    pricing: "Freemium",
    url: "https://www.napkin.ai/",
    icon: "napkin-ai",
    tags: ["AI", "productivity", "diagrams", "visualization"]
  },
  {
    id: "taskade",
    name: "Taskade",
    description: "An AI workspace for tasks, projects, notes, and collaborative agents.",
    category: "Productivity",
    pricing: "Freemium",
    url: "https://www.taskade.com/",
    icon: "taskade",
    tags: ["AI", "productivity", "tasks", "collaboration"]
  },
  {
    id: "motion",
    name: "Motion",
    description: "An AI productivity app that plans calendars, tasks, and project schedules.",
    category: "Productivity",
    pricing: "Paid",
    url: "https://www.usemotion.com/",
    icon: "motion",
    tags: ["AI", "productivity", "calendar", "scheduling"]
  },
  {
    id: "reclaim-ai",
    name: "Reclaim.ai",
    description: "An AI calendar assistant that schedules tasks, habits, and meetings.",
    category: "Productivity",
    pricing: "Freemium",
    url: "https://reclaim.ai/",
    icon: "reclaim-ai",
    tags: ["AI", "productivity", "calendar", "scheduling"]
  },
  {
    id: "airtable-ai",
    name: "Airtable AI",
    description: "AI features in Airtable for organizing, summarizing, and acting on work data.",
    category: "Productivity",
    pricing: "Paid",
    url: "https://www.airtable.com/platform/ai",
    icon: "airtable-ai",
    tags: ["AI", "productivity", "database", "automation"]
  },
  {
    id: "asana-ai",
    name: "Asana AI",
    description: "AI features in Asana for project planning, updates, and work management.",
    category: "Productivity",
    pricing: "Paid",
    url: "https://asana.com/product/ai",
    icon: "asana-ai",
    tags: ["AI", "productivity", "project-management", "tasks"]
  },
  {
    id: "clickup-ai",
    name: "ClickUp AI",
    description: "AI writing, summarization, and task assistance within ClickUp.",
    category: "Productivity",
    pricing: "Freemium",
    url: "https://clickup.com/ai",
    icon: "clickup-ai",
    tags: ["AI", "productivity", "project-management", "writing"]
  },
  {
    id: "zapier-ai",
    name: "Zapier AI",
    description: "AI tools for building and running automated workflows across connected apps.",
    category: "Automation",
    pricing: "Freemium",
    url: "https://zapier.com/ai",
    icon: "zapier-ai",
    tags: ["AI", "automation", "workflows", "integrations"]
  },
  {
    id: "make",
    name: "Make",
    description: "A visual automation platform with AI tools for connecting apps and workflows.",
    category: "Automation",
    pricing: "Freemium",
    url: "https://www.make.com/",
    icon: "make",
    tags: ["AI", "automation", "workflows", "integrations"]
  },
  {
    id: "n8n",
    name: "n8n",
    description: "A workflow automation platform for connecting AI models, apps, and services.",
    category: "Automation",
    pricing: "Open Source",
    url: "https://n8n.io/",
    icon: "n8n",
    tags: ["AI", "automation", "open-source", "workflows"]
  },
  {
    id: "lindy",
    name: "Lindy",
    description: "An AI agent platform for automating email, meetings, and business workflows.",
    category: "Automation",
    pricing: "Freemium",
    url: "https://www.lindy.ai/",
    icon: "lindy",
    tags: ["AI", "automation", "agents", "productivity"]
  },
  {
    id: "julius-ai",
    name: "Julius AI",
    description: "An AI data analyst for exploring datasets and creating charts and reports.",
    category: "Data",
    pricing: "Freemium",
    url: "https://julius.ai/",
    icon: "julius-ai",
    tags: ["AI", "data-analysis", "visualization", "spreadsheets"]
  },
  {
    id: "rows-ai",
    name: "Rows AI",
    description: "An AI data analyst built into a spreadsheet for importing and analyzing data.",
    category: "Data",
    pricing: "Freemium",
    url: "https://rows.com/",
    icon: "rows-ai",
    tags: ["AI", "data-analysis", "spreadsheets", "reports"]
  },
  {
    id: "hex",
    name: "Hex",
    description: "A collaborative data workspace with AI assistance for analytics and notebooks.",
    category: "Data",
    pricing: "Freemium",
    url: "https://hex.tech/",
    icon: "hex",
    tags: ["AI", "data-analysis", "analytics", "notebooks"]
  },
  {
    id: "akkio",
    name: "Akkio",
    description: "An AI analytics platform for building predictive models and business reports.",
    category: "Data",
    pricing: "Paid",
    url: "https://www.akkio.com/",
    icon: "akkio",
    tags: ["AI", "data-analysis", "predictive-analytics", "business"]
  },
  {
    id: "obviously-ai",
    name: "Obviously AI",
    description: "A no-code platform for building predictive models from business data.",
    category: "Data",
    pricing: "Paid",
    url: "https://www.obviously.ai/",
    icon: "obviously-ai",
    tags: ["AI", "data-analysis", "predictive-analytics", "no-code"]
  },
  {
    id: "khanmigo",
    name: "Khanmigo",
    description: "Khan Academy's AI tutor and teaching assistant for guided learning.",
    category: "Education",
    pricing: "Freemium",
    url: "https://www.khanmigo.ai/",
    icon: "khanmigo",
    tags: ["AI", "education", "tutoring", "learning"]
  },
  {
    id: "magicschool",
    name: "MagicSchool",
    description: "An AI platform with tools for teachers, school staff, and students.",
    category: "Education",
    pricing: "Freemium",
    url: "https://www.magicschool.ai/",
    icon: "magicschool",
    tags: ["AI", "education", "teachers", "lesson-planning"]
  },
  {
    id: "schoolai",
    name: "SchoolAI",
    description: "An education platform for creating AI learning spaces and classroom activities.",
    category: "Education",
    pricing: "Freemium",
    url: "https://schoolai.com/",
    icon: "schoolai",
    tags: ["AI", "education", "students", "teachers"]
  },
  {
    id: "diffit",
    name: "Diffit",
    description: "An AI teaching tool for adapting reading materials and creating classroom resources.",
    category: "Education",
    pricing: "Freemium",
    url: "https://diffit.me/",
    icon: "diffit",
    tags: ["AI", "education", "teachers", "lesson-planning"]
  },
  {
    id: "brisk-teaching",
    name: "Brisk Teaching",
    description: "An AI teaching assistant for creating lesson materials and giving feedback.",
    category: "Education",
    pricing: "Freemium",
    url: "https://www.briskteaching.com/",
    icon: "brisk-teaching",
    tags: ["AI", "education", "teachers", "feedback"]
  },
  {
    id: "quizlet",
    name: "Quizlet",
    description: "A study platform with AI features for generating study guides and practice questions.",
    category: "Education",
    pricing: "Freemium",
    url: "https://quizlet.com/",
    icon: "quizlet",
    tags: ["AI", "education", "study", "flashcards"]
  },
  {
    id: "duolingo-max",
    name: "Duolingo Max",
    description: "Duolingo's premium language-learning tier with AI-powered practice features.",
    category: "Education",
    pricing: "Paid",
    url: "https://www.duolingo.com/",
    icon: "duolingo-max",
    tags: ["AI", "education", "language-learning", "tutoring"]
  },
  {
    id: "speak",
    name: "Speak",
    description: "A language-learning app with AI conversation practice and speaking feedback.",
    category: "Education",
    pricing: "Freemium",
    url: "https://www.speak.com/",
    icon: "speak",
    tags: ["AI", "education", "language-learning", "conversation"]
  },
  {
    id: "mathgpt",
    name: "MathGPT",
    description: "An AI math tutor that explains problems with step-by-step guidance.",
    category: "Education",
    pricing: "Freemium",
    url: "https://mathgpt.com/",
    icon: "mathgpt",
    tags: ["AI", "education", "math", "tutoring"]
  },
  {
    id: "photomath",
    name: "Photomath",
    description: "A math learning app that solves problems and explains the steps.",
    category: "Education",
    pricing: "Freemium",
    url: "https://photomath.com/",
    icon: "photomath",
    tags: ["AI", "education", "math", "tutoring"]
  }
];

export default toolsData;
