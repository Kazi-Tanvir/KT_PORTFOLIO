"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/app/actions";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await adminLogin(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md p-8 space-y-8" bg="bg-white">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary-container border-4 border-black mx-auto flex items-center justify-center rotate-3 scale-110 mb-4">
            <Lock size={32} />
          </div>
          <h1 className="font-headline text-4xl font-black uppercase tracking-tighter">Admin_Access</h1>
          <p className="font-body font-bold text-on-surface-variant">Enter clearance credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-headline uppercase font-black text-sm tracking-widest px-1">Username</label>
            <input
              name="username"
              required
              type="text"
              placeholder="IDENTIFIER"
              className="w-full bg-white border-4 border-black p-4 font-body font-bold focus:bg-primary/20 transition-colors outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="font-headline uppercase font-black text-sm tracking-widest px-1">Password</label>
            <input
              name="password"
              required
              type="password"
              placeholder="SECRET_KEY"
              className="w-full bg-white border-4 border-black p-4 font-body font-bold focus:bg-primary/20 transition-colors outline-none"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-100 border-4 border-red-500 text-red-700 font-bold font-body">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full py-4 text-xl disabled:opacity-50" 
            disabled={isLoading}
          >
            {isLoading ? "AUTHORIZING..." : "INITIALIZE_SESSION"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
