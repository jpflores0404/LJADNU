"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/auth";
import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    const res = await loginAction(formData);
    
    if (res.error) {
      setError(res.error);
      setIsLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">ADNU EHR</h1>
          <p className="text-slate-600">Maternity & Birthing Home</p>
        </div>

        {error && (
          <div className="bg-rose-100/80 backdrop-blur-sm border border-rose-200/50 text-rose-700 px-4 py-3 rounded-xl text-sm font-medium mb-6 animate-pulse">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                name="username" 
                type="text" 
                required 
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" 
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                name="password" 
                type="password" 
                required 
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full glass-button-primary py-3 rounded-xl font-bold text-lg tracking-wide transition-all shadow-lg flex justify-center items-center h-[52px]"
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center text-xs text-slate-500 font-medium tracking-wide">
          <p>Secure Academic Healthcare Portal</p>
        </div>
      </div>
    </div>
  );
}
