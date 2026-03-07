"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const variants = {
    primary:
        "bg-[var(--color-primary)] text-white hover:brightness-110 shadow-lg hover:shadow-[var(--color-primary)]/40 border-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-dark)] transition-all duration-300",
    secondary:
        "bg-white text-zinc-900 hover:bg-zinc-50 border border-zinc-200 shadow-sm",
    outline:
        "border-zinc-200 bg-transparent hover:bg-white/10 text-white border-white/20 backdrop-blur-sm",
    ghost:
        "bg-transparent hover:bg-black/5 text-current border-transparent shadow-none",
    danger:
        "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-red-500/25 border-transparent",
};

const sizes = {
    sm: "h-9 px-4 text-sm rounded-lg",
    md: "h-11 px-6 text-base rounded-xl",
    lg: "h-14 px-8 text-lg rounded-2xl",
    icon: "h-10 w-10 p-2 rounded-xl",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            isLoading,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.98 }}
                whileHover={!disabled && !isLoading ? { scale: 1.02, y: -2 } : {}}
                className={cn(
                    "inline-flex items-center justify-center gap-2 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {!isLoading && leftIcon && (
                    <span className="shrink-0 transition-transform group-hover:-translate-x-1">
                        {leftIcon}
                    </span>
                )}
                {children as React.ReactNode}
                {!isLoading && rightIcon && (
                    <span className="shrink-0 transition-transform group-hover:translate-x-1">
                        {rightIcon}
                    </span>
                )}
            </motion.button>
        );
    }
);
Button.displayName = "Button";
