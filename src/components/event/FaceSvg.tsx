const MOUTHS = [
  "M7.8 16.2 Q12 11.6 16.2 16.2", // deep frown
  "M8.2 15.4 Q12 13.6 15.8 15.4", // slight frown
  "M8.4 14.8 H15.6", // flat
  "M7.9 13.9 Q12 17.2 16.1 13.9", // smile
];

function FaceSvg({ index }: { index: number }) {
  const isGrin = index === 4;

  return (
    <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" aria-hidden="true">
      {isGrin ? (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        >
          <path d="M7.6 9.9 Q9 8.3 10.4 9.9" />
          <path d="M13.6 9.9 Q15 8.3 16.4 9.9" />
        </g>
      ) : (
        <g fill="currentColor">
          <circle cx="9" cy="9.6" r="1.35" />
          <circle cx="15" cy="9.6" r="1.35" />
        </g>
      )}

      {isGrin ? (
        <path d="M7.4 13 Q12 19 16.6 13 Z" fill="currentColor" />
      ) : (
        <path
          d={MOUTHS[index]}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export default FaceSvg;
