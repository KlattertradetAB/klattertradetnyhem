"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement actual authentication
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center justify-center gap-3 mb-6">
            <Image
              src="/logo2.png"
              alt="Horizonten gemenskap"
              width={56}
              height={56}
              className="object-contain"
            />
            <span className="text-white text-xl font-medium">Horizonten gemenskap</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl text-foreground font-light tracking-wide">
            Logga in på ditt konto
          </h1>
          <p className="text-foreground/60 mt-3 text-sm">
            Välkommen tillbaka till vår community för betalmedlemmar
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
              E-postadress
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="din@email.se"
              className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-[#b35c2a] focus:ring-1 focus:ring-[#b35c2a] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground/80 mb-2">
              Lösenord
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ange ditt lösenord"
              className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-[#b35c2a] focus:ring-1 focus:ring-[#b35c2a] transition-colors"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-foreground/20 bg-foreground/5 text-[#b35c2a] focus:ring-[#b35c2a] focus:ring-offset-0"
              />
              <span className="text-foreground/60">Kom ihåg mig</span>
            </label>
            <Link href="/forgot-password" className="text-[#b35c2a] hover:text-[#9a4f24] transition-colors">
              Glömt lösenord?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-8 py-3 bg-[#b35c2a] hover:bg-[#9a4f24] disabled:bg-[#b35c2a]/50 text-white font-medium rounded-lg transition-colors duration-200 shadow-md"
          >
            {isLoading ? "Loggar in..." : "Logga in"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-foreground/50 text-sm">
            Inte medlem än?{" "}
            <Link href="/#bli-medlem" className="text-[#b35c2a] hover:text-[#9a4f24] transition-colors">
              Bli medlem idag
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-foreground/40 hover:text-foreground/60 text-sm transition-colors">
            Tillbaka till startsidan
          </Link>
        </div>
      </div>
    </div>
  );
}
