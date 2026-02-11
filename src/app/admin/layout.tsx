export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </div>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
