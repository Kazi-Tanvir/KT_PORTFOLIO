"use client";

import React, { useState, useTransition } from "react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { createEducation, updateEducation, deleteEducation } from "@/app/actions";
import { Trash2, Pencil, Plus, ArrowLeft, X, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Education } from "@/types";

interface EducationAdminClientProps {
  education: Education[];
}

export default function EducationAdminClient({ education }: EducationAdminClientProps) {
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleCreate = (formData: FormData) => {
    startTransition(async () => {
      await createEducation(formData);
      setShowAddForm(false);
    });
  };

  const handleUpdate = (formData: FormData) => {
    startTransition(async () => {
      await updateEducation(formData);
      setEditingId(null);
    });
  };

  const handleDelete = (formData: FormData) => {
    if (!confirm("Delete this education entry?")) return;
    startTransition(async () => {
      await deleteEducation(formData);
    });
  };

  return (
    <div className="py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-[8px] border-black pb-8">
        <div className="space-y-2">
          <Link href="/admin" className="inline-flex items-center gap-2 font-headline font-black uppercase text-sm tracking-widest text-on-surface-variant hover:text-hero-bg transition-colors mb-2">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter">
            <GraduationCap className="inline mr-4" size={48} />Education
          </h1>
          <p className="font-body text-xl font-bold text-on-surface-variant">
            Milestones: {education.length}
          </p>
        </div>
        <Button
          variant="primary"
          className="flex items-center gap-2 text-xl"
          onClick={() => { setShowAddForm(!showAddForm); setEditingId(null); }}
        >
          {showAddForm ? <><X size={20} /> CANCEL</> : <><Plus size={20} /> ADD_ENTRY</>}
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="p-8" bg="bg-about-bg">
          <h2 className="font-headline text-2xl font-black uppercase mb-6">New Education Entry</h2>
          <form action={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Period</label>
              <input name="period" required placeholder="2021 - Present"
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Degree</label>
              <input name="degree" required placeholder="B.Sc. in Computer Science"
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Institution</label>
              <input name="institution" required placeholder="University Name"
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors" />
            </div>
            <div className="space-y-2 flex items-end gap-4">
              <label className="font-headline uppercase font-black text-sm tracking-widest flex items-center gap-3 cursor-pointer bg-white border-4 border-black p-4 flex-1">
                <input type="checkbox" name="active" className="w-6 h-6 accent-primary-container" />
                Currently Active
              </label>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Description</label>
              <textarea name="description" required placeholder="Describe your studies..." rows={3}
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors resize-none" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" variant="secondary" className="w-full py-4 text-xl" disabled={isPending}>
                {isPending ? "SAVING..." : "ADD_MILESTONE"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Education List */}
      <div className="grid gap-8">
        {education.length === 0 ? (
          <Card className="p-12 text-center" bg="bg-white">
            <p className="font-body text-2xl font-bold opacity-30">NO_EDUCATION_ENTRIES</p>
          </Card>
        ) : (
          education.map((edu) => (
            <Card key={edu.id} className="p-0 overflow-hidden" bg="bg-white">
              {editingId === edu.id ? (
                /* Edit Mode */
                <form action={handleUpdate} className="p-8 space-y-6 bg-about-bg/30">
                  <input type="hidden" name="id" value={edu.id} />
                  <div className="flex justify-between items-center">
                    <h3 className="font-headline text-2xl font-black uppercase">Editing: {edu.degree}</h3>
                    <Button type="button" variant="outline" className="p-2" onClick={() => setEditingId(null)}>
                      <X size={20} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-headline uppercase font-black text-sm tracking-widest">Period</label>
                      <input name="period" required defaultValue={edu.period}
                        className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-headline uppercase font-black text-sm tracking-widest">Degree</label>
                      <input name="degree" required defaultValue={edu.degree}
                        className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-headline uppercase font-black text-sm tracking-widest">Institution</label>
                      <input name="institution" required defaultValue={edu.institution}
                        className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none" />
                    </div>
                    <div className="space-y-2 flex items-end">
                      <label className="font-headline uppercase font-black text-sm tracking-widest flex items-center gap-3 cursor-pointer bg-white border-4 border-black p-4 flex-1">
                        <input type="checkbox" name="active" defaultChecked={!!edu.active} className="w-6 h-6 accent-primary-container" />
                        Currently Active
                      </label>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="font-headline uppercase font-black text-sm tracking-widest">Description</label>
                      <textarea name="description" required defaultValue={edu.description} rows={3}
                        className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none resize-none" />
                    </div>
                    <div className="md:col-span-2">
                      <Button type="submit" variant="primary" className="w-full py-4 text-xl" disabled={isPending}>
                        {isPending ? "SAVING..." : "SAVE_CHANGES"}
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                /* View Mode */
                <div className="p-8 flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3 py-1 border-2 border-black font-headline font-black uppercase text-xs ${
                        edu.active ? 'bg-primary-container' : 'bg-[#eee]'
                      }`}>
                        {edu.period}
                      </span>
                      {edu.active && (
                        <span className="bg-primary-container px-3 py-1 border-2 border-black font-headline font-black uppercase text-xs">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <h3 className="font-headline text-2xl font-black uppercase">{edu.degree}</h3>
                    <p className="font-headline text-lg text-on-surface-variant font-bold uppercase">{edu.institution}</p>
                    <p className="font-body font-bold text-on-surface-variant leading-relaxed">{edu.description}</p>
                  </div>
                  {/* Actions */}
                  <div className="flex md:flex-col gap-3 items-start">
                    <Button type="button" variant="outline" className="p-3"
                      onClick={() => { setEditingId(edu.id!); setShowAddForm(false); }}>
                      <Pencil size={18} />
                    </Button>
                    <form action={handleDelete}>
                      <input type="hidden" name="id" value={edu.id} />
                      <Button type="submit" variant="outline" className="p-3 border-red-500 text-red-500 hover:bg-red-500 hover:text-white" disabled={isPending}>
                        <Trash2 size={18} />
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
