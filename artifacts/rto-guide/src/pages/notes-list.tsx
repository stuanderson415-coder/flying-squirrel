import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  useListNotes,
  useUpdateNote,
  useDeleteNote,
  getListNotesQueryKey,
  getGetDashboardSummaryQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  PenTool,
  Send,
  ThumbsUp,
  Trash2,
} from "lucide-react";

/* ── Types ───────────────────────────────────────────────────────────────── */
interface ExchangePost {
  id: string;
  authorName: string;
  authorRole: string;
  standardRef: string;
  body: string;
  postedAt: string;
  helpful: number;
  seed?: boolean;
}

/* ── Seeded community posts ──────────────────────────────────────────────── */
const SEED_POSTS: ExchangePost[] = [
  {
    id: "seed-1",
    authorName: "Sarah M.",
    authorRole: "VET trainer, TAFE NSW",
    standardRef: "Standard 1.4",
    body: "I colour-coded every assessment tool against the four principles — valid, sufficient, current, authentic — before submitting for review. Our revision rounds dropped from three to one.",
    postedAt: "2025-08-12",
    helpful: 34,
    seed: true,
  },
  {
    id: "seed-2",
    authorName: "Derek P.",
    authorRole: "Training manager, private RTO",
    standardRef: "Standard 2.1",
    body: "We built a one-page industry currency log template for all trainers. They fill it in quarterly — 10 minutes each time — and it's audit-ready the moment an auditor asks.",
    postedAt: "2025-08-20",
    helpful: 51,
    seed: true,
  },
  {
    id: "seed-3",
    authorName: "Trish W.",
    authorRole: "Assessor, community services RTO",
    standardRef: "Standard 1.1",
    body: "Before writing a new TAS I run a 30-minute focus group with two industry contacts. Their language ends up directly in the intent statement and assessors love how authentic it reads.",
    postedAt: "2025-09-03",
    helpful: 28,
    seed: true,
  },
  {
    id: "seed-4",
    authorName: "James K.",
    authorRole: "Compliance manager",
    standardRef: "Standard 3.2",
    body: "We replaced our three-page enrolment form with a plain-English two-pager reviewed by a literacy specialist. Week-one withdrawal rates dropped noticeably.",
    postedAt: "2025-09-15",
    helpful: 43,
    seed: true,
  },
  {
    id: "seed-5",
    authorName: "Priya A.",
    authorRole: "Trainer/assessor, aged care",
    standardRef: "Standard 1.3",
    body: "For each practical task I attach a short video of the skill performed to industry benchmark. Students use it as a self-check before submission — RPL conversations are much easier too.",
    postedAt: "2025-10-01",
    helpful: 19,
    seed: true,
  },
  {
    id: "seed-6",
    authorName: "Mel D.",
    authorRole: "RTO Director, small provider",
    standardRef: "Standard 4.1",
    body: "After each audit cycle I run a 'lessons learned' session with all staff and update our self-assurance register the same week while everything is fresh. One hour saves months later.",
    postedAt: "2025-10-14",
    helpful: 62,
    seed: true,
  },
  {
    id: "seed-7",
    authorName: "Chris B.",
    authorRole: "VET practitioner",
    standardRef: "Standard 2.3",
    body: "A 20-minute 'PD check-in' each term where every trainer shares one new industry development. It feeds straight into their currency log and builds team knowledge at the same time.",
    postedAt: "2025-11-02",
    helpful: 37,
    seed: true,
  },
  {
    id: "seed-8",
    authorName: "Anna F.",
    authorRole: "Student support coordinator",
    standardRef: "Standard 3.3",
    body: "A simple SMS check-in at week 2 for every new student catches support needs early — before they quietly drop out. We started it as a trial and have never stopped.",
    postedAt: "2025-11-20",
    helpful: 55,
    seed: true,
  },
];

const STORAGE_KEY = "rto-exchange:posts";

function loadLocalPosts(): ExchangePost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ExchangePost[];
  } catch {
    return [];
  }
}

function saveLocalPosts(posts: ExchangePost[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // ignore
  }
}

