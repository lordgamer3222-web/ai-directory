import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  Check,
  ImagePlus,
  LogOut,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import ToolLogo from "../components/ToolLogo";
import "./admin.css";
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "https://ai-directory-mhje.onrender.com"
).replace(/\/+$/, "");
const emptyForm = {
  id: "",
  name: "",
  description: "",
  category: "Assistant",
  pricing: "Freemium",
  url: "",
  tags: "",
  icon: "",
};

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read this image."));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

function safeOfficialUrl(value) {
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

function AdminLogin({ onLogin, busy, error }) {
  const [token, setToken] = useState("");
  return (
    <main className="admin-login-page">
      <form
        className="admin-login-card"
        onSubmit={(event) => onLogin(event, token)}
      >
        <span className="admin-brand-mark">
          <ShieldCheck size={25} />
        </span>
        <p className="admin-eyebrow">AI LIBRARY · ADMIN</p>
        <h1>Sign in to manage your directory</h1>
        <p className="admin-muted">
          Use the admin token configured on your server.
        </p>
        <label>
          Admin token
          <input
            autoComplete="current-password"
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            required
          />
        </label>
        {error && (
          <p className="admin-error" role="alert">
            {error}
          </p>
        )}
        <button
          className="admin-primary-button"
          disabled={busy || !token.trim()}
        >
          {busy ? "Checking…" : "Continue"}
        </button>
        <a href="/" className="admin-back-link">
          Back to AI Library
        </a>
      </form>
    </main>
  );
}

export default function AdminApp() {
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [tools, setTools] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("tools");
  const [editingId, setEditingId] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [iconUpload, setIconUpload] = useState(null);
  const [iconPreview, setIconPreview] = useState("");
  const [notice, setNotice] = useState("");
  const [formError, setFormError] = useState("");

  async function api(path, options = {}, authToken = token) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...options.headers,
      },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401) {
        setAuthenticated(false);
      }
      throw new Error(data.error || "The request could not be completed.");
    }
    return data;
  }

  async function loadDashboard(authToken = token) {
    const [toolRows, suggestionRows] = await Promise.all([
      api("/api/admin/tools", {}, authToken),
      api("/api/admin/submissions", {}, authToken),
    ]);
    setTools(toolRows);
    setSubmissions(suggestionRows);
  }

  async function signIn(event, value) {
    event.preventDefault();
    setBusy(true);
    setLoginError("");
    try {
      const result = await api(
        "/api/admin/session",
        {
          method: "POST",
          body: JSON.stringify({ token: value }),
        },
        "",
      );
      if (!result.ok) throw new Error("Admin sign-in failed.");
      setToken(value);
      setAuthenticated(true);
      try {
        await loadDashboard(value);
      } catch (error) {
        setNotice(error.message);
      }
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    setToken("");
    setAuthenticated(false);
    setTools([]);
    setSubmissions([]);
  }

  const filteredTools = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return tools;
    return tools.filter((tool) =>
      `${tool.id} ${tool.name} ${tool.category} ${tool.pricing} ${(tool.tags || []).join(" ")}`
        .toLowerCase()
        .includes(term),
    );
  }, [tools, search]);
  const categories = useMemo(
    () => new Set(tools.map((tool) => tool.category)).size,
    [tools],
  );

  function beginAdd() {
    setEditingId("");
    setForm(emptyForm);
    setIconUpload(null);
    setIconPreview("");
    setFormError("");
    document
      .getElementById("admin-tool-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function beginEdit(tool) {
    setEditingId(tool.id);
    setForm({
      id: tool.id || "",
      name: tool.name || "",
      description: tool.description || "",
      category: tool.category || "Assistant",
      pricing: tool.pricing || "Freemium",
      url: tool.url || "",
      tags: (tool.tags || []).join(", "),
      icon:
        typeof tool.icon === "string" &&
        /^\/uploads\/tool-icons\/[0-9a-f-]{36}\.(?:png|jpg|webp)$/i.test(
          tool.icon,
        )
          ? tool.icon
          : "",
    });
    setIconUpload(null);
    setIconPreview("");
    setFormError("");
    document
      .getElementById("admin-tool-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function chooseIcon(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (
      !/^image\/(png|jpeg|webp)$/.test(file.type) ||
      file.size > 2 * 1024 * 1024
    ) {
      setFormError("Choose a PNG, JPEG, or WebP image up to 2 MB.");
      event.target.value = "";
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setIconUpload({ fileName: file.name, dataUrl });
      setIconPreview(dataUrl);
      setForm((current) => ({ ...current, icon: "" }));
      setFormError("");
    } catch (error) {
      setFormError(error.message);
    }
  }

  async function saveTool(event) {
    event.preventDefault();
    setBusy(true);
    setFormError("");
    setNotice("");
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      ...(iconUpload ? { iconUpload } : {}),
    };
    try {
      const isEditing = Boolean(editingId);
      const result = await api(
        isEditing
          ? `/api/admin/tools/${encodeURIComponent(editingId)}`
          : "/api/admin/tools",
        { method: isEditing ? "PATCH" : "POST", body: JSON.stringify(payload) },
      );
      setTools((rows) =>
        isEditing
          ? rows.map((tool) => (tool.id === editingId ? result : tool))
          : [...rows, result].sort((a, b) => a.name.localeCompare(b.name)),
      );
      setNotice(isEditing ? "Tool updated." : "Tool added to the directory.");
      setEditingId("");
      setForm(emptyForm);
      setIconUpload(null);
      setIconPreview("");
    } catch (error) {
      setFormError(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function deleteTool(tool) {
    if (!window.confirm(`Delete ${tool.name} from the directory?`)) return;
    try {
      await api(`/api/admin/tools/${encodeURIComponent(tool.id)}`, {
        method: "DELETE",
      });
      setTools((rows) => rows.filter((row) => row.id !== tool.id));
      if (editingId === tool.id) beginAdd();
      setNotice(`${tool.name} was deleted.`);
    } catch (error) {
      setNotice(error.message);
    }
  }

  async function approveSubmission(submission) {
    try {
      const result = await api(
        `/api/admin/submissions/${submission._id}/approve`,
        { method: "POST" },
      );
      setTools((rows) =>
        [...rows, result.tool].sort((a, b) => a.name.localeCompare(b.name)),
      );
      setSubmissions((rows) =>
        rows.filter((row) => row._id !== submission._id),
      );
      setNotice(`${submission.name} was added to the directory.`);
    } catch (error) {
      setNotice(error.message);
    }
  }

  async function dismissSubmission(submission) {
    try {
      await api(`/api/admin/submissions/${submission._id}`, {
        method: "DELETE",
      });
      setSubmissions((rows) =>
        rows.filter((row) => row._id !== submission._id),
      );
    } catch (error) {
      setNotice(error.message);
    }
  }

  if (!authenticated)
    return <AdminLogin onLogin={signIn} busy={busy} error={loginError} />;

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <a className="admin-wordmark" href="/">
          AI <b>Library</b>
          <span>Admin</span>
        </a>
        <div className="admin-topbar-actions">
          <a href="/" className="admin-back-link">
            View directory
          </a>
          <button className="admin-logout" onClick={logout}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <section className="admin-content">
        <div className="admin-heading-row">
          <div>
            <p className="admin-eyebrow">DIRECTORY CONTROL</p>
            <h1>Manage AI tools</h1>
            <p className="admin-muted">
              Keep the catalog current and review community suggestions.
            </p>
          </div>
          <button
            className="admin-primary-button add-tool-button"
            onClick={beginAdd}
          >
            <Plus size={17} /> Add tool
          </button>
        </div>

        <div className="admin-stats">
          <article>
            <span>Catalog tools</span>
            <strong>{tools.length}</strong>
          </article>
          <article>
            <span>Categories</span>
            <strong>{categories}</strong>
          </article>
          <article>
            <span>Pending suggestions</span>
            <strong>{submissions.length}</strong>
          </article>
        </div>

        {notice && (
          <p className="admin-notice" role="status">
            {notice}
            <button onClick={() => setNotice("")} aria-label="Dismiss message">
              <X size={15} />
            </button>
          </p>
        )}

        <div className="admin-section-tabs">
          <button
            className={activeSection === "tools" ? "active" : ""}
            onClick={() => setActiveSection("tools")}
          >
            AI tools <span>{tools.length}</span>
          </button>
          <button
            className={activeSection === "submissions" ? "active" : ""}
            onClick={() => setActiveSection("submissions")}
          >
            Suggestions <span>{submissions.length}</span>
          </button>
        </div>

        {activeSection === "tools" ? (
          <section className="admin-table-card">
            <div className="admin-table-toolbar">
              <div>
                <h2>All tools</h2>
                <p>{filteredTools.length} entries</p>
              </div>
              <label className="admin-search">
                <Search size={17} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search tools"
                />
              </label>
            </div>
            <div className="admin-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Tool</th>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Pricing</th>
                    <th>Official URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTools.map((tool) => (
                    <tr key={tool._id || tool.id}>
                      <td>
                        <div className="admin-tool-cell">
                          <ToolLogo tool={tool} size={38} />
                          <span>
                            <b>{tool.name}</b>
                            <small>{tool.description}</small>
                          </span>
                        </div>
                      </td>
                      <td>
                        <code>{tool.id}</code>
                      </td>
                      <td>{tool.category}</td>
                      <td>
                        <span className="admin-price-pill">{tool.pricing}</span>
                      </td>
                      <td>
                        {safeOfficialUrl(tool.url) ? (
                          <a
                            className="admin-url"
                            href={safeOfficialUrl(tool.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {tool.url}
                          </a>
                        ) : (
                          <span className="admin-muted">Missing URL</span>
                        )}
                      </td>
                      <td>
                        <div className="admin-row-actions">
                          <button
                            aria-label={`Edit ${tool.name}`}
                            onClick={() => beginEdit(tool)}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            aria-label={`Delete ${tool.name}`}
                            onClick={() => deleteTool(tool)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredTools.length === 0 && (
                <p className="admin-empty">No matching tools.</p>
              )}
            </div>
          </section>
        ) : (
          <section className="admin-submissions-card">
            <div className="admin-table-toolbar">
              <div>
                <h2>Community suggestions</h2>
                <p>Suggestions are published only after approval.</p>
              </div>
            </div>
            {submissions.length ? (
              submissions.map((submission) => (
                <article className="admin-submission-row" key={submission._id}>
                  <div>
                    <b>{submission.name}</b>
                    <span>
                      {submission.category} · {submission.pricing}
                    </span>
                    <p>{submission.description}</p>
                    {safeOfficialUrl(submission.url) && (
                      <a
                        href={safeOfficialUrl(submission.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {submission.url}
                      </a>
                    )}
                  </div>
                  <div className="admin-row-actions">
                    <button
                      className="approve-button"
                      onClick={() => approveSubmission(submission)}
                    >
                      <Check size={15} /> Approve
                    </button>
                    <button
                      aria-label={`Remove ${submission.name} suggestion`}
                      onClick={() => dismissSubmission(submission)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className="admin-empty">There are no pending suggestions.</p>
            )}
          </section>
        )}

        <section className="admin-form-card" id="admin-tool-form">
          <div className="admin-form-heading">
            <div>
              <p className="admin-eyebrow">
                {editingId ? "EDIT CATALOG ENTRY" : "NEW CATALOG ENTRY"}
              </p>
              <h2>{editingId ? `Edit ${form.name}` : "Add an AI tool"}</h2>
            </div>
            {editingId && (
              <button className="admin-cancel-edit" onClick={beginAdd}>
                Cancel edit
              </button>
            )}
          </div>
          <form onSubmit={saveTool} className="admin-tool-form">
            <label>
              Tool ID
              <input
                value={form.id}
                onChange={(event) =>
                  setForm({ ...form, id: event.target.value })
                }
                placeholder="e.g. example-ai"
                required
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                maxLength={120}
              />
            </label>
            <label>
              Tool name
              <input
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="Example AI"
                required
                maxLength={120}
              />
            </label>
            <label>
              Category
              <input
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
                placeholder="Writing, Coding, Research…"
                required
                maxLength={80}
              />
            </label>
            <label>
              Pricing
              <select
                value={form.pricing}
                onChange={(event) =>
                  setForm({ ...form, pricing: event.target.value })
                }
              >
                <option>Free</option>
                <option>Freemium</option>
                <option>Paid</option>
                <option>Open Source</option>
              </select>
            </label>
            <label className="admin-wide-field">
              Official website URL
              <input
                type="url"
                value={form.url}
                onChange={(event) =>
                  setForm({ ...form, url: event.target.value })
                }
                placeholder="https://example.com"
                required
                maxLength={2048}
              />
            </label>
            <label className="admin-wide-field">
              Description
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                rows={3}
                required
                maxLength={2000}
                placeholder="Describe what the tool does."
              />
            </label>
            <label className="admin-wide-field">
              Tags
              <span className="admin-field-hint">
                Separate tags with commas.
              </span>
              <input
                value={form.tags}
                onChange={(event) =>
                  setForm({ ...form, tags: event.target.value })
                }
                placeholder="writing, research, productivity"
              />
            </label>
            <div className="admin-icon-field admin-wide-field">
              <div>
                <span>Tool icon</span>
                <small>
                  Automatic favicon from the official domain is used unless you
                  upload a custom icon.
                </small>
              </div>
              <div className="admin-icon-controls">
                {iconPreview ? (
                  <img src={iconPreview} alt="Selected custom icon preview" />
                ) : (
                  <ToolLogo tool={form} size={48} />
                )}
                <label className="admin-upload-button">
                  <ImagePlus size={16} /> Upload icon
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={chooseIcon}
                  />
                </label>
                {(form.icon || iconUpload) && (
                  <button
                    type="button"
                    className="admin-remove-icon"
                    onClick={() => {
                      setForm({ ...form, icon: "" });
                      setIconUpload(null);
                      setIconPreview("");
                    }}
                  >
                    Use automatic icon
                  </button>
                )}
                <span className="admin-file-hint">
                  PNG, JPEG or WebP · up to 2 MB
                </span>
              </div>
            </div>
            {formError && (
              <p className="admin-error admin-wide-field" role="alert">
                {formError}
              </p>
            )}
            <div className="admin-form-actions admin-wide-field">
              <button className="admin-primary-button" disabled={busy}>
                {busy ? "Saving…" : editingId ? "Save changes" : "Add tool"}
              </button>
              {!editingId && (
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={beginAdd}
                >
                  Clear form
                </button>
              )}
            </div>
          </form>
        </section>
        <p className="admin-storage-note">
          <ArrowDownToLine size={15} /> Uploaded icons are stored on the server.
          Configure a persistent upload volume for deployments with ephemeral
          disks.
        </p>
      </section>
    </main>
  );
}
