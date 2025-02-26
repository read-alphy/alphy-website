import { Inter } from "next/font/google";
import "./globals.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alphy",
  description: "Convert audio to text, learn better with summaries and AI assistants, and use AI to create on top of YouTube, X Spaces, and Podcasts. Try Alphy for free!",
};

export default function RootLayout({ children }) {
  return (
    <>
      
      <main className={inter.className}>{children}</main>
      
    </>
  );
}
