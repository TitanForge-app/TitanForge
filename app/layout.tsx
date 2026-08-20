import React from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#11131a] text-white font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}