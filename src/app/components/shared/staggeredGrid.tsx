// @/components/shared/StaggeredGrid.tsx
"use client";

import { motion } from "framer-motion";

export const StaggerContainer = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-16"
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: 0.14 } },
    }}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.18 }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 28 },
      show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
    }}
    whileHover={{ y: -4 }}
  >
    {children}
  </motion.div>
);