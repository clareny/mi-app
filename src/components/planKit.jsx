import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export const WHATSAPP_NUMBER = '59897989368';

export const waLink = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const appleSpring = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
  mass: 0.72,
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.985,
    filter: 'blur(22px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    zIndex: 2,
    transition: {
      ...appleSpring,
      filter: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 1.02,
    filter: 'blur(18px)',
    zIndex: 1,
    transition: { duration: 0.32, ease: [0.4, 0, 1, 1] },
  },
};

export const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.96, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: appleSpring,
  },
};

const hireCtaMotion = {
  rest: { scale: 1 },
  hover: { scale: 1.045, transition: appleSpring },
};

const hireBlobA = {
  rest: {
    x: [0, 10, -6, 0],
    y: [0, -6, 5, 0],
    scale: [1, 1.12, 0.94, 1],
    opacity: 0.82,
    transition: { duration: 5.6, repeat: Infinity, ease: 'easeInOut' },
  },
  hover: {
    x: 18,
    y: -12,
    scale: 1.55,
    opacity: 1,
    transition: appleSpring,
  },
};

const hireBlobB = {
  rest: {
    x: [0, -8, 7, 0],
    y: [0, 6, -4, 0],
    scale: [1, 0.92, 1.14, 1],
    opacity: 0.76,
    transition: { duration: 6.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
  },
  hover: {
    x: -16,
    y: 12,
    scale: 1.5,
    opacity: 1,
    transition: appleSpring,
  },
};

export const HireCta = ({ href, label, animate, onClick, type = 'button', disabled = false, className = '' }) => {
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const spotOp = useMotionValue(0);
  const x = useSpring(spotX, { stiffness: 260, damping: 22, mass: 0.6 });
  const y = useSpring(spotY, { stiffness: 260, damping: 22, mass: 0.6 });
  const opacity = useSpring(spotOp, { stiffness: 320, damping: 28 });

  const onPointerMove = (event) => {
    if (!animate) return;
    const box = event.currentTarget.getBoundingClientRect();
    spotX.set(event.clientX - box.left - box.width / 2);
    spotY.set(event.clientY - box.top - box.height / 2);
  };

  const onPointerEnter = () => {
    if (animate) spotOp.set(1);
  };

  const onPointerLeave = () => {
    spotX.set(0);
    spotY.set(0);
    spotOp.set(0);
  };

  const Tag = href ? motion.a : motion.button;
  const tagProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { type, disabled };

  return (
    <Tag
      className={`haste-pro hire-cta ${className}`.trim()}
      {...tagProps}
      onClick={onClick}
      variants={animate ? hireCtaMotion : undefined}
      initial={false}
      animate={animate ? 'rest' : false}
      whileHover={animate ? 'hover' : undefined}
      whileTap={animate ? { scale: 0.96 } : undefined}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {animate ? (
        <>
          <motion.span className="hire-cta__blob hire-cta__blob--a" variants={hireBlobA} aria-hidden="true" />
          <motion.span className="hire-cta__blob hire-cta__blob--b" variants={hireBlobB} aria-hidden="true" />
          <motion.span className="hire-cta__spot" style={{ x, y, opacity }} aria-hidden="true" />
        </>
      ) : (
        <>
          <span className="hire-cta__blob hire-cta__blob--a" aria-hidden="true" />
          <span className="hire-cta__blob hire-cta__blob--b" aria-hidden="true" />
        </>
      )}
      <span className="haste-pro__label hire-cta__label">{label}</span>
    </Tag>
  );
};

export const usePhone = () => {
  const [phone, setPhone] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 900px)').matches : false
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const sync = () => setPhone(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return phone;
};
