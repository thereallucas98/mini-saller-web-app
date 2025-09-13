import { motion, Variants } from 'framer-motion'

export const Loader = () => {
  return (
    <div className="grid h-full w-full place-content-center bg-transparent px-4 py-24">
      <BarLoaders />
    </div>
  )
}

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 1,
      ease: 'circIn',
    },
  },
} as Variants

export const BarLoaders = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-accent-purple" />
      <motion.div variants={variants} className="h-12 w-2 bg-accent-purple" />
      <motion.div variants={variants} className="h-12 w-2 bg-accent-purple" />
      <motion.div variants={variants} className="h-12 w-2 bg-accent-purple" />
      <motion.div variants={variants} className="h-12 w-2 bg-accent-purple" />
    </motion.div>
  )
}
