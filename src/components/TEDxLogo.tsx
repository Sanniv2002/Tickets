import { motion } from 'framer-motion';

export const TEDxLogo = () => (
  <motion.div 
    className="flex-shrink-0"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
  >
    <div className="w-12 h-12 bg-[#e62b1e] rounded-lg flex items-center justify-center shadow-lg shadow-red-900/30 relative overflow-hidden">
      <div className="text-white font-bold leading-none">
        <span className="text-lg tracking-tighter">TED</span>
        <span className="text-xs absolute bottom-1 right-1">x</span>
      </div>
    </div>
  </motion.div>
);