import { PropsWithChildren } from "react";

function Tag({ children, className }: TagProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-xs font-bold ${className}`}
    >
      {children}
    </span>
  );
}

interface TagProps extends PropsWithChildren {
  className?: string;
}

export default Tag;
