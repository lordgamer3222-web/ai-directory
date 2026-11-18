const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const timeout = Number(process.env.AI_TIMEOUT_MS || 12000);

const SYSTEM_PROMPT =
  "You are Ask Me, a natural and helpful conversational assistant for AI Library. " +
  "Answer the user's actual question directly and use the language requested in the prompt. " +
  "Return valid JSON with this structure: " +
  '{"answer":"A helpful response","recommendations":[{"id":"tool_id","reason":"Why it matches"}]}. ' +
  "Use only tool IDs provided in the user's prompt. Recommend tools only when relevant. " +
  "If the question is general or no tools are relevant, return an empty recommendations array.";

function parseAIResponse(text) {
  try {
    const parsed = JSON.parse(text);

    if (
      typeof parsed.answer !== "string" ||
      !Array.isArray(parsed.recommendations)
    ) {
      throw new Error("Invalid AI response structure");
    }

    return parsed;
  } catch {
    throw new Error("AI returned invalid JSON");
  }
}

async function callGroq(prompt) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Groq key not configured");
  }

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    signal: AbortSignal.timeout(timeout),
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq HTTP ${response.status}: ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) throw new Error("Empty Groq response");

  return {
    ...parseAIResponse(content),
    provider: "groq",
    model: data.model,
  };
}

async function callGemini(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini key not configured");
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent` +
    `?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(timeout),
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        maxOutputTokens: 1000,
        temperature: 0.4,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini HTTP ${response.status}: ${error}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();

  if (!content) throw new Error("Empty Gemini response");

  return {
    ...parseAIResponse(content),
    provider: "gemini",
    model,
  };
}

export async function generateAIResponse(prompt) {
  try {
    const result = await callGroq(prompt);
    console.log("AI provider used: Groq");
    return result;
  } catch (groqError) {
    console.warn("Groq failed; trying Gemini:", groqError.message);
  }

  try {
    const result = await callGemini(prompt);
    console.log("AI provider used: Gemini fallback");
    return result;
  } catch (geminiError) {
    console.error("Both AI providers failed:", geminiError.message);
    throw new Error("AI services temporarily unavailable");
  }
}
