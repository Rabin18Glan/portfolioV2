"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          tel: data.get("tel"),
          message: data.get("mes"),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Failed to send message.");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  const inputClass =
    "w-full py-4 px-6 rounded-2xl bg-gray-50 dark:bg-dark-card/50 border border-gray-200 dark:border-dark-border focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 outline-none transition-all dark:text-white";

  let submitButtonText = "Send Message";
  if (status === "sending") {
    submitButtonText = "Sending…";
  }

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex flex-col gap-5 w-full max-w-lg mx-auto bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-dark-border"
      onSubmit={sendEmail}
    >
      <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className={inputClass}
        />
      </motion.div>

      <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className={inputClass}
        />
      </motion.div>

      <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        <input
          type="tel"
          name="tel"
          placeholder="Phone Number (Optional)"
          className={inputClass}
        />
      </motion.div>

      <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
        <textarea
          name="mes"
          placeholder="Write your message here..."
          rows={4}
          required
          className={`${inputClass} resize-none`}
        />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 rounded-2xl bg-primary-600 text-white font-bold text-lg shadow-lg shadow-primary-600/30 hover:bg-primary-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {submitButtonText}
      </motion.button>

      {status === "success" && (
        <p className="text-sm text-green-500 font-medium text-center">
          Message sent successfully!
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-500 font-medium text-center">
          Failed to send message. Please try again.
        </p>
      )}
    </motion.form>
  );
}

export default ContactForm;
