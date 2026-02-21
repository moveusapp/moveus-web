import { PropsWithChildren } from "react";

function Tag({ children, className }: TagProps) {
  return (
    <span
      className={`${className} px-3 py-1 rounded-full bg-accent text-white text-xs font-bold shadow-lg backdrop-blur-sm`}
    >
      {children}
    </span>
  );
}

interface TagProps extends PropsWithChildren {
  className?: string;
}

export default Tag;
