import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import ClientMain from "./ClientMain";

export const revalidate = 0; // Dynamic rendering, always read fresh cookies and database state

export default async function Page() {
  // Access Next.js cookies store
  const cookieStore = await cookies();
  
  // Initialize server-side Supabase client with cookies
  const supabase = createClient(cookieStore);

  // Example Server-Side Fetching: Retrieve current hero profile information
  const { data: heroData, error: heroError } = await supabase
    .from("hero")
    .select("*")
    .single();

  if (heroError) {
    console.log("Server-side fetching placeholder/fallback alert: Hero table not configured yet.", heroError.message);
  } else {
    console.log("Server-side fetched Hero data successfully:", heroData);
  }

  // Example Server-Side Fetching: Retrieve current status
  const { data: statusData, error: statusError } = await supabase
    .from("status")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (statusError) {
    console.log("Server-side fetching placeholder/fallback alert: Status table not configured yet.", statusError.message);
  } else {
    console.log("Server-side fetched Status data successfully:", statusData);
  }

  return (
    <main className="flex-grow">
      {/* We can pass server-fetched initial data or let components hydrate client-side via APIs */}
      <ClientMain />
    </main>
  );
}