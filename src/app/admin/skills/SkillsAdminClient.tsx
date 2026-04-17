"use client";

import React, { useState, useTransition } from "react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { createSkill, updateSkill, deleteSkill } from "@/app/actions";
import { Trash2, Pencil, Plus, ArrowLeft, X, Cpu } from "lucide-react";
import Link from "next/link";
import { Skill } from "@/types";

const ICON_OPTIONS = [
  'Code', 'Layers', 'Terminal', 'Palette', 'Cpu', 'Settings',
  'Database', 'History', 'Zap', 'Monitor', 'Globe', 'Shield',
  'Server', 'Smartphone', 'Cloud', 'GitBranch', 'Box', 'Wrench',
];

interface SkillsAdminClientProps {
  skills: Skill[];
}

export default function SkillsAdminClient({ skills }: SkillsAdminClientProps) {
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleCreate = (formData: FormData) => {
    startTransition(async () => {
      await createSkill(formData);
      setShowAddForm(false);
    });
  };

  const handleUpdate = (formData: FormData) => {
    startTransition(async () => {
      await updateSkill(formData);
      setEditingId(null);
    });
  };

  const handleDelete = (formData: FormData) => {
    if (!confirm("Delete this skill?")) return;
    startTransition(async () => {
      await deleteSkill(formData);
    });
  };

  return (
    <div className="py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 border-b-[4px] md:border-b-[8px] border-black pb-6 md:pb-8">
        <div className="space-y-2">
          <Link href="/admin" className="inline-flex items-center gap-2 font-headline font-black uppercase text-sm tracking-widest text-on-surface-variant hover:text-hero-bg transition-colors mb-2">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="font-headline text-2xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter">
            <Cpu className="inline mr-2 md:mr-4 md:hidden" size={24} /><Cpu className="hidden md:inline mr-4" size={48} />Skills
          </h1>
          <p className="font-body text-xl font-bold text-on-surface-variant">
            Arsenal Count: {skills.length}
          </p>
        </div>
        <Button
          variant="primary"
          className="flex items-center gap-2 text-sm md:text-xl"
          onClick={() => { setShowAddForm(!showAddForm); setEditingId(null); }}
        >
          {showAddForm ? <><X size={20} /> CANCEL</> : <><Plus size={20} /> ADD_SKILL</>}
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="p-5 md:p-8" bg="bg-primary-container">
          <h2 className="font-headline text-xl md:text-2xl font-black uppercase mb-4 md:mb-6">New Skill</h2>
          <form action={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Name</label>
              <input name="name" required placeholder="React"
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Icon</label>
              <select name="icon" required
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors">
                {ICON_OPTIONS.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button type="submit" variant="secondary" className="w-full py-4 text-xl" disabled={isPending}>
                {isPending ? "ADDING..." : "ADD_SKILL"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {skills.length === 0 ? (
          <Card className="p-12 text-center col-span-full" bg="bg-white">
            <p className="font-body text-2xl font-bold opacity-30">NO_SKILLS_FOUND</p>
          </Card>
        ) : (
          skills.map((skill) => (
            <Card key={skill.id} className="p-0 overflow-hidden" bg="bg-white">
              {editingId === skill.id ? (
                /* Edit Mode */
                <form action={handleUpdate} className="p-6 space-y-4 bg-about-bg/30">
                  <input type="hidden" name="id" value={skill.id} />
                  <div className="flex justify-between items-center">
                    <span className="font-headline font-black uppercase text-sm">Editing</span>
                    <button type="button" onClick={() => setEditingId(null)}><X size={18} /></button>
                  </div>
                  <input name="name" required defaultValue={skill.name}
                    className="w-full bg-white border-4 border-black p-3 font-body font-bold outline-none text-sm" />
                  <select name="icon" required defaultValue={skill.icon}
                    className="w-full bg-white border-4 border-black p-3 font-body font-bold outline-none text-sm">
                    {ICON_OPTIONS.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                  <Button type="submit" variant="primary" className="w-full py-2 text-sm" disabled={isPending}>
                    SAVE
                  </Button>
                </form>
              ) : (
                /* View Mode */
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-primary-container px-3 py-1 border-2 border-black font-headline font-black uppercase text-xs">
                      {skill.icon}
                    </span>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => { setEditingId(skill.id!); setShowAddForm(false); }}
                        className="p-1 hover:text-hero-bg transition-colors">
                        <Pencil size={16} />
                      </button>
                      <form action={handleDelete}>
                        <input type="hidden" name="id" value={skill.id} />
                        <button type="submit" className="p-1 text-red-500 hover:text-red-700 transition-colors" disabled={isPending}>
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>
                  </div>
                  <h3 className="font-headline text-xl font-black uppercase">{skill.name}</h3>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
