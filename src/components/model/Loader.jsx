import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ size = 'md', color = 'white' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const colors = {
    white: 'border-white',
    indigo: 'border-indigo-600',
    gray: 'border-gray-600',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizes[size]} border-2 ${colors[color]} border-t-transparent rounded-full`}
    />
  );
};

export default Loader;