function initialsColor(name: string): string {
  const palette = [
    "hsl(265,80%,70%)",
    "hsl(28,90%,62%)",
    "hsl(200,70%,65%)",
    "hsl(340,70%,65%)",
    "hsl(160,60%,50%)",
    "hsl(45,85%,58%)",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + hash * 31;
  return palette[Math.abs(hash) % palette.length];
}

function initials(name: string): string {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

function relativeDate(iso: string): string {
  const d = new Date(iso);
  const diff = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (diff === 0) return "today";
  if (diff === 1) return "yesterday";
  if (diff < 30) return `${diff}d ago`;
  if (diff < 365) return `${Math.floor(diff / 30)}mo ago`;
  return `${Math.floor(diff / 365)}y ago`;
}

/* ── Exchange tab ────────────────────────────────────────────────────────── */
function ExchangeTab() {
  const { toast } = useToast();
  const [localPosts, setLocalPosts] = useState<ExchangePost[]>(loadLocalPosts);
  const [helpfulClicked, setHelpfulClicked] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem("rto-exchange:helpful");
      return new Set(JSON.parse(raw ?? "[]"));
    } catch {
      return new Set();
    }
  });
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formStandard, setFormStandard] = useState("");
  const [formBody, setFormBody] = useState("");

  const allPosts = [
    ...localPosts,
    ...SEED_POSTS,
  ].sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());

  const handleSubmit = () => {
    if (!formBody.trim() || !formStandard.trim()) return;
    const post: ExchangePost = {
      id: `user-${Date.now()}`,
      authorName: formName.trim() || "Anonymous educator",
      authorRole: "RTO practitioner",
      standardRef: formStandard.trim(),
      body: formBody.trim(),
      postedAt: new Date().toISOString().slice(0, 10),
      helpful: 0,
    };
    const updated = [post, ...localPosts];
    setLocalPosts(updated);
    saveLocalPosts(updated);
    setFormName("");
    setFormStandard("");
    setFormBody("");
    setShowForm(false);
    toast({ title: "Strategy shared", description: "Your tip has been added to the exchange." });
  };

  const handleHelpful = (id: string) => {
    const next = new Set(helpfulClicked);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setHelpfulClicked(next);
    try {
      localStorage.setItem("rto-exchange:helpful", JSON.stringify([...next]));
    } catch {
      // ignore
    }
  };

  const handleDeleteLocal = (id: string) => {
    const updated = localPosts.filter((p) => p.id !== id);
    setLocalPosts(updated);
    saveLocalPosts(updated);
    toast({ title: "Post removed" });
  };

  return (
    <div className="space-y-4">
      {/* Share CTA */}
      <button
        type="button"
        onClick={() => setShowForm((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors text-sm font-medium text-primary"
      >
        <span className="flex items-center gap-2">
          <Send className="w-4 h-4" />
          Share a strategy that's working for you
        </span>
        {showForm ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Submit form */}
      {showForm && (
        <div className="rounded-2xl bg-card border border-primary/30 p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-xs text-muted-foreground">
            Share a practical tip with other RTO educators. No account needed — all posts are anonymous by default.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                Your name <span className="normal-case">(optional)</span>
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Sarah M., or leave blank"
                className="w-full rounded-xl bg-background border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                Standard <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formStandard}
                onChange={(e) => setFormStandard(e.target.value)}
                placeholder="e.g. Standard 1.4"
                className="w-full rounded-xl bg-background border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
              Your strategy <span className="text-destructive">*</span>
            </label>
            <Textarea
              value={formBody}
              onChange={(e) => setFormBody(e.target.value)}
              placeholder="What's working for you? Be specific — the more concrete the better."
              className="min-h-[96px] resize-none bg-background border-border focus:border-primary/60"
              rows={4}
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!formBody.trim() || !formStandard.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              Post to exchange
            </button>
          </div>
        </div>
      )}

      {/* Posts feed */}
      <div className="space-y-3">
        {allPosts.map((post, i) => {
          const isOwn = !post.seed;
          const liked = helpfulClicked.has(post.id);
          const helpfulCount = post.helpful + (liked ? 1 : 0);
          const color = initialsColor(post.authorName);
          return (
            <div
              key={post.id}
              className="rounded-2xl bg-card border border-border p-4 space-y-2.5 animate-in fade-in duration-300"
              style={{ animationDelay: `${Math.min(i * 30, 300)}ms`, animationFillMode: "both" }}
            >
              {/* Header */}
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-background shrink-0 mt-0.5"
                  style={{ background: color }}
                >
                  {initials(post.authorName)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-foreground leading-none">{post.authorName}</span>
                    <span className="text-[10px] text-muted-foreground/60">{post.authorRole}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "hsl(265,80%,70%,0.15)", color: "hsl(265,80%,75%)" }}
                    >
                      {post.standardRef}
                    </span>
                    <span className="text-[10px] text-muted-foreground/50">{relativeDate(post.postedAt)}</span>
                  </div>
                </div>
                {isOwn && (
                  <button
                    type="button"
                    onClick={() => handleDeleteLocal(post.id)}
                    className="text-muted-foreground/40 hover:text-destructive transition-colors shrink-0"
                    aria-label="Remove post"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Body */}
              <p className="text-sm text-foreground/85 leading-relaxed pl-11">{post.body}</p>

              {/* Footer */}
              <div className="pl-11 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleHelpful(post.id)}
                  className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                    liked
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary/80"
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  Helpful · {helpfulCount}
                </button>
                <Link href={`/practice`}>
                  <span className="text-[11px] text-muted-foreground/50 hover:text-primary transition-colors cursor-pointer">
                    Open Practice record
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Reflections tab (existing notes) ───────────────────────────────────── */
function ReflectionsTab() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: notes, isLoading, isError } = useListNotes();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editNoteBody, setEditNoteBody] = useState("");

  const handleSaveEdit = (noteId: number) => {
    if (!editNoteBody.trim()) return;
    updateNote.mutate(
      { noteId, data: { body: editNoteBody } },
      {
        onSuccess: () => {
          setEditingNoteId(null);
          setEditNoteBody("");
          queryClient.invalidateQueries({ queryKey: getListNotesQueryKey() });
          toast({ title: "Reflection updated" });
        },
      }
    );
  };

  const handleDeleteNote = (noteId: number) => {
    deleteNote.mutate(
      { noteId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListNotesQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
          toast({ title: "Reflection deleted" });
        },
      }
    );
  };

  if (isLoading)
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-36 w-full rounded-2xl" />
        ))}
      </div>
    );

  if (isError)
    return <div className="py-16 text-center text-destructive text-sm">Failed to load reflections.</div>;

  if (!notes || notes.length === 0)
    return (
      <div className="py-20 text-center flex flex-col items-center rounded-2xl border border-border bg-card">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-base font-semibold text-foreground">No reflections yet</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs leading-relaxed">
          Open any standard and use the notes field to record progress, evidence, or ideas.
        </p>
        <Link href="/standards">
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Browse Standards
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    );

  return (
    <div className="space-y-3">
      {notes.map((note, i) => (
        <div
          key={note.id}
          className="rounded-2xl bg-card border border-border p-4 animate-in fade-in duration-300"
          style={{ animationDelay: `${Math.min(i * 40, 400)}ms`, animationFillMode: "both" }}
        >
          <div className="flex items-center justify-between mb-3">
            <Link href={`/standards/${note.standardId}`}>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors bg-primary/8 px-2.5 py-1 rounded-full cursor-pointer">
                {note.standardCode}
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <span className="text-[10px] text-muted-foreground/50">
              {new Date(note.updatedAt).toLocaleDateString()}
            </span>
          </div>

          {editingNoteId === note.id ? (
            <div className="space-y-2">
              <Textarea
                value={editNoteBody}
                onChange={(e) => setEditNoteBody(e.target.value)}
                className="min-h-[100px] resize-none bg-background border-border"
                rows={4}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setEditingNoteId(null); setEditNoteBody(""); }}
                  className="px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveEdit(note.id)}
                  disabled={!editNoteBody.trim() || updateNote.isPending}
                  className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 disabled:opacity-40 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <p className="text-sm text-foreground/85 whitespace-pre-wrap flex-1 leading-relaxed">{note.body}</p>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  className="text-muted-foreground/40 hover:text-primary transition-colors p-1"
                  onClick={() => { setEditingNoteId(note.id); setEditNoteBody(note.body); }}
                  aria-label="Edit"
                >
                  <PenTool className="w-3.5 h-3.5" />
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      type="button"
                      className="text-muted-foreground/40 hover:text-destructive transition-colors p-1"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete reflection?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteNote(note.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function NotesList() {
  useEffect(() => {
    document.title = "Exchange | RTO Standards Companion";
  }, []);

  const [tab, setTab] = useState<"exchange" | "reflections">("exchange");

  return (
    <div className="space-y-5 pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Community</p>
        <h1 className="text-2xl font-sans font-bold text-foreground mt-1 leading-tight flex items-center gap-2">
          Strategy Exchange
          <ArrowLeftRight className="w-5 h-5 text-primary shrink-0" />
        </h1>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          Real tips from RTO educators navigating the 2025 Standards. Share what's working for you.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted/50 border border-border">
        {(
          [
            { key: "exchange", label: "Community Exchange" },
            { key: "reflections", label: "Reflective Journal" },
          ] as const
        ).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              tab === key
                ? "bg-card text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "exchange" ? <ExchangeTab /> : <ReflectionsTab />}
    </div>
  );
}
