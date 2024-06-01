

'use client';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }) {
  return (
    <>
      <Toaster position='top-center' />
      {children}
    </>
  );
}
