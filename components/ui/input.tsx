import * as React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { typographyVariants } from "./typography";
import { IconProps } from "./icons";

export const inputVariants = cva(
  "transition-all duration-500 h-fit px-2 focus:border-blue-400  border w-full border-gray-300",
  {
    variants: {
      variant: {
        default: "",
        inputWithBtnRight: "ltr:rounded-l-none rtl:rounded-r-none",
        inputWithBtnLeft: "ltr:rounded-r-none rtl:rounded-l-none",
        smallSearch: "bg-slate-100",
      },
      sizes: {
        default: "p-3",
        sm: "p-2.5",
        lg: "p-4",
        xs: "p-2",
      },
      rounded: {
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      sizes: "default",
      rounded: "lg",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  buttonLeft?: React.ReactNode;
  buttonRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  buttonVariant?: string;
  iconRight?: React.ReactNode;
  iconSize?: IconProps["sizes"];
  inputLoadingState?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      sizes,
      buttonVariant,
      buttonLeft,
      iconRight,
      iconLeft,
      buttonRight,
      rounded,
      iconSize,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex relative w-full">
        {buttonLeft && buttonLeft}
        <input
          type={type}
          className={cn(
            inputVariants({ variant, sizes, rounded }),
            typographyVariants({ size: sizes }),
            ` ${iconLeft ? "px-11 " : ""} 
            ${buttonLeft && "ltr:rounded-l-none rtl:rounded-r-none"} 
            ${buttonRight && "ltr:rounded-r-none rtl:rounded-l-none "}`,
            className
          )}
          ref={ref}
          {...props}
        />
        {iconLeft && iconLeft}
        {iconRight && iconRight}
        {buttonRight && buttonRight}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
