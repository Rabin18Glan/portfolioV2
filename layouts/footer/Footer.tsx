"use client";

import useScrollToContext from '../../context/useScrollToContext';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const { handleScrollTo } = useScrollToContext();

    if (pathname === "/chat") {
        return null;
    }

    return (
        <footer className="border-t border-gray-100 dark:border-dark-border bg-white dark:bg-dark-bg w-full pt-20 pb-10 transition-colors duration-500">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
                
                {/* Upper Section: CTA & About */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                    <div className="lg:col-span-5 space-y-6">
                        <div className="cursor-pointer inline-block" onClick={handleScrollTo('home')}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/RG.png" alt="RG logo" className="h-20 w-auto" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-md font-medium">
                            Crafting high-performance digital experiences with a focus on clean architecture, 
                            scalability, and user-centric design. Let&apos;s build the future together.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <motion.a 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="mailto:robinjsl321@gmail.com" 
                                className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm"
                            >
                                <span className="material-icons text-2xl">email</span>
                            </motion.a>
                            <motion.a 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="tel:+9779840469397" 
                                className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm"
                            >
                                <span className="material-icons text-2xl">phone</span>
                            </motion.a>
                            <motion.a 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="https://github.com/Rabin18Glan" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm"
                            >
                                <span className="material-icons text-2xl">code</span>
                            </motion.a>
                        </div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col justify-center items-start lg:items-end">
                        <div className="bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border p-8 rounded-3xl max-w-lg w-full">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Have a project in mind?</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                                I am currently available for new opportunities, freelance work, and technical advisory.
                            </p>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleScrollTo('contact')}
                                className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all text-sm tracking-wide uppercase cursor-pointer"
                            >
                                Contact Me
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Lower Section: Copyright */}
                <div className="pt-8 border-t border-gray-100 dark:border-dark-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Rabin Glan. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</a>
                        <a href="/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
