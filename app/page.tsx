"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  ChevronLeft,
  Clock3,
  FileText,
  Inbox,
  Menu,
  MoreHorizontal,
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
  body: string;
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
    body:
      "Hey John,\n\nJust wanted to send you the latest update on the project. Everything is moving along nicely and we're still on track for Friday.\n\nI'll send over the final documents once they're ready.\n\nSarah",
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
    preview:
      "I've attached the documents we talked about earlier.",
    body:
      "Hi John,\n\nI've attached the documents we talked about earlier.\n\nLet me know if you need anything else.\n\nAlex",
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
    body:
      "Welcome to the team, John.\n\nWe're really happy to have you with us. Here's everything you need to get started.\n\nMike",
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
    body:
      "Hey!\n\nAre we still on for dinner this Friday?\n\nEmma",
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
    body:
      "A new device has signed into your YourMail account.\n\nIf this was you, no action is required.\n\nIf you don't recognize this activity, please review your security settings.",
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

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Home() {
  const [emails, setEmails] = useState(initialEmails);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [activeFolder, setActiveFolder] =
    useState<Folder>("Inbox");

  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileReader, setMobileReader] = useState(false);

  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");

  const unreadCount = emails.filter(
    (email) => email.unread
  ).length;

  const selectedEmail =
    emails.find((email) => email.id === selectedId) ?? null;

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
  }, [emails, activeFolder, search]);

  function openEmail(email: Email) {
    setSelectedId(email.id);
    setMobileReader(true);

    setEmails((current) =>
      current.map((item) =>
        item.id === email.id
          ? { ...item, unread: false }
          : item
      )
    );
  }

  function toggleStar(
    event: React.MouseEvent,
    id: number
  ) {
    event.stopPropagation();

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
  }

  function selectFolder(folder: Folder) {
    setActiveFolder(folder);
    setSelectedId(null);
    setSidebarOpen(false);
    setMobileReader(false);
  }

  function deleteSelected() {
    if (!selectedEmail) return;

    setEmails((current) =>
      current.filter(
        (email) => email.id !== selectedEmail.id
      )
    );

    setSelectedId(null);
  }

  function closeCompose() {
    setComposeOpen(false);
    setComposeTo("");
    setComposeSubject("");
    setComposeBody("");
  }

  function reply() {
    if (!selectedEmail) return;

    setComposeTo(selectedEmail.email);
    setComposeSubject(`Re: ${selectedEmail.subject}`);
    setComposeOpen(true);
  }

  function sendMessage() {
    if (!composeTo.trim()) return;

    // Connect this to your Rust API later.
    closeCompose();
  }

  return (
    <main className="h-screen overflow-hidden bg-[#f7f7f9] text-[#242428]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[224px] flex-col border-r border-[#e5e5e9] bg-white transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[68px] items-center px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#5b5bd6] text-sm font-bold text-white">
              Y
            </div>

            <span className="text-[17px] font-semibold tracking-[-0.02em]">
              YourMail
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded-md p-1.5 text-[#8a8a91] hover:bg-[#f2f2f5] lg:hidden"
          >
            <X size={17} />
          </button>
        </div>

        {/* Compose */}
        <div className="px-3">
          <button
            onClick={() => {
              setComposeOpen(true);
              setSidebarOpen(false);
            }}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-[#5b5bd6] text-sm font-semibold text-white shadow-sm transition hover:bg-[#4f4fc4]"
          >
            <Plus size={17} />
            Compose
          </button>
        </div>

        {/* Main folders */}
        <nav className="mt-5 px-2">
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
                className={`mb-0.5 flex h-9 w-full items-center gap-3 rounded-[7px] px-3 text-[13px] transition ${
                  active
                    ? "bg-[#eeefff] font-semibold text-[#4f4fc4]"
                    : "text-[#66666d] hover:bg-[#f5f5f7]"
                }`}
              >
                <Icon
                  size={17}
                  strokeWidth={active ? 2.2 : 1.8}
                />

                <span>{folder.label}</span>

                {folder.label === "Inbox" &&
                  unreadCount > 0 && (
                    <span className="ml-auto text-xs font-semibold text-[#66666d]">
                      {unreadCount}
                    </span>
                  )}
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-4 my-4 h-px bg-[#ededf0]" />

        {/* Other folders */}
        <div className="px-5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a0a0a7]">
          Folders
        </div>

        <nav className="mt-2 px-2">
          {folders.slice(5).map((folder) => {
            const Icon = folder.icon;

            return (
              <button
                key={folder.label}
                onClick={() =>
                  selectFolder(folder.label)
                }
                className={`mb-0.5 flex h-9 w-full items-center gap-3 rounded-[7px] px-3 text-[13px] transition ${
                  activeFolder === folder.label
                    ? "bg-[#eeefff] text-[#4f4fc4]"
                    : "text-[#66666d] hover:bg-[#f5f5f7]"
                }`}
              >
                <Icon size={17} />
                {folder.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom account */}
        <div className="mt-auto border-t border-[#ededf0] p-3">
          <button className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-[#f5f5f7]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ececff] text-[11px] font-bold text-[#4f4fc4]">
              JD
            </div>

            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-semibold">
                John Doe
              </div>

              <div className="truncate text-[10px] text-[#99999f]">
                john@yourmail.example
              </div>
            </div>

            <Settings
              size={15}
              className="text-[#99999f]"
            />
          </button>
        </div>
      </aside>

      {/* =====================================================
          APPLICATION
      ====================================================== */}
      <div className="flex h-full flex-col lg:pl-[224px]">
        {/* Top bar */}
        <header className="flex h-[68px] shrink-0 items-center gap-3 border-b border-[#e5e5e9] bg-white px-4 sm:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-[#6f6f76] hover:bg-[#f3f3f5] lg:hidden"
          >
            <Menu size={19} />
          </button>

          {/* Search */}
          <div className="relative w-full max-w-[540px]">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#99999f]"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search messages"
              className="h-10 w-full rounded-lg border border-[#e4e4e8] bg-[#f8f8fa] pl-10 pr-4 text-[13px] outline-none transition placeholder:text-[#9a9aa1] focus:border-[#b9b9e8] focus:bg-white focus:ring-2 focus:ring-[#5b5bd6]/10"
            />
          </div>

          <div className="ml-auto flex items-center gap-1">
            <button
              className="hidden rounded-md p-2 text-[#73737a] hover:bg-[#f3f3f5] sm:block"
              title="Refresh"
            >
              <RefreshCw size={17} />
            </button>

            <button
              className="rounded-md p-2 text-[#73737a] hover:bg-[#f3f3f5]"
              title="Settings"
            >
              <Settings size={17} />
            </button>

            <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#5b5bd6] text-[10px] font-bold text-white">
              JD
            </div>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex min-h-0 flex-1">
          {/* =================================================
              MESSAGE LIST
          ================================================== */}
          <section
            className={`w-full shrink-0 border-r border-[#e5e5e9] bg-white lg:w-[390px] ${
              mobileReader ? "hidden lg:block" : "block"
            }`}
          >
            {/* List header */}
            <div className="flex h-[58px] items-center border-b border-[#ededf0] px-5">
              <div>
                <h1 className="text-[15px] font-semibold">
                  {activeFolder}
                </h1>

                <p className="mt-0.5 text-[10px] text-[#99999f]">
                  {filteredEmails.length} messages
                </p>
              </div>

              <button className="ml-auto rounded-md p-2 text-[#88888f] hover:bg-[#f4f4f6]">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[calc(100%-58px)] overflow-y-auto">
              {filteredEmails.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f1f4]">
                    <Search
                      size={18}
                      className="text-[#96969d]"
                    />
                  </div>

                  <div className="text-sm font-semibold">
                    No messages
                  </div>

                  <p className="mt-1 text-xs text-[#99999f]">
                    Nothing matches your search.
                  </p>
                </div>
              ) : (
                filteredEmails.map((email) => {
                  const selected =
                    email.id === selectedId;

                  return (
                    <button
                      key={email.id}
                      onClick={() => openEmail(email)}
                      className={`group flex w-full border-b border-[#f0f0f2] px-4 py-3.5 text-left transition ${
                        selected
                          ? "bg-[#f1f1ff]"
                          : "bg-white hover:bg-[#fafafd]"
                      }`}
                    >
                      {/* Unread indicator */}
                      <div className="mr-3 pt-1.5">
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${
                            email.unread
                              ? "bg-[#5b5bd6]"
                              : "bg-transparent"
                          }`}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center">
                          <span
                            className={`truncate text-[13px] ${
                              email.unread
                                ? "font-semibold text-[#252529]"
                                : "font-medium text-[#55555c]"
                            }`}
                          >
                            {email.sender}
                          </span>

                          <span className="ml-auto shrink-0 pl-3 text-[10px] text-[#99999f]">
                            {email.time}
                          </span>
                        </div>

                        <div
                          className={`mt-1 truncate text-[12px] ${
                            email.unread
                              ? "font-semibold text-[#34343a]"
                              : "text-[#5f5f66]"
                          }`}
                        >
                          {email.subject}
                        </div>

                        <div className="mt-0.5 truncate text-[11px] text-[#99999f]">
                          {email.preview}
                        </div>
                      </div>

                      <button
                        onClick={(event) =>
                          toggleStar(event, email.id)
                        }
                        className={`ml-2 self-start rounded p-1 ${
                          email.starred
                            ? "text-[#e2a52d]"
                            : "text-transparent group-hover:text-[#b8b8be]"
                        }`}
                      >
                        <Star
                          size={14}
                          fill={
                            email.starred
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </button>
                  );
                })
              )}
            </div>
          </section>

          {/* =================================================
              READING PANE
          ================================================== */}
          <section
            className={`min-w-0 flex-1 bg-white ${
              mobileReader ? "block" : "hidden lg:block"
            }`}
          >
            {selectedEmail ? (
              <div className="flex h-full flex-col">
                {/* Reader toolbar */}
                <div className="flex h-[58px] shrink-0 items-center gap-1 border-b border-[#ededf0] px-4">
                  <button
                    onClick={() => setMobileReader(false)}
                    className="rounded-md p-2 text-[#77777e] hover:bg-[#f3f3f5] lg:hidden"
                  >
                    <ChevronLeft size={19} />
                  </button>

                  <button className="rounded-md p-2 text-[#77777e] hover:bg-[#f3f3f5]">
                    <Archive size={17} />
                  </button>

                  <button
                    onClick={deleteSelected}
                    className="rounded-md p-2 text-[#77777e] hover:bg-[#f3f3f5] hover:text-[#c93d3d]"
                  >
                    <Trash2 size={17} />
                  </button>

                  <button className="rounded-md p-2 text-[#77777e] hover:bg-[#f3f3f5]">
                    <Clock3 size={17} />
                  </button>

                  <div className="ml-auto">
                    <button className="rounded-md p-2 text-[#77777e] hover:bg-[#f3f3f5]">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>

                {/* Message */}
                <article className="min-h-0 flex-1 overflow-y-auto">
                  <div className="mx-auto max-w-[900px] px-6 py-8 sm:px-10">
                    <div className="mb-7">
                      <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#242428]">
                        {selectedEmail.subject}
                      </h2>
                    </div>

                    <div className="flex items-start gap-3 border-b border-[#ededf0] pb-6">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ececff] text-[11px] font-bold text-[#4f4fc4]">
                        {initials(
                          selectedEmail.sender
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[13px] font-semibold">
                            {selectedEmail.sender}
                          </span>

                          <span className="text-[11px] text-[#99999f]">
                            &lt;{selectedEmail.email}&gt;
                          </span>
                        </div>

                        <div className="mt-1 text-[10px] text-[#99999f]">
                          Today at {selectedEmail.time}
                        </div>
                      </div>

                      <button
                        onClick={(event) =>
                          toggleStar(
                            event,
                            selectedEmail.id
                          )
                        }
                        className={`ml-auto rounded-md p-2 ${
                          selectedEmail.starred
                            ? "text-[#e2a52d]"
                            : "text-[#99999f]"
                        }`}
                      >
                        <Star
                          size={17}
                          fill={
                            selectedEmail.starred
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </div>

                    <div className="max-w-[720px] whitespace-pre-line py-8 text-[14px] leading-7 text-[#44444b]">
                      {selectedEmail.body}
                    </div>

                    <div className="flex gap-2 border-t border-[#ededf0] pt-6">
                      <button
                        onClick={reply}
                        className="rounded-lg border border-[#dcdce2] px-4 py-2 text-xs font-semibold text-[#55555c] hover:bg-[#f7f7f9]"
                      >
                        Reply
                      </button>

                      <button className="rounded-lg border border-[#dcdce2] px-4 py-2 text-xs font-semibold text-[#55555c] hover:bg-[#f7f7f9]">
                        Forward
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0f0f3]">
                    <Inbox
                      size={21}
                      className="text-[#929299]"
                    />
                  </div>

                  <h2 className="text-sm font-semibold">
                    Select a message
                  </h2>

                  <p className="mt-1 text-xs text-[#99999f]">
                    Choose an email from your inbox to read it.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* =====================================================
          COMPOSE
      ====================================================== */}
      {composeOpen && (
        <div className="fixed bottom-0 right-5 z-[60] w-[calc(100%-40px)] max-w-[560px] overflow-hidden rounded-t-xl border border-[#dcdce2] bg-white shadow-[0_10px_40px_rgba(0,0,0,.16)] sm:bottom-5 sm:rounded-xl">
          <div className="flex h-11 items-center bg-[#f4f4f7] px-4">
            <span className="text-xs font-semibold">
              New message
            </span>

            <button
              onClick={closeCompose}
              className="ml-auto rounded-md p-1.5 text-[#77777e] hover:bg-[#e6e6ea]"
            >
              <X size={15} />
            </button>
          </div>

          <div className="px-4">
            <input
              value={composeTo}
              onChange={(event) =>
                setComposeTo(event.target.value)
              }
              placeholder="To"
              className="h-10 w-full border-b border-[#ededf0] text-xs outline-none placeholder:text-[#99999f]"
            />

            <input
              value={composeSubject}
              onChange={(event) =>
                setComposeSubject(event.target.value)
              }
              placeholder="Subject"
              className="h-10 w-full border-b border-[#ededf0] text-xs outline-none placeholder:text-[#99999f]"
            />
          </div>

          <textarea
            value={composeBody}
            onChange={(event) =>
              setComposeBody(event.target.value)
            }
            placeholder="Write a message..."
            className="h-52 w-full resize-none p-4 text-xs leading-6 outline-none placeholder:text-[#99999f]"
          />

          <div className="flex items-center border-t border-[#ededf0] px-3 py-2">
            <button className="rounded-md p-2 text-[#77777e] hover:bg-[#f3f3f5]">
              <Paperclip size={16} />
            </button>

            <button
              onClick={sendMessage}
              disabled={!composeTo.trim()}
              className="ml-auto flex items-center gap-2 rounded-lg bg-[#5b5bd6] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4f4fc4] disabled:opacity-40"
            >
              <Send size={14} />
              Send
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
