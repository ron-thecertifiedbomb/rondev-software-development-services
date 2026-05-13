import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/auth/sign-in");

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr]">
      <aside className="border-b md:border-b-0 md:border-r p-4">
        <div className="text-sm font-semibold">Admin</div>
        <nav className="mt-4 space-y-2 text-sm">
          <Link className="block rounded-lg px-3 py-2 hover:bg-slate-50" href="/admin">Dashboard</Link>
          <Link className="block rounded-lg px-3 py-2 hover:bg-slate-50" href="/admin/services">Services</Link>
          <Link className="block rounded-lg px-3 py-2 hover:bg-slate-50" href="/admin/staff">Staff</Link>
          <Link className="block rounded-lg px-3 py-2 hover:bg-slate-50" href="/admin/bookings">Bookings</Link>
          <Link className="block rounded-lg px-3 py-2 hover:bg-slate-50" href="/admin/settings/hours">Business Hours</Link>
        </nav>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  );
}
