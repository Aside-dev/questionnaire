import React, { ReactNode, MouseEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import css from './Modal.module.scss'

const { motion } = require('framer-motion');

type TModalProps = {
  isShowed: boolean;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

const Modal = ({ isShowed, children, className, containerClassName }: TModalProps )=> {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const dropIn = {
    hidden: {
      y: '-100px',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.2,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: '100px',
      opacity: 0,
    },
  };

  const modalContent = isShowed ? (
    <div className={className}>
      <div className={css.overlay}>
        <motion.div
          onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          className={css.animated}
          variants={dropIn}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <div className={`${css.container} ${containerClassName || ''}`}>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')!
    );
  } else {
    return null;
  }
}

export default Modal;