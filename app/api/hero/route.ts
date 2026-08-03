import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("hero")
      .select("*")
      .single();

    if (error) {
      console.warn("Supabase error fetching hero:", error.message);
      return NextResponse.json(null);
    }

    return NextResponse.json(data ?? null);
  } catch (err) {
    console.error("Error fetching hero API:", err);
    return NextResponse.json(null);
  }
}
