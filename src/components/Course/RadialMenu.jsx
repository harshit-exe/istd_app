import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export function RadialMenu({ items, onClose }) {
  const itemCount = items.length;
  const angleStep = (2 * Math.PI) / itemCount;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className="relative w-64 h-64">
        {items.map((item, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const x = Math.cos(angle) * 100;
          const y = Math.sin(angle) * 100;

          return (
            <motion.div
              key={item.name}
              className="absolute w-16 h-16"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x, y, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              <Link
                href={item.link}
                className="flex flex-col items-center justify-center w-full h-full bg-white rounded-full shadow-lg hover:bg-blue-100 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Icon icon={item.icon} className="w-6 h-6 text-blue-600" />
                <span className="text-xs font-medium text-gray-800 mt-1">{item.name}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

