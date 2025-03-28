"use client";

import { HTMLMotionProps, motion } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {}

export function Fade(props: Props) {
  const { children, ...rest } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.7,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Zoom(props: Props) {
  const { children, ...rest } = props;
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.7,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
