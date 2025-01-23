import { motion } from 'framer-motion';

function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-12"
    >
      {/* TEDx Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center"
      >
        <span className="text-white text-4xl font-bold tracking-tight">TED</span>
        <span className="text-red-600 text-4xl font-bold">x</span>
      </motion.div>

      {/* Simple Spinner */}
      <motion.div
        className="w-12 h-12 border-4 border-white/20 border-t-red-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white text-lg font-medium"
      >
        Saving your journey...
      </motion.p>
    </motion.div>
  );
}

export default LoadingOverlay;