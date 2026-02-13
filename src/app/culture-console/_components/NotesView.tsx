"use client";

import { useState } from "react";
import { Plus, Pencil, X, Tag } from "lucide-react";
import type { AppData, Note } from "../_data/types";
import { generateId } from "./shared";

interface NotesViewProps {
  data: AppData;
  onDataChange: (data: AppData) => void;
}

export default function NotesView({ data, onDataChange }: NotesViewProps) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formAuthorId, setFormAuthorId] = useState("");
  const [formTags, setFormTags] = useState("");

  const filtered = data.notes.filter((n) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  function openAdd() {
    setEditId(null);
    setFormTitle("");
    setFormContent("");
    setFormAuthorId("");
    setFormTags("");
    setModalOpen(true);
  }

  function openEdit(note: Note) {
    setEditId(note.id);
    setFormTitle(note.title);
    setFormContent(note.content);
    setFormAuthorId(note.authorId);
    setFormTags(note.tags.join(", "));
    setModalOpen(true);
  }

  function saveNote() {
    const now = new Date().toISOString();
    const note: Note = {
      id: editId || generateId(),
      title: formTitle.trim(),
      content: formContent.trim(),
      authorId: formAuthorId,
      tags: formTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      createdAt: editId
        ? data.notes.find((n) => n.id === editId)?.createdAt || now
        : now,
      updatedAt: now,
    };

    let newNotes: Note[];
    if (editId) {
      newNotes = data.notes.map((n) => (n.id === editId ? note : n));
    } else {
      newNotes = [...data.notes, note];
    }

    onDataChange({ ...data, notes: newNotes });
    setModalOpen(false);
  }

  function deleteNote(id: string) {
    onDataChange({ ...data, notes: data.notes.filter((n) => n.id !== id) });
    setConfirmDeleteId(null);
  }

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-7">
        <div>
          <h2 className="text-[1.6rem] font-bold text-[#f0f0f5]">Notes</h2>
          <p className="text-[#8888a0] text-sm mt-1">
            Culture journal &amp; team observations
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-5 py-2.5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)] flex items-center gap-2"
        >
          <Plus size={16} /> Add Note
        </button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search notes by title, content, or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-3 px-4 bg-[#12121a] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
        />
      </div>

      {/* Notes List */}
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        {filtered.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-[#8888a0] text-base">
            {data.notes.length === 0
              ? "No notes yet. Start journaling your culture observations."
              : "No notes match your search."}
          </div>
        ) : (
          filtered.map((note) => {
            const author = data.members.find((m) => m.id === note.authorId);
            return (
              <div
                key={note.id}
                className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5 transition-colors duration-200 hover:border-[#3a3a4a] group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-[0.95rem] font-semibold text-[#f0f0f5]">
                    {note.title}
                  </h4>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => openEdit(note)}
                      title="Edit"
                      className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#1a1a26] hover:text-[#f0f0f5]"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(note.id)}
                      title="Delete"
                      className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[rgba(239,68,68,0.15)] hover:text-[#ef4444]"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-[0.88rem] text-[#8888a0] leading-relaxed mb-3 line-clamp-3">
                  {note.content}
                </p>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <Tag size={12} className="text-[#8888a0]" />
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-0.5 rounded-md text-xs bg-[rgba(74,108,247,0.1)] text-[#4a6cf7]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-[#8888a0]">
                  <span>By {author ? author.name : "Unknown"}</span>
                  <span>
                    {new Date(note.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl w-full max-w-[520px] p-7 animate-[fadeIn_0.25s_ease]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[1.2rem] font-bold text-[#f0f0f5]">
                {editId ? "Edit Note" : "Add Note"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center border-none bg-transparent text-[#8888a0] cursor-pointer rounded-lg hover:bg-[#1a1a26] hover:text-[#f0f0f5]"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveNote();
              }}
            >
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="Note title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Content
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write your observations..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7] placeholder:text-[#8888a0] resize-y min-h-[100px] font-[inherit]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Author
                </label>
                <select
                  value={formAuthorId}
                  onChange={(e) => setFormAuthorId(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7] cursor-pointer"
                >
                  <option value="">Select author</option>
                  {data.members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. culture, goals, retro"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
                />
              </div>
              <div className="flex justify-end gap-2.5 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-transparent text-[#8888a0] border border-[#2a2a3a] px-5 py-2.5 text-sm font-medium rounded-[10px] cursor-pointer hover:border-[#8888a0] hover:text-[#f0f0f5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-5 py-2.5 text-sm font-semibold rounded-[10px] cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)]"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl w-full max-w-[380px] p-7 animate-[fadeIn_0.25s_ease]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[1.2rem] font-bold text-[#f0f0f5]">
                Confirm Delete
              </h3>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="w-8 h-8 flex items-center justify-center border-none bg-transparent text-[#8888a0] cursor-pointer rounded-lg hover:bg-[#1a1a26] hover:text-[#f0f0f5]"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-[#8888a0] text-[0.95rem] leading-relaxed">
              Are you sure you want to delete this note?
            </p>
            <div className="flex justify-end gap-2.5 mt-6">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-transparent text-[#8888a0] border border-[#2a2a3a] px-5 py-2.5 text-sm font-medium rounded-[10px] cursor-pointer hover:border-[#8888a0] hover:text-[#f0f0f5]"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteNote(confirmDeleteId)}
                className="bg-[#ef4444] text-white border-none px-5 py-2.5 text-sm font-semibold rounded-[10px] cursor-pointer hover:bg-[#dc2626]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
