"use client";

import { useMemo, useState } from "react";

type Email = {
  id: number;
  sender: string;
  email: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  starred: boolean;
  category: "Primary" | "Updates" | "Social";
};

const initialEmails: Email[] = [
  {
    id: 1,
    sender: "Sarah Wilson",
    email: "sarah@example.com",
    subject: "Project update",
    preview: "Hey, just wanted to send you the latest update on the project...",
    time: "20:41",
    unread: true,
    starred: true,
    category: "Primary",
  },
  {
    id: 2,
    sender: "Alex Johnson",
    email: "alex@example.com",
    subject: "Your documents",
    preview: "I've attached the documents we talked about earlier.",
    time: "19:22",
    unread: true,
    starred: false,
    category: "Primary",
  },
  {
    id: 3,
    sender: "Mike Thompson",
    email: "mike@example.com",
    subject: "Welcome to the team",
    preview: "We're really happy to have you with us. Here's everything...",
    time: "17:05",
    unread: false,
    starred: false,
    category: "Updates",
  },
  {
    id: 4,
    sender: "Emma Davis",
    email: "emma@example.com",
    subject: "Dinner plans",
    preview: "Are we still on for dinner this Friday?",
    time: "15:32",
    unread: false,
    starred: true,
    category: "Primary",
  },
  {
    id: 5,
    sender: "YourMail Security",
    email: "security@yourmail.example",
    subject: "New sign-in detected",
    preview: "A new device has signed into your YourMail account.",
    time: "12:18",
    unread: true,
    starred: false,
    category: "Updates",
  },
];

