import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Rubik, Inter } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['500', '700', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Bharath Naidu | Portfolio',
  description: "The professional portfolio of Bharath Naidu, showcasing expertise in web development and design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{scrollBehavior:'smooth'}}>
      <body className={cn("font-body antialiased bg-background text-foreground", inter.variable, rubik.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
