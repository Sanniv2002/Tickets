import React from 'react';
import { X, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEDxLogo } from './TEDxLogo';

interface NotificationPopupProps {
  show: boolean;
  onClose: () => void;
  onBook?: () => void;
}

export const NotificationPopup: React.FC<NotificationPopupProps> = ({
  show,
  onClose,
  onBook = () => {},
}) => (
  <AnimatePresence>
    {show && (
      <motion.div 
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="fixed right-0 top-4 mx-4 md:max-w-md bg-zinc-900 rounded-lg shadow-2xl border-l-4 border-[#e62b1e]"
      >
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="relative">
              <TEDxLogo />
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-2 -right-2 bg-[#e62b1e] rounded-full p-1"
              >
                <Percent className="w-3 h-3 text-white" />
              </motion.div>
            </div>
            
            {/* Content */}
            <motion.div 
              className="flex-1 min-w-0"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-[#e62b1e]/10 rounded-md px-3 py-1 inline-block mb-2"
              >
                <span className="text-[#e62b1e] text-sm font-semibold">20% OFF</span>
              </motion.div>
              <h3 className="text-base font-semibold text-white">
                Early Bird Special!
              </h3>
              <div className="mt-2 text-sm text-zinc-300">
                <p>Book your TEDx tickets now and save 20%! Limited time offer ends March 31st.</p>
              </div>
              
              {/* Action buttons */}
              <motion.div 
                className="mt-4 flex gap-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="px-4 py-2 text-sm font-semibold bg-[#e62b1e] hover:bg-[#b62218] text-white rounded-md transition-colors shadow-lg shadow-red-900/30"
                  onClick={onBook}
                >
                  Claim Discount
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="px-4 py-2 text-sm font-semibold bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors"
                  onClick={onClose}
                >
                  Maybe Later
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-zinc-500 hover:text-zinc-300 focus:outline-none transition-colors"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);