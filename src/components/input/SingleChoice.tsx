function SingleChoice<T>({
  value,
  setValue,
  options,
  classname,
}: SingleChoiceProps<T>) {
  return (
    <div className={"flex flex-col w-full gap-3 " + classname}>
      {options.map((option) => (
        <button
          key={option.name}
          onClick={() => setValue(option.value)}
          className={
            "text-left px-6 " +
            (option.value === value ? "" : "text-foreground bg-block")
          }
        >
          {option.name}
        </button>
      ))}
    </div>
  );
}

export default SingleChoice;

interface SingleChoiceProps<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  options: Option<T>[];
  classname?: string;
}
