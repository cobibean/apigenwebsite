import AdminLoginForm from "./ui/AdminLoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  const { redirect, error } = await searchParams;
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold text-primary font-sans">Admin Login</h1>
      <p className="mt-2 text-sm text-secondary font-body">
        Sign in to manage carousel images.
      </p>
      <div className="mt-6">
        <AdminLoginForm redirectTo={redirect} error={error} />
      </div>
    </div>
  );
}
