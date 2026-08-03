import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("timeline")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.warn("Supabase error fetching timeline:", error.message);
      return NextResponse.json([]);
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("Error fetching timeline API:", err);
    return NextResponse.json([]);
  }
}
