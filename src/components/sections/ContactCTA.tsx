"use client";

import React, { useState, useTransition } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Send, CheckCircle2 } from 'lucide-react';
import { submitContactForm } from '@/app/actions';

export const ContactCTA: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(async () => {
      try {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('message', formData.message);
        
        await submitContactForm(data);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Custom mailto fallback if requested or just rely on server action
        // Actually, the user asked to REPLACE the mailto logic.
      } catch (error) {
        console.error("Submission failed", error);
        alert("Failed to transmit message. Please ensure database is connected.");
      }
    });
  };

  if (isSuccess) {
    return (
      <section id="contact" className="py-24 max-w-4xl mx-auto">
        <Card bg="bg-primary-container" className="p-12 text-center space-y-6">
          <CheckCircle2 size={80} className="mx-auto text-black" />
          <h2 className="font-headline text-5xl font-black uppercase">Message_Received</h2>
          <p className="font-body text-xl font-bold">Your payload has been securely stored in the database. I'll get back to you soon.</p>
          <Button onClick={() => setIsSuccess(false)} variant="secondary">Send Another</Button>
        </Card>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 max-w-4xl mx-auto">
      <Card bg="bg-primary-container" className="p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Send size={200} />
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">
              Let's Build_
            </h2>
            <p className="font-body text-xl font-bold text-black max-w-2xl mx-auto">
              Ready to start your next project? Send me a message and let's turn your vision into a high-performance reality.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-headline uppercase font-black text-sm tracking-widest text-black">User_Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="ENTER NAME"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border-4 border-black p-4 font-body font-bold focus:bg-primary transition-colors outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="font-headline uppercase font-black text-sm tracking-widest text-black">Return_Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="EMAIL@DOMAIN.COM"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white border-4 border-black p-4 font-body font-bold focus:bg-primary transition-colors outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-headline uppercase font-black text-sm tracking-widest text-black">Message_Payload</label>
              <textarea 
                required
                placeholder="DESCRIBE YOUR VISION..." 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white border-4 border-black p-4 font-body font-bold focus:bg-primary transition-colors outline-none resize-none"
              ></textarea>
            </div>
            <Button 
              type="submit" 
              variant="secondary" 
              size="lg" 
              className="w-full py-6 text-3xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPending}
            >
              {isPending ? 'Transmitting...' : 'Transmit_Message'}
            </Button>
          </form>
        </div>
      </Card>
    </section>
  );
};
