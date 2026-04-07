"use client";

import { motion, HTMLMotionProps } from "framer-motion";

// Simple wrapper for divs
export const MotionDiv = (props: HTMLMotionProps<"div">) => <motion.div {...props} />;

// Simple wrapper for spans
export const MotionSpan = (props: HTMLMotionProps<"span">) => <motion.span {...props} />;

// Simple wrapper for buttons
export const MotionButton = (props: HTMLMotionProps<"button">) => <motion.button {...props} />;