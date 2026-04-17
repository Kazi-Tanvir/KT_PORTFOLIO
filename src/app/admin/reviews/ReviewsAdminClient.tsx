"use client";

import React, { useState, useTransition } from "react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { createReview, updateReview, deleteReview } from "@/app/actions";
import { Trash2, Pencil, Plus, ArrowLeft, X, Star } from "lucide-react";
import Link from "next/link";
import { Review } from "@/types";

interface ReviewsAdminClientProps {
  reviews: Review[];
}

export default function ReviewsAdminClient({ reviews }: ReviewsAdminClientProps) {
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleCreate = (formData: FormData) => {
    startTransition(async () => {
      await createReview(formData);
      setShowAddForm(false);
    });
  };

  const handleUpdate = (formData: FormData) => {
    startTransition(async () => {
      await updateReview(formData);
      setEditingId(null);
    });
  };

  const handleDelete = (formData: FormData) => {
    if (!confirm("Delete this review?")) return;
    startTransition(async () => {
      await deleteReview(formData);
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
            <Star className="inline mr-4" size={48} />Reviews
          </h1>
          <p className="font-body text-xl font-bold text-on-surface-variant">
            Testimonials: {reviews.length}
          </p>
        </div>
        <Button
          variant="primary"
          className="flex items-center gap-2 text-xl"
          onClick={() => { setShowAddForm(!showAddForm); setEditingId(null); }}
        >
          {showAddForm ? <><X size={20} /> CANCEL</> : <><Plus size={20} /> ADD_REVIEW</>}
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="p-8" bg="bg-milestone-bg">
          <h2 className="font-headline text-2xl font-black uppercase mb-6">New Review</h2>
          <form action={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Name</label>
              <input name="name" required placeholder="Client Name"
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Role</label>
              <input name="role" required placeholder="CEO @ Company"
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Content</label>
              <textarea name="content" required placeholder="What they said..." rows={3}
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors resize-none" />
            </div>
            <div className="space-y-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest">Avatar URL</label>
              <input name="avatar" placeholder="https://..."
                className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none focus:bg-primary/20 transition-colors" />
            </div>
            <div className="flex items-end">
              <Button type="submit" variant="secondary" className="w-full py-4 text-xl" disabled={isPending}>
                {isPending ? "SAVING..." : "ADD_REVIEW"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Reviews List */}
      <div className="grid gap-8">
        {reviews.length === 0 ? (
          <Card className="p-12 text-center" bg="bg-white">
            <p className="font-body text-2xl font-bold opacity-30">NO_REVIEWS_FOUND</p>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="p-0 overflow-hidden" bg="bg-white">
              {editingId === review.id ? (
                /* Edit Mode */
                <form action={handleUpdate} className="p-8 space-y-6 bg-milestone-bg/30">
                  <input type="hidden" name="id" value={review.id} />
                  <div className="flex justify-between items-center">
                    <h3 className="font-headline text-2xl font-black uppercase">Editing: {review.name}</h3>
                    <Button type="button" variant="outline" className="p-2" onClick={() => setEditingId(null)}>
                      <X size={20} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-headline uppercase font-black text-sm tracking-widest">Name</label>
                      <input name="name" required defaultValue={review.name}
                        className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-headline uppercase font-black text-sm tracking-widest">Role</label>
                      <input name="role" required defaultValue={review.role}
                        className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="font-headline uppercase font-black text-sm tracking-widest">Content</label>
                      <textarea name="content" required defaultValue={review.content} rows={3}
                        className="w-full bg-white border-4 border-black p-4 font-body font-bold outline-none resize-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-headline uppercase font-black text-sm tracking-widest">Avatar URL</label>
                      <input name="avatar" defaultValue={review.avatar}
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
                <div className="p-8 flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex gap-6 flex-1">
                    {/* Avatar */}
                    {review.avatar && (
                      <img src={review.avatar} alt={review.name}
                        className="w-16 h-16 rounded-full border-4 border-black object-cover flex-shrink-0"
                        referrerPolicy="no-referrer" />
                    )}
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-headline text-2xl font-black uppercase">{review.name}</h3>
                        <span className="bg-milestone-bg px-3 py-1 border-2 border-black font-headline font-black uppercase text-xs">
                          {review.role}
                        </span>
                      </div>
                      <p className="font-body font-bold italic text-on-surface-variant leading-relaxed">
                        "{review.content}"
                      </p>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex md:flex-col gap-3 items-start">
                    <Button type="button" variant="outline" className="p-3"
                      onClick={() => { setEditingId(review.id); setShowAddForm(false); }}>
                      <Pencil size={18} />
                    </Button>
                    <form action={handleDelete}>
                      <input type="hidden" name="id" value={review.id} />
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
