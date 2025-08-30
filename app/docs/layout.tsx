export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-card text-card-foreground">
      {children}
    </div>
  );
}
