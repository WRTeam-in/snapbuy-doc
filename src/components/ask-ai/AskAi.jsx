import React, { useState, useRef, useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./AskAi.module.css";

const SUGGESTIONS = [
  "How do I set up Firebase?",
  "How to add a payment gateway?",
  "How do I change the app logo?",
];

export default function AskAi() {
  const { siteConfig } = useDocusaurusContext();
  const apiUrl = siteConfig.customFields?.aiApiUrl;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null); // { answer, sources }
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function ask(q) {
    const question = (q ?? query).trim();
    if (!question || loading) return;
    setQuery(question);
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setResult(data);
    } catch (e) {
      const message =
        e?.message?.includes("Failed to fetch") ||
        e?.message?.includes("Request failed")
          ? "The AI assistant backend is unreachable. Start the local API server or set AI_API_URL to the correct endpoint."
          : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className={styles.fab}
        onClick={() => setOpen(true)}
        aria-label="Ask AI"
        title="Ask the Snapbuy AI assistant"
      >
        <span className={styles.fabIcon}>✨</span>
        <span className={styles.fabText}>Ask AI</span>
      </button>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div
            className={styles.panel}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Snapbuy AI assistant"
          >
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <span className={styles.headerIcon}>✨</span>
                Snapbuy AI Assistant
              </div>
              <button
                className={styles.close}
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form
              className={styles.searchRow}
              onSubmit={(e) => {
                e.preventDefault();
                ask();
              }}
            >
              <input
                ref={inputRef}
                className={styles.input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything about Snapbuy docs…"
                maxLength={1000}
              />
              <button
                className={styles.send}
                type="submit"
                disabled={loading || !query.trim()}
              >
                {loading ? "…" : "Ask"}
              </button>
            </form>

            <div className={styles.body}>
              {!result && !loading && !error && (
                <div className={styles.suggestions}>
                  <p className={styles.suggestLabel}>Try asking:</p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      className={styles.chip}
                      onClick={() => ask(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className={styles.loading}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span>Searching the docs…</span>
                </div>
              )}

              {error && <div className={styles.error}>{error}</div>}

              {result && (
                <div className={styles.answer}>
                  <div className={styles.answerText}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, ...props }) => (
                          <a target="_blank" rel="noopener noreferrer" {...props} />
                        ),
                      }}
                    >
                      {result.answer}
                    </ReactMarkdown>
                  </div>
                  {result.sources?.length > 0 && (
                    <div className={styles.sources}>
                      <p className={styles.sourcesLabel}>Sources</p>
                      {result.sources.map((s) => (
                        <a
                          key={s.url}
                          className={styles.source}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className={styles.sourceCheck}>✓</span>
                          <span>
                            {s.title}
                            {s.heading && s.heading !== s.title
                              ? ` — ${s.heading}`
                              : ""}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={styles.footer}>
              AI answers may be imperfect — verify with the linked docs.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
