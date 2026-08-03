import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { sendContactEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const { name, email, tel, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Primary delivery: email the message via SMTP.
    try {
      await sendContactEmail({ name, email, tel, message });
    } catch (err) {
      console.error("Failed to send contact email:", err);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 502 }
      );
    }

    // Best-effort: also log the message to the Supabase admin inbox.
    // The email already went out, so a logging failure is not fatal.
    try {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);

      const { error } = await supabase.from("messages").insert([
        {
          name,
          email,
          tel: tel || null,
          message,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.warn("Could not write message to Supabase log:", error.message);
      }
    } catch (err) {
      console.warn("Could not write message to Supabase log:", err);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (err) {
    console.error("Error in contact API:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
