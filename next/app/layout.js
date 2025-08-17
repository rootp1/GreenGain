import './globals.css';
import { AuthProvider } from '../components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutClient from '../components/LayoutClient';
// Google fonts via next/font for better performance & no FOUT
import { Pixelify_Sans, VT323, Poppins } from 'next/font/google';

const pixelify = Pixelify_Sans({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-pixel' });
const vt323 = VT323({ subsets: ['latin'], weight: '400', variable: '--font-mono' });
const poppins = Poppins({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-poppins' });

export const metadata = {
  title: 'GreenGain',
  description: 'GreenGain Next.js app'
};

export default function RootLayout({ children }) {
  return (
  <html lang="en" className={`${pixelify.variable} ${vt323.variable} ${poppins.variable}`}>
      <body className="app-body font-pixel">
        <AuthProvider>
          <LayoutClient>
            {children}
            <ToastContainer position="top-right" />
          </LayoutClient>
        </AuthProvider>
      </body>
    </html>
  );
}
