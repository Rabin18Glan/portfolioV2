#!/usr/bin/env node
/**
 * Sends a test email through the configured SMTP relay (Brevo).
 *
 * Usage:
 *   npm run test:mail
 *   node --env-file=.env.local scripts/test-mail.mjs
 *   node --env-file=.env.local scripts/test-mail.mjs someone@example.com   # override recipient
 *
 * Requires Node >= 20.6 (for --env-file). Uses the NEXT_PRIVATE_SMTP_* vars
 * from .env.local; sender falls back to SMTP_USER and recipient to SMTP_FROM
 * when NEXT_PRIVATE_SMTP_FROM / NEXT_PRIVATE_SMTP_TO are not set.
 */
import nodemailer from "nodemailer";

const server = process.env.NEXT_PRIVATE_SMTP_SERVER;
const port = Number(process.env.NEXT_PRIVATE_SMTP_PORT || 587);
const user = process.env.NEXT_PRIVATE_SMTP_USER;
const key = process.env.NEXT_PRIVATE_SMTP_KEY;
const from = process.env.NEXT_PRIVATE_SMTP_FROM ?? user;
const to = process.argv[2] ?? process.env.NEXT_PRIVATE_SMTP_TO ?? from;

if (!server || !user || !key) {
  console.error(
    "Missing SMTP config. Check NEXT_PRIVATE_SMTP_SERVER / NEXT_PRIVATE_SMTP_USER / NEXT_PRIVATE_SMTP_KEY in .env.local."
  );
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: server,
  port,
  secure: port === 465,
  auth: { user, pass: key },
});

try {
  console.log(`Verifying SMTP connection to ${server}:${port} …`);
  await transporter.verify();
  console.log("SMTP connection OK.\n");

  const info = await transporter.sendMail({
    from: `"Portfolio" <${from}>`,
    to,
    subject: "Test email from your portfolio site",
    text: "This is a test email sent from scripts/test-mail.mjs. If you received it, SMTP is working!",
    html: "<p>This is a test email sent from <code>scripts/test-mail.mjs</code>. If you received it, SMTP is working!</p>",
  });

  console.log("Message sent successfully!");
  console.log(`  From:      ${from}`);
  console.log(`  To:        ${to}`);
  console.log(`  MessageId: ${info.messageId}`);
} catch (err) {
  console.error("Failed to send test email:");
  console.error(err);
  process.exit(1);
}
