"use client";

import { useCallback, useEffect, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  resolved: boolean;
};

export function MessagesPanel({
  senderName,
  acceptingMessages,
  setAcceptingMessages,
}: {
  senderName: string;
  acceptingMessages: boolean;
  setAcceptingMessages: (value: boolean) => Promise<boolean>;
}) {
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [reply, setReply] = useState<{ id: string; subject: string; body: string } | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");
  const [updatingInbox, setUpdatingInbox] = useState(false);

  const refresh = useCallback(() => setReload((value) => value + 1), []);

  async function toggleInbox() {
    if (updatingInbox) return;
    setActionError("");
    setUpdatingInbox(true);
    try {
      if (!await setAcceptingMessages(!acceptingMessages)) {
        setActionError("Unable to update message availability. Please try again.");
      }
    } catch {
      setActionError("Unable to update message availability. Please try again.");
    } finally {
      setUpdatingInbox(false);
    }
  }

  function prepareReply(item: Message) {
    const subject = item.subject.trim()
      ? (/^re:/i.test(item.subject.trim()) ? item.subject.trim() : `Re: ${item.subject.trim()}`)
      : "Re: Your portfolio message";
    setReply({
      id: item.id,
      subject,
      body: `Hi ${item.name.trim()},\n\nThank you for reaching out.\n\n[Write your reply here]\n\nBest,\n${senderName}`,
    });
  }

  async function updateMessage(item: Message, action: "resolve" | "delete") {
    if (busy) return;
    if (action === "delete" && !window.confirm("Permanently delete this message? This cannot be undone.")) return;
    setBusy(item.id);
    setActionError("");
    try {
      const response = await fetch(`/api/admin/messages/${encodeURIComponent(item.id)}`, action === "delete"
        ? { method: "DELETE" }
        : { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ resolved: !item.resolved }) });
      if (!response.ok) throw new Error(response.status === 401 ? "Your session has expired. Please sign in again." : "Unable to update the message. Please try again.");
      if (action === "delete") {
        if (reply?.id === item.id) setReply(null);
        if (messages.length === 1 && page > 1) setPage((value) => value - 1);
        else refresh();
      } else {
        setMessages((current) => current.map((message) => message.id === item.id ? { ...message, resolved: !item.resolved } : message));
      }
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Unable to update the message.");
    } finally {
      setBusy(null);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/admin/messages?page=${page}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(response.status === 401 ? "Your session has expired. Please sign in again." : "Unable to load messages. Please try again.");
        const result: { messages: Message[]; hasMore: boolean } = await response.json();
        setMessages(result.messages);
        setHasMore(result.hasMore);
      } catch (err) {
        if (!controller.signal.aborted) {
          setMessages([]);
          setHasMore(false);
          setError(err instanceof Error ? err.message : "Unable to load messages.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [page, reload]);

  return (
    <section className="rounded-2xl border border-card-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Messages</h2>
          <p className="mt-1 text-sm text-muted-foreground">Contact form submissions, newest first.</p>
        </div>
        <button type="button" onClick={refresh} disabled={loading || busy !== null}
          className="rounded-xl border border-card-border px-4 py-2 text-sm font-medium text-foreground hover:border-primary disabled:opacity-50">
          Refresh
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-card-border bg-background/50 p-4">
        <div>
          <p className="text-sm font-medium text-foreground">
            Message form: {acceptingMessages ? "Open" : "Closed"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {acceptingMessages ? "Visitors can send messages." : "The form is hidden until you reopen it."}
          </p>
        </div>
        <button type="button" onClick={() => void toggleInbox()} disabled={updatingInbox}
          className="rounded-xl border border-primary/40 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 disabled:opacity-50">
          {updatingInbox ? "Updating…" : acceptingMessages ? "Close messages" : "Open messages"}
        </button>
      </div>

      {actionError && <p role="alert" className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">{actionError}</p>}
      {loading ? (
        <p role="status" className="py-10 text-sm text-muted-foreground">Loading messages…</p>
      ) : error ? (
        <p role="alert" className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : messages.length === 0 ? (
        <p className="py-10 text-sm text-muted-foreground">No messages on this page.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {messages.map((item) => (
            <li key={item.id} className="rounded-xl border border-card-border bg-background/50 p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="break-words font-semibold text-foreground">{item.name}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${item.resolved ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                      {item.resolved ? "Resolved" : "Open"}
                    </span>
                  </div>
                  <a href={`mailto:${encodeURIComponent(item.email)}`} className="mt-1 block break-all text-sm text-primary hover:underline">{item.email}</a>
                </div>
                <time dateTime={item.createdAt} className="text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleString()}
                </time>
              </div>
              {item.subject && <p className="mt-4 text-sm font-medium text-foreground">{item.subject}</p>}
              <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">{item.message}</p>
              <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={() => reply?.id === item.id ? setReply(null) : prepareReply(item)}
                aria-expanded={reply?.id === item.id}
                className="rounded-lg border border-primary/40 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10">
                {reply?.id === item.id ? "Close reply" : "Reply with Gmail"}
              </button>
              <button type="button" disabled={busy !== null} onClick={() => void updateMessage(item, "resolve")}
                className="rounded-lg border border-card-border px-4 py-2 text-sm font-medium text-foreground hover:border-primary disabled:opacity-50">
                {busy === item.id ? "Updating…" : item.resolved ? "Mark as open" : "Mark as resolved"}
              </button>
              <button type="button" disabled={busy !== null} onClick={() => void updateMessage(item, "delete")}
                className="rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-500/10 disabled:opacity-50 dark:text-red-400">
                Delete
              </button>
              </div>
              {reply?.id === item.id && (
                <div className="mt-4 space-y-4 border-t border-card-border pt-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Reply assistant</p>
                    <p className="mt-1 text-xs text-muted-foreground">Edit this template, then review and send it in Gmail. No external AI is used.</p>
                  </div>
                  <div>
                    <label htmlFor={`reply-subject-${item.id}`} className="mb-1.5 block text-sm font-medium text-foreground">Subject</label>
                    <input id={`reply-subject-${item.id}`} value={reply.subject}
                      onChange={(event) => setReply({ ...reply, subject: event.target.value })}
                      className="field" />
                  </div>
                  <div>
                    <label htmlFor={`reply-body-${item.id}`} className="mb-1.5 block text-sm font-medium text-foreground">Reply</label>
                    <textarea id={`reply-body-${item.id}`} rows={7} value={reply.body}
                      onChange={(event) => setReply({ ...reply, body: event.target.value })}
                      className="field resize-y" />
                  </div>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(item.email)}&su=${encodeURIComponent(reply.subject)}&body=${encodeURIComponent(reply.body)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary">
                    Open Gmail draft <span aria-hidden="true">↗</span>
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && (page > 1 || hasMore) && (
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-card-border pt-4">
          <button type="button" disabled={page === 1} onClick={() => { setReply(null); setPage((value) => value - 1); }}
            className="rounded-lg border border-card-border px-4 py-2 text-sm disabled:opacity-40">Previous</button>
          <span className="text-sm text-muted-foreground">Page {page}</span>
          <button type="button" disabled={!hasMore} onClick={() => { setReply(null); setPage((value) => value + 1); }}
            className="rounded-lg border border-card-border px-4 py-2 text-sm disabled:opacity-40">Next</button>
        </div>
      )}
    </section>
  );
}
