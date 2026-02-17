import { PropsWithChildren, ReactNode, useEffect } from "react";
import { GoArrowLeft, GoArrowRight, GoCheck } from "react-icons/go";

function QuestionSlider({
  children,
  currentQuestion,
  next,
  prev,
  skip,
  name,
  total,
}: QuestionSliderInterface) {
  const question = children[currentQuestion];

  useEffect(() => {
    total.current = children.length;
  }, [children, total]);

  return (
    <div className="h-full flex flex-col justify-between py-8">
      <div>
        <p className="text-accent mb-3">{name}</p>
        <div className="rounded-full border border-accent h-7 flex flex-col">
          <div className="px-2 my-auto">
            <div
              className="bg-accent h-[15px] rounded-full transition-[width] duration-500"
              style={{
                width: `${((currentQuestion + 1) / children.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
      {question}
      <div className="flex items-center justify-between">
        <GoArrowLeft
          className="text-5xl text-primary cursor-pointer"
          onClick={prev}
          style={!currentQuestion ? { opacity: 0, pointerEvents: "none" } : {}}
        />
        <p className="text-accent cursor-pointer select-none" onClick={skip}>
          Skip
        </p>
        {currentQuestion === children.length - 1 ? (
          <GoCheck
            className="text-5xl text-accent cursor-pointer"
            onClick={next}
          />
        ) : (
          <GoArrowRight
            className="text-5xl text-accent cursor-pointer"
            onClick={next}
          />
        )}
      </div>
    </div>
  );
}

export default QuestionSlider;

interface QuestionSliderInterface extends PropsWithChildren {
  total: React.RefObject<number>;
  children: ReactNode[];
  currentQuestion: number;
  next: () => void;
  prev: () => void;
  skip: () => void;
  name: string;
}
