
import { useEffect, useState } from 'react';
import { fetchTimeline, TimelineItemData } from '../data/timeline';
import { motion } from 'framer-motion';

function TimelineMapping() {
    const [timelineItems, setTimelineItems] = useState<TimelineItemData[]>([]);

    useEffect(() => {
        fetchTimeline().then(setTimelineItems);
    }, []);

    return (
        <div className="relative flex flex-col gap-12 py-10 w-full max-w-7xl mx-auto px-4">
             {/* Vertical Line - Gold Gradient */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-300 via-primary-500 to-primary-800 dark:from-primary-500/60 dark:via-primary-600/60 dark:to-primary-900 transform md:-translate-x-1/2 rounded-full opacity-70"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-8 relative z-20"
            >
               <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/15 text-primary-700 dark:text-primary-300 border border-primary-300/60 dark:border-primary-500/30 text-sm font-bold uppercase tracking-widest">
                 My Journey
               </span>
            </motion.div>

            {timelineItems.map((data, index) => {
                const isLeft = index % 2 === 0;
                return (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                        className={`relative flex md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                         {/* Content Card Side */}
                        <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                            <div className="group relative rounded-2xl p-px bg-gradient-to-br from-primary-400/70 via-gray-200/70 to-primary-600/50 dark:from-primary-500/50 dark:via-dark-border dark:to-primary-700/40 shadow-lg shadow-gray-200/60 dark:shadow-black/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-600/25">
                                <div className={`relative p-6 bg-white dark:bg-dark-card/80 backdrop-blur-sm rounded-[calc(1rem-1px)] border border-gray-100 dark:border-dark-border overflow-hidden`}>
                                    {/* Gold corner glow on hover */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary-400/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                    <span className="relative inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-primary-700 dark:text-primary-300 uppercase bg-primary-100 dark:bg-primary-500/15 border border-primary-300/60 dark:border-primary-500/30 rounded-full">
                                        {data.date}
                                    </span>
                                    <h3 className="relative text-xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {data.title}
                                    </h3>
                                    <p className="relative text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                                        {data.taskDone}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Dot */}
                        <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-dark-bg border-4 border-primary-200 dark:border-primary-700 z-10 flex items-center justify-center shadow-lg shadow-primary-600/20 transition-all duration-300 group-hover:border-primary-600 group-hover:shadow-primary-600/40 group-hover:scale-110">
                           <div className="transform scale-75 group-hover:scale-90 transition-transform duration-300">
                             {data.icon}
                           </div>
                        </div>

                         {/* Empty Space for alignment on Desktop */}
                        <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                        
                    </motion.div>
                )
            })}

             <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center mt-8 relative z-20"
            >
               <span className="text-primary-500/70 dark:text-primary-400/70 text-xs font-bold uppercase tracking-[0.3em]">To be continued</span>
            </motion.div>
        </div>
    )
}
export default TimelineMapping;
