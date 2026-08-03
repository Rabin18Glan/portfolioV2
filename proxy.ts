import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// The admin panel lives at /admin on the main domain and at the root of the
// dashboard subdomain (dashboard.rabinglan.com.np).
const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || "rabinglan.com.np";
const DASHBOARD_DOMAIN =
  process.env.NEXT_PUBLIC_ADMIN_DOMAIN || `dashboard.${SITE_DOMAIN}`;

function isDashboardHost(hostname: string): boolean {
  return (
    hostname === DASHBOARD_DOMAIN ||
    (hostname.endsWith(`.${DASHBOARD_DOMAIN}`) && hostname.startsWith("dashboard"))
  );
}

export async function proxy(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;
  const onDashboard = isDashboardHost(hostname);

  // On the dashboard subdomain, map bare paths onto the admin section:
  //   /          -> /admin
  //   /projects  -> /admin/projects
  //   /login     -> /admin/login
  // /admin/* paths are left untouched so links work on both domains.
  const adminPath = onDashboard
    ? pathname.startsWith("/admin")
      ? pathname
      : pathname === "/"
        ? "/admin"
        : `/admin${pathname}`
    : pathname;

  const isAdmin = adminPath.startsWith("/admin");
  const isLogin = adminPath === "/admin/login";

  // Pass route type to root layout via request header:
  // "slim" for admin/login, "full" for the public site.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-route-type", isAdmin || isLogin ? "slim" : "full");

  // Rewrite the dashboard subdomain onto the admin section so Next renders
  // the admin pages (URL bar keeps the pretty path, e.g. /projects).
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = adminPath;

  const response = onDashboard
    ? NextResponse.rewrite(rewriteUrl, {
        request: { headers: requestHeaders },
      })
    : NextResponse.next({ request: { headers: requestHeaders } });

  // Refresh + protect admin routes — only if a session cookie exists
  if (isAdmin || isLogin) {
    const hasSession = request.cookies.getAll().some((c) =>
      c.name.startsWith("sb-"),
    );

    if (hasSession) {
      const supabase = createServerClient(
        supabaseUrl!,
        supabaseKey!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
              for (const { name, value, options } of cookiesToSet) {
                response.cookies.set(name, value, options);
              }
            },
          },
        },
      );

      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Protect the admin panel — redirect to login when signed out
      if (isAdmin && !isLogin && !user) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = onDashboard ? "/login" : "/admin/login";
        redirectUrl.searchParams.set("next", adminPath);
        return NextResponse.redirect(redirectUrl);
      }

      // Already signed in — skip the login page
      if (isLogin && user) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = onDashboard ? "/" : "/admin";
        redirectUrl.searchParams.delete("next");
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, icons, or static resources
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
