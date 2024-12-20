'use client';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { addTokenInterceptors, refreshTokenInterceptors } from '@/lib/axiosApi';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

addTokenInterceptors(store);
refreshTokenInterceptors(store);


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang='en'>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-purple-100`}>
          {children}
        </body>
      </html>
    </Provider>
  );
}
