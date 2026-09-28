"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Archive,
  ChevronLeft,
  Clock3,
  FileText,
  Inbox,
  Menu,
  Paperclip,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Star,
  Trash2,
  X,
  Zap,
} from "lucide-react";

type Folder =
  | "Inbox"
  | "Starred"
  | "Sent"
  | "Drafts"
  | "Archive"
  | "Spam"
  | "Trash";

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
    preview:
      "Hey, just wanted to send you the latest update on the project...",
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
    preview:
      "We're really happy to have you with us. Here's everything...",
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
    preview:
      "A new device has signed into your YourMail account.",
    time: "12:18",
    unread: true,
    starred: false,
    category: "Updates",
  },
];

const folders: {
  label: Folder;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
  }>;
}[] = [
  { label: "Inbox", icon: Inbox },
  { label: "Starred", icon: Star },
  { label: "Sent", icon: Send },
  { label: "Drafts", icon: FileText },
  { label: "Archive", icon: Archive },
  { label: "Spam", icon: Zap },
  { label: "Trash", icon: Trash2 },
];

export default function Home() {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [activeFolder, setActiveFolder] =
    useState<Folder>("Inbox");

  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");

  const unreadCount = emails.filter(
    (email) => email.unread
  ).length;

  const filteredEmails = useMemo(() => {
    const query = search.toLowerCase().trim();

    let result = emails;

    if (activeFolder === "Starred") {
      result = result.filter((email) => email.starred);
    }

    if (query) {
      result = result.filter(
        (email) =>
          email.sender.toLowerCase().includes(query) ||
          email.email.toLowerCase().includes(query) ||
          email.subject.toLowerCase().includes(query) ||
          email.preview.toLowerCase().includes(query)
      );
    }

    return result;
  }, [emails, search, activeFolder]);

  function openEmail(email: Email) {
    setSelectedEmail(email);

    setEmails((current) =>
      current.map((item) =>
        item.id === email.id
          ? { ...item, unread: false }
          : item
      )
    );
  }

  function toggleStar(id: number) {
    setEmails((current) =>
      current.map((email) =>
        email.id === id
          ? {
              ...email,
              starred: !email.starred,
            }
          : email
      )
    );

    if (selectedEmail?.id === id) {
      setSelectedEmail((current) =>
        current
          ? {
              ...current,
              starred: !current.starred,
            }
          : null
      );
    }
  }

  function deleteEmail(id: number) {
    setEmails((current) =>
      current.filter((email) => email.id !== id)
    );

    setSelectedEmail(null);
  }

  function selectFolder(folder: Folder) {
    setActiveFolder(folder);
    setSidebarOpen(false);
    setSelectedEmail(null);
  }

  function closeCompose() {
    setComposeOpen(false);
    setComposeTo("");
    setComposeSubject("");
    setComposeBody("");
  }

  function sendMessage() {
    if (!composeTo.trim()) return;

    /*
     * Later:
     *
     * POST /api/messages
     *
     * Rust backend validates, encrypts, stores
     * and delivers the message.
     */

    closeCompose();
  }

  return (
    <main className="min-h-screen bg-[#f6f8fc] text-[#202124]">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r border-[#e8eaed] bg-white px-3 py-5 transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-3">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a73e8] text-lg font-bold text-white">
              Y
            </div>

            <div>
              <div className="font-semibold tracking-tight">
                YourMail
              </div>

              <div className="text-xs text-[#80868b]">
                Private email
              </div>
            </div>
          </Link>

          <button
            aria-label="Close menu"
            className="rounded-lg p-2 text-[#80868b] hover:bg-[#f1f3f4] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Compose */}
        <button
          onClick={() => {
            setComposeOpen(true);
            setSidebarOpen(false);
          }}
          className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#3c4043] shadow-[0_1px_3px_rgba(60,64,67,.3)] transition hover:bg-[#f8fafd] hover:shadow-[0_2px_6px_rgba(60,64,67,.2)]"
        >
          <Plus size={20} className="text-[#1a73e8]" />
          Compose
        </button>

        {/* Navigation */}
        <nav className="mt-6 space-y-1">
          {folders.slice(0, 5).map((folder) => {
            const Icon = folder.icon;
            const active =
              activeFolder === folder.label;

            return (
              <button
                key={folder.label}
                onClick={() =>
                  selectFolder(folder.label)
                }
                className={`flex h-10 w-full items-center gap-3 rounded-r-full px-4 text-left text-sm transition ${
                  active
                    ? "bg-[#e8f0fe] font-semibold text-[#174ea6]"
                    : "text-[#5f6368] hover:bg-[#f1f3f4]"
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={active ? 2.2 : 1.8}
                />

                <span>{folder.label}</span>

                {folder.label === "Inbox" &&
                  unreadCount > 0 && (
                    <span className="ml-auto text-xs font-semibold text-[#3c4043]">
                      {unreadCount}
                    </span>
                  )}
              </button>
            );
          })}
        </nav>

        {/* Folders */}
        <div className="mt-7 border-t border-[#e8eaed] pt-6">
          <div className="px-4 text-[11px] font-semibold uppercase tracking-wider text-[#80868b]">
            Folders
          </div>

          <nav className="mt-3 space-y-1">
            {folders.slice(5).map((folder) => {
              const Icon = folder.icon;
              const active =
                activeFolder === folder.label;

              return (
                <button
                  key={folder.label}
                  onClick={() =>
                    selectFolder(folder.label)
                  }
                  className={`flex h-10 w-full items-center gap-3 rounded-r-full px-4 text-left text-sm transition ${
                    active
                      ? "bg-[#e8f0fe] text-[#174ea6]"
                      : "text-[#5f6368] hover:bg-[#f1f3f4]"
                  }`}
                >
                  <Icon size={18} />
                  <span>{folder.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Security */}
        <div className="mt-auto">
          <div className="mb-3 rounded-xl bg-[#f8f9fa] p-3">
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={16}
                className="text-[#188038]"
              />

              <span className="text-xs font-medium text-[#3c4043]">
                Privacy protected
              </span>
            </div>

            <p className="mt-1 text-[11px] leading-4 text-[#80868b]">
              YourMail is designed around your privacy.
            </p>
          </div>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-[#f1f3f4]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f0fe] text-sm font-semibold text-[#174ea6]">
              JD
            </div>

            <div className="min-w-0">
              <div className="truncate text-sm font-medium">
                John Doe
              </div>

              <div className="truncate text-xs text-[#80868b]">
                john@yourmail.example
              </div>
            </div>

            <Settings
              size={17}
              className="ml-auto text-[#80868b]"
            />
          </button>
        </div>
      </aside>

      {/* Main */}
      <section className="min-h-screen lg:pl-[264px]">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-[#e8eaed] bg-[#f6f8fc]/95 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-[#5f6368] hover:bg-[#e8eaed] lg:hidden"
            >
              <Menu size={21} />
            </button>

            {/* Search */}
            <div className="relative max-w-2xl flex-1">
              <Search
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#5f6368]"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search mail"
                className="h-12 w-full rounded-full border border-transparent bg-[#e9eef6] py-3 pl-11 pr-4 text-sm text-[#202124] outline-none transition placeholder:text-[#5f6368] hover:bg-[#e4e9f1] focus:border-[#1a73e8] focus:bg-white focus:ring-2 focus:ring-[#1a73e8]/10"
              />
            </div>

            <button
              title="Settings"
              className="hidden rounded-full p-3 text-[#5f6368] hover:bg-[#e8eaed] hover:text-[#202124] sm:block"
            >
              <Settings size={19} />
            </button>

            <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a73e8] text-sm font-semibold text-white">
              JD
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6">
          {/* Toolbar */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-[#202124]">
                {activeFolder}
              </h1>

              {activeFolder === "Inbox" &&
                unreadCount > 0 && (
                  <span className="rounded-full bg-[#e8f0fe] px-2 py-0.5 text-xs font-semibold text-[#174ea6]">
                    {unreadCount} unread
                  </span>
                )}
            </div>

            <button
              onClick={() =>
                setEmails([...initialEmails])
              }
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#5f6368] hover:bg-[#e8eaed]"
            >
              <RefreshCw size={16} />

              <span className="hidden sm:inline">
                Refresh
              </span>
            </button>
          </div>

          {/* Security banner */}
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-[#d2e3fc] bg-[#f8fbff] px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f0fe] text-[#1a73e8]">
              <ShieldCheck size={18} />
            </div>

            <div>
              <div className="text-sm font-medium text-[#3c4043]">
                Privacy-first email
              </div>

              <div className="text-xs text-[#5f6368]">
                YourMail is designed to keep your mailbox
                private and secure.
              </div>
            </div>

            <button className="ml-auto hidden text-xs font-medium text-[#1a73e8] hover:underline sm:block">
              Learn more
            </button>
          </div>

          {/* Mailbox */}
          <div className="overflow-hidden rounded-xl border border-[#e8eaed] bg-white shadow-[0_1px_2px_rgba(60,64,67,.08)]">
            {/* Mail toolbar */}
            <div className="flex h-12 items-center gap-1 border-b border-[#e8eaed] px-3">
              <button className="rounded-lg p-2 text-[#5f6368] hover:bg-[#f1f3f4]">
                <input
                  aria-label="Select all"
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#dadce0]"
                />
              </button>

              <button className="rounded-lg p-2 text-[#5f6368] hover:bg-[#f1f3f4]">
                <Archive size={17} />
              </button>

              <button className="rounded-lg p-2 text-[#5f6368] hover:bg-[#f1f3f4]">
                <Trash2 size={17} />
              </button>

              <div className="mx-2 h-5 w-px bg-[#e8eaed]" />

              <button className="rounded-lg p-2 text-[#5f6368] hover:bg-[#f1f3f4]">
                <Clock3 size={17} />
              </button>
            </div>

            {/* Categories */}
            {activeFolder === "Inbox" && (
              <div className="flex border-b border-[#e8eaed]">
                <button className="flex-1 border-b-2 border-[#1a73e8] px-5 py-3 text-left text-sm font-semibold text-[#1a73e8]">
                  Primary
                </button>

                <button className="hidden flex-1 px-5 py-3 text-left text-sm text-[#5f6368] hover:bg-[#f8f9fa] sm:block">
                  Updates
                </button>

                <button className="hidden flex-1 px-5 py-3 text-left text-sm text-[#5f6368] hover:bg-[#f8f9fa] sm:block">
                  Social
                </button>
              </div>
            )}

            {/* Email list */}
            {filteredEmails.length === 0 ? (
              <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f1f3f4]">
                  <Search
                    size={25}
                    className="text-[#80868b]"
                  />
                </div>

                <h2 className="font-semibold text-[#3c4043]">
                  No messages found
                </h2>

                <p className="mt-1 text-sm text-[#80868b]">
                  Try a different search or folder.
                </p>
              </div>
            ) : (
              filteredEmails.map((email) => (
                <div
                  key={email.id}
                  className={`group flex cursor-pointer items-center gap-3 border-b border-[#f1f3f4] px-4 py-3 transition last:border-b-0 hover:z-10 hover:shadow-[0_1px_4px_rgba(60,64,67,.18)] ${
                    email.unread
                      ? "bg-white"
                      : "bg-[#fafafa]"
                  }`}
                  onClick={() => openEmail(email)}
                >
                  {/* Star */}
                  <button
                    aria-label={
                      email.starred
                        ? "Unstar email"
                        : "Star email"
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleStar(email.id);
                    }}
                    className={`shrink-0 rounded-full p-1 ${
                      email.starred
                        ? "text-[#fbbc04]"
                        : "text-[#9aa0a6] hover:bg-[#f1f3f4]"
                    }`}
                  >
                    <Star
                      size={18}
                      fill={
                        email.starred
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>

                  {/* Sender */}
                  <div className="w-[150px] shrink-0 sm:w-[190px]">
                    <span
                      className={`block truncate text-sm ${
                        email.unread
                          ? "font-semibold text-[#202124]"
                          : "text-[#3c4043]"
                      }`}
                    >
                      {email.sender}
                    </span>
                  </div>

                  {/* Subject */}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm">
                      <span
                        className={
                          email.unread
                            ? "font-semibold text-[#202124]"
                            : "text-[#3c4043]"
                        }
                      >
                        {email.subject}
                      </span>

                      <span className="text-[#80868b]">
                        {" "}
                        — {email.preview}
                      </span>
                    </div>
                  </div>

                  {/* Time */}
                  <div
                    className={`hidden shrink-0 text-xs sm:block ${
                      email.unread
                        ? "font-semibold text-[#202124]"
                        : "text-[#5f6368]"
                    }`}
                  >
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-[#e8eaed] px-5 py-4">
              <button
                onClick={() => setSelectedEmail(null)}
                className="rounded-full p-2 text-[#5f6368] hover:bg-[#f1f3f4]"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold text-[#202124]">
                  {selectedEmail.subject}
                </div>

                <div className="text-xs text-[#80868b]">
                  {selectedEmail.sender}
                </div>
              </div>

              <button
                onClick={() =>
                  deleteEmail(selectedEmail.id)
                }
                className="rounded-full p-2 text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#d93025]"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f0fe] font-semibold text-[#174ea6]">
                  {selectedEmail.sender
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>

                <div>
                  <div className="font-semibold text-[#202124]">
                    {selectedEmail.sender}
                  </div>

                  <div className="text-sm text-[#80868b]">
                    {selectedEmail.email}
                  </div>
                </div>
              </div>

              <h2 className="mb-5 text-xl font-semibold text-[#202124]">
                {selectedEmail.subject}
              </h2>

              <p className="max-w-2xl whitespace-pre-line text-[15px] leading-7 text-[#3c4043]">
                {selectedEmail.preview}

                {"\n\n"}

                This is currently demo content. The real
                message body will later come from your Rust
                API.
              </p>
            </div>

            <div className="flex gap-3 border-t border-[#e8eaed] p-4">
              <button
                onClick={() => {
                  setSelectedEmail(null);
                  setComposeOpen(true);
                  setComposeTo(selectedEmail.email);
                  setComposeSubject(
                    `Re: ${selectedEmail.subject}`
                  );
                }}
                className="rounded-full bg-[#1a73e8] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1765cc]"
              >
                Reply
              </button>

              <button className="rounded-full border border-[#dadce0] px-5 py-2.5 text-sm font-medium text-[#3c4043] hover:bg-[#f8f9fa]">
                Forward
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compose */}
      {composeOpen && (
        <div className="fixed bottom-0 right-4 z-50 w-[calc(100%-2rem)] max-w-[560px] overflow-hidden rounded-t-2xl border border-[#dadce0] bg-white shadow-[0_8px_30px_rgba(60,64,67,.25)] sm:bottom-4 sm:rounded-2xl">
          {/* Compose header */}
          <div className="flex items-center justify-between bg-[#f2f6fc] px-4 py-3">
            <span className="text-sm font-semibold text-[#202124]">
              New message
            </span>

            <button
              onClick={closeCompose}
              className="rounded-full p-1.5 text-[#5f6368] hover:bg-[#e4e8ee]"
            >
              <X size={17} />
            </button>
          </div>

          {/* Fields */}
          <div className="px-4">
            <input
              value={composeTo}
              onChange={(event) =>
                setComposeTo(event.target.value)
              }
              placeholder="Recipients"
              type="email"
              className="h-11 w-full border-b border-[#e8eaed] bg-transparent text-sm text-[#202124] outline-none placeholder:text-[#80868b]"
            />

            <input
              value={composeSubject}
              onChange={(event) =>
                setComposeSubject(event.target.value)
              }
              placeholder="Subject"
              className="h-11 w-full border-b border-[#e8eaed] bg-transparent text-sm text-[#202124] outline-none placeholder:text-[#80868b]"
            />
          </div>

          <textarea
            value={composeBody}
            onChange={(event) =>
              setComposeBody(event.target.value)
            }
            placeholder="Write a message..."
            className="h-56 w-full resize-none bg-transparent p-4 text-sm leading-6 text-[#202124] outline-none placeholder:text-[#80868b]"
          />

          {/* Compose footer */}
          <div className="flex items-center justify-between border-t border-[#e8eaed] p-3">
            <button
              className="rounded-full p-2 text-[#5f6368] hover:bg-[#f1f3f4]"
              title="Attach file"
            >
              <Paperclip size={18} />
            </button>

            <button
              onClick={sendMessage}
              disabled={!composeTo.trim()}
              className="flex items-center gap-2 rounded-full bg-[#1a73e8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1765cc] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={16} />
              Send
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
