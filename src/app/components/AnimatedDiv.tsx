"use client";

import { motion, HTMLMotionProps } from "framer-motion";

export function AnimatedDiv(props: HTMLMotionProps<"div">) {
  return <motion.div {...props} />;
}
