import React from "react";
import { Skeleton } from "./skeleton";
import { twMerge } from "tailwind-merge";

interface LinearSkeletonProps extends React.ComponentProps<typeof Skeleton> {
  className?: string;
}

const LinearSkeleton = ({ className, ...props }: LinearSkeletonProps) => {
  return (
    <Skeleton
      data-testid="skeleton"
      {...props}
      className={twMerge("bg-gradient-to-r from-slate-200", className)}
    />
  );
};

export default LinearSkeleton;
