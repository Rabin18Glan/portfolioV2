import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AdminShell from "@/features/admin/components/AdminShell";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // On the dashboard subdomain the login page lives at /login (the proxy
    // rewrites it to /admin/login) — keep the URL bar pretty.
    const headerList = await headers();
    const onDashboard = headerList.get("x-dashboard") === "1";
    redirect(onDashboard ? "/login" : "/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
