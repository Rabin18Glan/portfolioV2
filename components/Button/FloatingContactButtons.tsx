"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const PHONE_NUMBER = "+9779840469397";
const WHATSAPP_URL = `https://wa.me/9779840469397?text=${encodeURIComponent(
  "Hi Rabin, I came across your portfolio and would like to connect."
)}`;

export default function FloatingContactButtons() {
  const pathname = usePathname();

  // Hide on /chat page (clean chat workspace) and admin dashboard routes
  if (pathname === "/chat" || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3"
      role="region"
      aria-label="Direct contact buttons"
    >
      {/* WhatsApp Button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        whileHover={{ scale: 1.12, y: -2 }}
        whileTap={{ scale: 0.92 }}
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 hover:shadow-xl hover:shadow-[#25D366]/50 transition-shadow cursor-pointer"
      >
        <WhatsAppIcon sx={{ fontSize: "28px" }} />
        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-gray-900/90 dark:bg-dark-card/95 text-white dark:text-gray-100 text-xs font-semibold px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md border border-white/10 hidden sm:inline-block">
          WhatsApp
        </span>
      </motion.a>

      {/* Phone Call Button */}
      <motion.a
        href={`tel:${PHONE_NUMBER}`}
        aria-label="Call Rabin Glan"
        title="Call +977 9840469397"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.12, y: -2 }}
        whileTap={{ scale: 0.92 }}
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/35 hover:shadow-xl hover:shadow-primary-600/50 hover:bg-primary-500 transition-all cursor-pointer"
      >
        <PhoneIcon sx={{ fontSize: "26px" }} />
        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-gray-900/90 dark:bg-dark-card/95 text-white dark:text-gray-100 text-xs font-semibold px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md border border-white/10 hidden sm:inline-block">
          Call Me
        </span>
      </motion.a>
    </div>
  );
}
