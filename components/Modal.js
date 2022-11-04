import { motion } from 'framer-motion';

const animation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

function Modal({ children, closeButtonVisible, handleClose }) {
  return (
    <Backdrop handleClose={handleClose}>
      <motion.div
        className='relative'
        variants={animation}
        initial='hidden'
        animate='visible'
        exit='hidden'
      >
        {children}
        {closeButtonVisible && (
          <button
            type='button'
            className='absolute top-4 right-4 bg-black py-3 px-6 text-xs font-bold uppercase text-white'
            onClick={handleClose}
          >
            Close
          </button>
        )}
      </motion.div>
    </Backdrop>
  );
}

function Backdrop({ children, handleClose }) {
  return (
    <motion.div
      variants={animation}
      initial='hidden'
      animate='visible'
      exit='hidden'
      className='fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/50'
      onClick={handleClose}
    >
      {children}
    </motion.div>
  );
}

export default Modal;
