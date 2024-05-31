import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '../components/Providers'; // Adjust the path as necessary

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Move Monsters',
  description: 'Learn how to develop Sui apps with Move',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}