import { motion } from 'framer-motion';
import CircularLogo from '@/components/CircularLogo';
import Title from '@/components/Title';
import { ServiceDataProps } from '../data/ServicesData';

function ServiceCard({ title, skills }: ServiceDataProps) {

  const [title1, title2] = title.split(' ');
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative w-full rounded-3xl p-px bg-gradient-to-br from-primary-400/70 via-gray-200/70 to-primary-600/50 dark:from-primary-500/50 dark:via-dark-border dark:to-primary-700/40 shadow-lg shadow-gray-200/60 dark:shadow-black/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-600/25"
    >
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-white dark:bg-dark-card/80 backdrop-blur-md border border-gray-100 dark:border-dark-border px-6 py-10 overflow-hidden">
        {/* Gold glow on hover */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary-400/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-primary-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />

        {/* Gold top accent bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-b-full bg-gradient-to-r from-primary-300 via-primary-500 to-primary-700 opacity-80 transition-all duration-500 group-hover:w-24" />

        <div className="relative flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            <Title fontSize="28px" title={title1} />
            {title2 && <Title fontSize="28px" title={title2} />}
          </div>

          <div className="w-14 h-px bg-gradient-to-r from-transparent via-primary-500/70 to-transparent" />

          <div className="flex flex-wrap gap-4 justify-center">
            {skills.map((logo, index) => {
              return <CircularLogo key={index} logo={logo} className='border border-primary-600/25' />
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceCard
