"use client";

import React, { useState, useTransition } from "react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { createProject, updateProject, deleteProject } from "@/app/actions";
import { Trash2, Pencil, Plus, ArrowLeft, X, FolderOpen } from "lucide-react";
import Link from "next/link";
import { Project } from "@/types";

interface ProjectsAdminClientProps {
  projects: Project[];
}

export default function ProjectsAdminClient({ projects }: ProjectsAdminClientProps) {
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleCreate = (formData: FormData) => {
    startTransition(async () => {
      await createProject(formData);
      setShowAddForm(false);
    });
  };

  const handleUpdate = (formData: FormData) => {
    startTransition(async () => {
      await updateProject(formData);
      setEditingId(null);
    });
  };

  const handleDelete = (formData: FormData) => {
    if (!confirm("Delete this project permanently?")) return;
    startTransition(async () => {
      await deleteProject(formData);
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
            <FolderOpen className="inline mr-2 md:mr-4 md:hidden" size={24} /><FolderOpen className="hidden md:inline mr-4" size={48} />Projects
          </h1>
          <p className="font-body text-xl font-bold text-on-surface-variant">
            Total Deployments: {projects.length}
          </p>
        </div>
        <Button
          variant="primary"
          className="flex items-center gap-2 text-sm md:text-xl"
          onClick={() => { setShowAddForm(!showAddForm); setEditingId(null); }}
        >
          {showAddForm ? <><X size={20} /> CANCEL</> : <><Plus size={20} /> ADD_NEW</>}
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="p-5 md:p-8" bg="bg-primary-container">
          <h2 className="font-headline text-xl md:text-2xl font-black uppercase mb-4 md:mb-6">New Deployment</h2>
          <form action={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Title</label>
              <input name="title" required placeholder="PROJECT_NAME"
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Category</label>
              <input name="category" required placeholder="Full-Stack"
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Description</label>
              <textarea name="description" required placeholder="Describe the project..." rows={3}
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors resize-none" />
            </div>
            <div className="space-y-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Tags (comma-separated)</label>
              <input name="tags" required placeholder="React, Next.js, TypeScript"
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Image URL</label>
              <input name="image" placeholder="https://..."
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Link</label>
              <input name="link" placeholder="https://..."
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors" />
            </div>
            <div className="flex items-end">
              <Button type="submit" variant="secondary" className="w-full py-4 text-xl" disabled={isPending}>
                {isPending ? "DEPLOYING..." : "DEPLOY_PROJECT"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Projects List */}
      <div className="grid gap-8">
        {projects.length === 0 ? (
          <Card className="p-12 text-center" bg="bg-white">
            <p className="font-body text-2xl font-bold opacity-30">NO_PROJECTS_FOUND</p>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="p-0 overflow-hidden" bg="bg-white">
              {editingId === project.id ? (
                /* Edit Mode */
                <form action={handleUpdate} className="p-8 space-y-6 bg-about-bg/30">
                  <input type="hidden" name="id" value={project.id} />
                  <div className="flex justify-between items-center">
                    <h3 className="font-headline text-2xl font-black uppercase">Editing: {project.title}</h3>
                    <Button type="button" variant="outline" className="p-2" onClick={() => setEditingId(null)}>
                      <X size={20} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-headline uppercase font-black text-sm tracking-widest">Title</label>
                      <input name="title" required defaultValue={project.title}
                        className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-headline uppercase font-black text-sm tracking-widest">Category</label>
                      <input name="category" required defaultValue={project.category}
                        className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="font-headline uppercase font-black text-sm tracking-widest">Description</label>
                      <textarea name="description" required defaultValue={project.description} rows={3}
                        className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none resize-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-headline uppercase font-black text-sm tracking-widest">Tags (comma-separated)</label>
                      <input name="tags" required defaultValue={project.tags.join(', ')}
                        className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-headline uppercase font-black text-sm tracking-widest">Image URL</label>
                      <input name="image" defaultValue={project.image}
                        className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-headline uppercase font-black text-sm tracking-widest">Link</label>
                      <input name="link" defaultValue={project.link}
                        className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none" />
                    </div>
                    <div className="flex items-end">
                      <Button type="submit" variant="primary" className="w-full py-4 text-xl" disabled={isPending}>
                        {isPending ? "SAVING..." : "SAVE_CHANGES"}
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                /* View Mode */
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  {project.image && (
                    <div className="w-full md:w-48 h-40 md:h-auto bg-black border-b-[5px] md:border-b-0 md:border-r-[5px] border-black overflow-hidden flex-shrink-0">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80"
                        referrerPolicy="no-referrer" />
                    </div>
                  )}
                  {/* Details */}
                  <div className="flex-1 p-8 flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-headline text-2xl font-black uppercase">{project.title}</h3>
                        <span className="bg-hero-bg px-3 py-1 border-2 border-black font-headline font-black uppercase text-xs">
                          {project.category}
                        </span>
                      </div>
                      <p className="font-body font-bold text-on-surface-variant leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="bg-primary-container px-3 py-1 border-2 border-black font-headline font-black uppercase text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex md:flex-col gap-3 items-start">
                      <Button type="button" variant="outline" className="p-3"
                        onClick={() => { setEditingId(project.id); setShowAddForm(false); }}>
                        <Pencil size={18} />
                      </Button>
                      <form action={handleDelete}>
                        <input type="hidden" name="id" value={project.id} />
                        <Button type="submit" variant="outline" className="p-3 border-red-500 text-red-500 hover:bg-red-500 hover:text-white" disabled={isPending}>
                          <Trash2 size={18} />
                        </Button>
                      </form>
                    </div>
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
