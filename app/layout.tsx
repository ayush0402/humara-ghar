import "./globals.css";

export const metadata = {
  title: "HumaraGhar",
  description: "Rent properties and find suitable roommates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* check if these flex properties are needed */}
      <main className="min-h-screen flex flex-col items-center">
        {children}
      </main>
    </html>
  );
}
