import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { 
  useGetStandard, 
  useListNotes,
  useCreateNote,
  useUpdateNote,
  useDeleteNote,
  getGetStandardQueryKey,
  getListNotesQueryKey,
  getGetDashboardSummaryQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, ExternalLink, MessageSquare, Target, Trash2, ShieldCheck, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function StandardDetail() {
  const { standardId } = useParams();
  const id = parseInt(standardId || "0");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: standard, isLoading, isError } = useGetStandard(id, {
    query: { enabled: !!id, queryKey: getGetStandardQueryKey(id) }
  });

  const { data: notes, isLoading: isLoadingNotes } = useListNotes(
    { standardId: id },
    { query: { enabled: !!id, queryKey: getListNotesQueryKey({ standardId: id }) } }
  );

  const createNote = useCreateNote();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();

  const [newNoteBody, setNewNoteBody] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editNoteBody, setEditNoteBody] = useState("");

  useEffect(() => {
    if (standard) {
      document.title = `Standard ${standard.code} | RTO Standards Companion`;
    }
  }, [standard]);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-10 w-96 mb-2" />
          <Skeleton className="h-6 w-64 mb-6" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !standard) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <h2 className="text-xl font-medium text-destructive mb-2">Standard Not Found</h2>
        <p className="text-muted-foreground mb-6">We couldn't find the standard you're looking for.</p>
        <Link href="/standards">
          <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Standards</Button>
        </Link>
      </div>
    );
  }

  const handleAddNote = () => {
    if (!newNoteBody.trim()) return;
    createNote.mutate(
      { data: { standardId: id, body: newNoteBody } },
      {
        onSuccess: () => {
          setNewNoteBody("");
          queryClient.invalidateQueries({ queryKey: getListNotesQueryKey({ standardId: id }) });
          queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
          toast({ title: "Reflection saved" });
        }
      }
    );
  };

  const handleSaveEdit = () => {
    if (!editingNoteId || !editNoteBody.trim()) return;
    updateNote.mutate(
      { noteId: editingNoteId, data: { body: editNoteBody } },
      {
        onSuccess: () => {
          setEditingNoteId(null);
          setEditNoteBody("");
          queryClient.invalidateQueries({ queryKey: getListNotesQueryKey({ standardId: id }) });
          toast({ title: "Reflection updated" });
        }
      }
    );
  };

  const handleDeleteNote = (noteId: number) => {
    deleteNote.mutate(
      { noteId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListNotesQueryKey({ standardId: id }) });
          queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
          toast({ title: "Reflection deleted" });
        }
      }
    );
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <Link href={`/quality-areas/${standard.qualityAreaId}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-2">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to {standard.qualityAreaCode}
      </Link>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
              Standard {standard.code}
            </div>
            <a
              href="https://www.asqa.gov.au/standards"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors border border-border/60 rounded-full px-2.5 py-1"
            >
              ASQA official text <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <h1 className="text-3xl font-sans font-bold text-foreground mb-3">{standard.title}</h1>
          <p className="text-lg text-muted-foreground">{standard.intent}</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-8">
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-sans flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                What it actually means
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {standard.whatItMeans}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-card shadow-sm border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-sans flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-blue-500" />
                  Performance indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {standard.keyPractices.map((practice, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-sm border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-sans flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Evidence Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {standard.evidenceExamples.map((example, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

        </div>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-sans font-bold flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              Reflections
            </h2>

            {/* Always-visible note input */}
            <div className="space-y-2 mb-5">
              <Textarea
                placeholder="Add a reflection on this standard…"
                className="min-h-[90px] bg-card resize-none"
                value={newNoteBody}
                onChange={(e) => setNewNoteBody(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleAddNote}
                  disabled={!newNoteBody.trim() || createNote.isPending}
                >
                  {createNote.isPending ? "Saving…" : "Save Reflection"}
                </Button>
              </div>
            </div>

            {isLoadingNotes ? (
              <div className="space-y-4">
                {[1, 2].map((i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)}
              </div>
            ) : notes && notes.length > 0 ? (
              <div className="space-y-3">
                {notes.map((note) => (
                  <Card key={note.id} className="bg-card shadow-sm border-border">
                    <CardContent className="p-4 space-y-3">
                      {editingNoteId === note.id ? (
                        <div className="space-y-3">
                          <Textarea
                            value={editNoteBody}
                            onChange={(e) => setEditNoteBody(e.target.value)}
                            className="min-h-[90px] resize-none"
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => { setEditingNoteId(null); setEditNoteBody(""); }}>Cancel</Button>
                            <Button size="sm" onClick={handleSaveEdit} disabled={!editNoteBody.trim() || updateNote.isPending}>Save</Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-foreground whitespace-pre-wrap">{note.body}</p>
                          <div className="flex items-center justify-between pt-2 border-t mt-2">
                            <span className="text-xs text-muted-foreground">{new Date(note.updatedAt).toLocaleDateString()}</span>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditingNoteId(note.id); setEditNoteBody(note.body); }}>
                                <PenTool className="w-3.5 h-3.5 text-muted-foreground" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-destructive">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete reflection?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This reflection will be permanently deleted.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteNote(note.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic text-center py-4">No reflections yet — use the box above to add your first.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
