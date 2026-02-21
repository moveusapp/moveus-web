function Tag({ text, className }: TagProps) {
  return (
    <span
      className={`${className} px-3 py-1 rounded-full bg-accent text-white text-xs font-bold shadow-lg backdrop-blur-sm`}
    >
      {text}
    </span>
  );
}

interface TagProps {
  text: string;
  className?: string;
}

export default Tag;
