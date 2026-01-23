import "./globals.css";

export const metadata = {
  title: "English Booster | Further Corporate",
  description: "From daily communication to client impact",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
