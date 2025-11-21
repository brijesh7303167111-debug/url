import './globals.css';
export const metadata = {
  title: "URL Shortener",
  description: "Frontend connected to Node backend",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