export default function Home() {
  const [emails, setEmails] = useState(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  const unreadCount = emails.filter((email) => email.unread).length;

  const filteredEmails = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return emails;

    return emails.filter(
      (email) =>
        email.sender.toLowerCase().includes(query) ||
        email.subject.toLowerCase().includes(query) ||
        email.preview.toLowerCase().includes(query)
    );
  }, [emails, search]);

  function openEmail(email: Email) {
    setSelectedEmail(email);

    setEmails((current) =>
      current.map((item) =>
        item.id === email.id ? { ...item, unread: false } : item
      )
    );
  }

  function toggleStar(id: number) {
    setEmails((current) =>
      current.map((email) =>
        email.id === id
          ? { ...email, starred: !email.starred }
          : email
      )
    );
  }

  function deleteEmail(id: number) {
    setEmails((current) => current.filter((email) => email.id !== id));
    setSelectedEmail(null);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-slate-950 px-4 py-5 transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-black text-slate-950">
              Y
            </div>

            <div>
              <div className="font-semibold tracking-tight">YourMail</div>
              <div className="text-xs text-slate-500">Private email</div>
            </div>
          </div>

          <button
            className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
        </div>

        <button
          onClick={() => {
            setComposeOpen(true);
            setSidebarOpen(false);
          }}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          <span className="text-xl">+</span>
          Compose
        </button>

        <nav className="mt-6 space-y-1">
          <SidebarItem
            icon="⌂"
            label="Inbox"
            count={unreadCount}
            active
          />
          <SidebarItem icon="☆" label="Starred" />
          <SidebarItem icon="↗" label="Sent" />
          <SidebarItem icon="◷" label="Drafts" />
          <SidebarItem icon="▱" label="Archive" />
        </nav>

        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="px-3 text-xs font-semibold uppercase tracking-widest text-slate-600">
            Folders
          </div>

          <nav className="mt-3 space-y-1">
            <SidebarItem icon="!" label="Spam" />
            <SidebarItem icon="□" label="Trash" />
          </nav>
        </div>

        <div className="absolute bottom-5 left-4 right-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-white/5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 font-semibold">
              JD
            </div>

            <div className="min-w-0">
              <div className="truncate text-sm font-medium">John Doe</div>
              <div className="truncate text-xs text-slate-500">
                john@yourmail.example
              </div>
            </div>

            <span className="ml-auto text-slate-600">•••</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <section className="min-h-screen lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
            >
              ☰
            </button>

            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                ⌕
              </span>

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search mail"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm outline-none placeholder:text-slate-600 focus:border-white/20 focus:bg-white/[0.07]"
              />
            </div>

            <button
              title="Settings"
              className="hidden rounded-xl p-3 text-slate-400 hover:bg-white/5 hover:text-white sm:block"
            >
              ⚙
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold hover:bg-slate-700">
              JD
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          {/* Inbox heading */}
          <div className="mb-5 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">Inbox</h1>

                {unreadCount > 0 && (
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-950">
                    {unreadCount}
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Your messages are protected by YourMail.
              </p>
            </div>

            <button
              onClick={() => setEmails(initialEmails)}
              className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-white/5 hover:text-white"
            >
              ↻ Refresh
            </button>
          </div>

          {/* Security banner */}
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm text-slate-950">
              ✓
            </div>

            <div>
              <div className="text-sm font-medium">Private by design</div>
              <div className="text-xs text-slate-500">
                Encryption will be connected to this interface later.
              </div>
            </div>
          </div>

          {/* Email list */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="hidden border-b border-white/10 px-4 py-3 text-xs text-slate-600 sm:flex">
              <span className="w-10" />
              <span className="flex-1">MESSAGES</span>
              <span>DATE</span>
            </div>

            {filteredEmails.length === 0 ? (
              <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
                <div className="mb-3 text-4xl">⌕</div>
                <h2 className="font-semibold">No messages found</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Try a different search.
                </p>
              </div>
            ) : (
              filteredEmails.map((email) => (
                <div
                  key={email.id}
                  className={`group flex cursor-pointer items-center gap-3 border-b border-white/5 px-4 py-4 transition last:border-b-0 hover:bg-white/[0.04] ${
                    email.unread ? "bg-white/[0.025]" : ""
                  }`}
                  onClick={() => openEmail(email)}
                >
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleStar(email.id);
                    }}
                    className={`w-7 text-xl transition ${
                      email.starred
                        ? "text-white"
                        : "text-slate-700 hover:text-slate-400"
                    }`}
                  >
                    {email.starred ? "★" : "☆"}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`truncate text-sm ${
                          email.unread
                            ? "font-bold text-white"
                            : "font-medium text-slate-300"
                        }`}
                      >
                        {email.sender}
                      </span>

                      {email.unread && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </div>

                    <div
                      className={`truncate text-sm ${
                        email.unread
                          ? "font-semibold text-slate-200"
                          : "text-slate-400"
                      }`}
                    >
                      {email.subject}
                    </div>

                    <div className="truncate text-xs text-slate-600">
                      {email.preview}
                    </div>
                  </div>

                  <div className="hidden shrink-0 text-xs text-slate-500 sm:block">
                    {email.time}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Email viewer */}
      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <button
                onClick={() => setSelectedEmail(null)}
                className="rounded-lg px-3 py-2 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                ←
              </button>

              <div className="flex-1">
                <div className="font-semibold">{selectedEmail.subject}</div>
                <div className="text-xs text-slate-500">
                  {selectedEmail.sender}
                </div>
              </div>

              <button
                onClick={() => deleteEmail(selectedEmail.id)}
                className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-white/5 hover:text-white"
              >
                Delete
              </button>
            </div>

            <div className="overflow-y-auto p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 font-semibold">
                  {selectedEmail.sender
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>

                <div>
                  <div className="font-semibold">{selectedEmail.sender}</div>
                  <div className="text-sm text-slate-500">
                    {selectedEmail.email}
                  </div>
                </div>
              </div>

              <h2 className="mb-4 text-xl font-semibold">
                {selectedEmail.subject}
              </h2>

              <p className="max-w-2xl whitespace-pre-line leading-7 text-slate-300">
                {selectedEmail.preview}

                {"\n\n"}

                This is the message viewer. Later, the message body will be
                fetched from your Rust API and decrypted locally in the client.
              </p>
            </div>

            <div className="flex gap-3 border-t border-white/10 p-4">
              <button
                onClick={() => {
                  setSelectedEmail(null);
                  setComposeOpen(true);
                }}
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-200"
              >
                Reply
              </button>

              <button className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-slate-300 hover:bg-white/5">
                Forward
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compose */}
      {composeOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="font-semibold">New message</span>

            <button
              onClick={() => setComposeOpen(false)}
              className="rounded-lg px-2 py-1 text-slate-500 hover:bg-white/5 hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="space-y-1 border-b border-white/10 px-4">
            <input
              placeholder="To"
              className="w-full border-b border-white/5 bg-transparent py-3 text-sm outline-none placeholder:text-slate-600"
            />

            <input
              placeholder="Subject"
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-600"
            />
          </div>

          <textarea
            placeholder="Write a message..."
            className="h-56 w-full resize-none bg-transparent p-4 text-sm leading-6 outline-none placeholder:text-slate-600"
          />

          <div className="flex items-center justify-between border-t border-white/10 p-3">
            <button className="rounded-lg px-3 py-2 text-slate-500 hover:bg-white/5">
              📎
            </button>

            <button
              onClick={() => setComposeOpen(false)}
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-200"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function SidebarItem({
  icon,
  label,
  count,
  active = false,
}: {
  icon: string;
  label: string;
  count?: number;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
        active
          ? "bg-white/10 font-semibold text-white"
          : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
      }`}
    >
      <span className="w-5 text-center text-base">{icon}</span>
      <span>{label}</span>

      {count !== undefined && count > 0 && (
        <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-950">
          {count}
        </span>
      )}
    </button>
  );
}
