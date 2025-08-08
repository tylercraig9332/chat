export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="max-w-md mx-auto gap-4 my-20  p-4 border border-border rounded-lg bg-accent">
        {children}
      </div>
    );
  }