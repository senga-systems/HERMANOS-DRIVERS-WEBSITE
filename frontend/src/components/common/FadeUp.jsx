import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable scroll animation component that fades and slides up content as it enters viewport.
 */
export default function FadeUp({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
