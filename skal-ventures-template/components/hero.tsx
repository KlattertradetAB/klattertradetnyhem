"use client";

import Link from "next/link";
import { GL } from "./gl";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { useState } from "react";

export function Hero() {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="flex flex-col h-svh justify-between">
      <GL hovering={hovering} />

      <div className="pb-16 mt-auto text-center relative">
        <Pill className="mb-6">BETA RELEASE</Pill>
        
        <h1 className="font-serif text-4xl text-foreground text-balance mt-4 sm:text-8xl">
          Välkommen till Horizonten gemenskap
        </h1>
        
        <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[680px] mx-auto">
          Du som betalande medlem använder ditt vanliga inlogg på alternativet nedanför. För er som inte är betalande medlemmar går det bra att höra av sig!                                   
        </p>

        <Link href="/login" className="inline-block mt-10">
          <button
            className="px-8 py-3 bg-[#b35c2a] hover:bg-[#9a4f24] text-white font-medium rounded-lg transition-colors duration-200 shadow-md"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            Logga in
          </button>
        </Link>

        <Link className="contents max-sm:hidden" href="/#contact">
          <Button
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Contact Us]
          </Button>
        </Link>
        <Link className="contents sm:hidden" href="/#contact">
          <Button
            size="sm"
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Contact Us]
          </Button>
        </Link>
      </div>
    </div>
  );
}
