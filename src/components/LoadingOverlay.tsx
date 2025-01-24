import { motion } from 'framer-motion';

function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-12"
    >
      {/* TEDxNITKKR Text Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center text-4xl font-bold"
      >
        <motion.span 
          className="text-white tracking-tight"
          animate={{ color: ['#ffffff', '#ff4444', '#ffffff'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          TED
        </motion.span>
        <motion.span 
          className="text-red-600"
        >
          x
        </motion.span>
        <motion.span 
          className="bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          NITKKR
        </motion.span>
      </motion.div>

      {/* Animated Loader */}
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-red-600/20 rounded-full"
          animate={{ 
            rotate: 360,
            borderColor: ['rgba(220, 38, 38, 0.2)', 'rgba(220, 38, 38, 0.5)', 'rgba(220, 38, 38, 0.2)']
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            borderColor: { duration: 2, repeat: Infinity }
          }}
        />
        <motion.div
          className="absolute inset-0 w-16 h-16 border-4 border-t-red-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white text-lg font-medium text-center"
      >
        Saving Progress 
      </motion.p>
    </motion.div>
  );
}

export default LoadingOverlay;