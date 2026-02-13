"use client";

import { useState } from "react";
import { Plus, X, StickyNote } from "lucide-react";
import type { Note } from "../_data/types";

interface NotesViewProps {
  notes: Note[];
  onAddNote: (note: Omit<Note, "id" | "createdAt">) => void;
  onDeleteNote: (id: string) => void;
}

export default function NotesView({ notes, onAddNote, onDeleteNote }: NotesViewProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAddNote({ title: title.trim(), content: content.trim() });
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Notes</h2>
          <p className="text-sm text-gray-500">Personal observations and reflections</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
          <Plus size={16} /> Add Note
        </button>
      </div>

      <div className="grid gap-3">
        {notes.map((note) => (
          <div key={note.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <StickyNote size={16} className="text-yellow-500" />
                <h3 className="font-medium text-gray-900">{note.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{note.createdAt.slice(0, 10)}</span>
                <button onClick={() => onDeleteNote(note.id)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
              </div>
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{note.content}</p>
          </div>
        ))}
        {notes.length === 0 && <p className="text-center text-gray-400 py-8">No notes yet.</p>}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Note</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Note title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
              <textarea placeholder="Content..." value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" rows={5} />
              <button onClick={handleAdd} className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">Save Note</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
