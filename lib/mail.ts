import nodemailer from "nodemailer";

interface ContactMessage {
  name: string;
  email: string;
  tel?: string | null;
  message: string;
}

/**
 * Sends the contact form submission as two emails over SMTP (Brevo):
 *   1. A notification with the message details to the site owner
 *      (NEXT_PRIVATE_SMTP_TO, defaults to the sender).
 *   2. A thank-you confirmation to the visitor's own email address.
 *      Best-effort — a bad visitor address must not break the owner's copy.
 *
 * Server-only env vars (never NEXT_PUBLIC_*):
 *   NEXT_PRIVATE_SMTP_SERVER  – SMTP relay host
 *   NEXT_PRIVATE_SMTP_PORT    – port (587 for TLS, 465 for SSL)
 *   NEXT_PRIVATE_SMTP_USER    – SMTP login
 *   NEXT_PRIVATE_SMTP_KEY     – SMTP key/password
 *   NEXT_PRIVATE_SMTP_FROM    – verified sender (optional, defaults to SMTP_USER)
 *   NEXT_PRIVATE_SMTP_TO      – owner recipient (optional, defaults to sender)
 */
export async function sendContactEmail({
  name,
  email,
  tel,
  message,
}: ContactMessage): Promise<void> {
  const smtpHost = process.env.NEXT_PRIVATE_SMTP_SERVER;
  const smtpPort = Number(process.env.NEXT_PRIVATE_SMTP_PORT || 587);
  const smtpUser = process.env.NEXT_PRIVATE_SMTP_USER;
  const smtpKey = process.env.NEXT_PRIVATE_SMTP_KEY;

  if (!smtpHost || !smtpUser || !smtpKey) {
    throw new Error("SMTP is not configured. Check the NEXT_PRIVATE_SMTP_* env vars.");
  }

  const from = process.env.NEXT_PRIVATE_SMTP_FROM ?? smtpUser;
  const to = process.env.NEXT_PRIVATE_SMTP_TO ?? from;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpKey },
  });

  // 1. Notification to the site owner (primary — failures surface to the caller)
  await transporter.sendMail({
    from: `"Portfolio Contact" <${from}>`,
    replyTo: email,
    to,
    subject: `New portfolio message from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      tel ? `Phone: ${tel}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  // 2. Thank-you confirmation to the visitor (best-effort)
  await transporter.sendMail({
    from: `"Rabin Glan" <${from}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}!`,
    text: [
      `Hi ${name},`,
      "",
      "Thanks for getting in touch! I've received your message and will get back to you as soon as I can.",
      "",
      "Best,",
      "Rabin Glan",
    ].join("\n"),
  }).catch((err) => {
    console.warn("Could not send thank-you email to visitor:", err.message);
  });
}
