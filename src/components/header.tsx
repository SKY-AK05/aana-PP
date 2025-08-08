"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="text-2xl font-bold font-headline tracking-tighter text-white">
            BHARATH
          </Link>

          <Button variant="outline" className="rounded-full border-stone-600 text-stone-300 hover:bg-stone-800/50 hover:text-white">
            <span className="mr-2">MENU</span>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
