import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { getMessages, deleteMessage } from "@/app/actions";
import { Mail, Clock, User, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  let messages: any[] = [];
  try {
    messages = await getMessages();
  } catch (error) {
    console.error("Messages fetch failed:", error);
  }

  return (
    <div className="py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-[8px] border-black pb-8">
        <div className="space-y-2">
          <Link href="/admin" className="inline-flex items-center gap-2 font-headline font-black uppercase text-sm tracking-widest text-on-surface-variant hover:text-hero-bg transition-colors mb-2">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter">
            <Mail className="inline mr-4" size={48} />Messages
          </h1>
          <p className="font-body text-xl font-bold text-on-surface-variant">
            Incoming Communications: {messages.length}
          </p>
        </div>
      </div>

      {/* Messages List */}
      <div className="grid gap-8">
        {messages.length === 0 ? (
          <Card className="p-12 text-center" bg="bg-white">
            <p className="font-body text-2xl font-bold opacity-30">NO_MESSAGES_DETECTED</p>
          </Card>
        ) : (
          messages.map((msg) => (
            <Card key={msg.id} className="p-8 group" bg="bg-white">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap gap-4 text-sm font-headline font-black uppercase tracking-wider">
                    <span className="bg-primary-container px-3 py-1 border-2 border-black flex items-center gap-2">
                      <User size={14} /> {msg.name}
                    </span>
                    <span className="bg-about-bg px-3 py-1 border-2 border-black flex items-center gap-2">
                      <Mail size={14} /> {msg.email}
                    </span>
                    <span className="bg-[#eee] px-3 py-1 border-2 border-black flex items-center gap-2">
                      <Clock size={14} /> {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 border-4 border-black p-6 font-body font-bold text-lg leading-relaxed whitespace-pre-wrap">
                    {msg.payload}
                  </div>
                </div>

                <form action={deleteMessage} className="flex items-start">
                  <input type="hidden" name="id" value={msg.id} />
                  <Button 
                    type="submit"
                    variant="outline" 
                    className="p-4 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 />
                  </Button>
                </form>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
