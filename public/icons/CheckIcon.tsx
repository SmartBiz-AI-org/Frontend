
type IconProps = {
  size?: number;
  className?: string;
};

export default function CheckSuccessIcon({
  size = 136,
  className = "",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 136 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Green background */}
      <rect x="20" width="96" height="96" rx="48" fill="#15803D" />

      {/* Shadow layer */}
      <g filter="url(#filter0)">
        <rect
          x="20"
          width="96"
          height="96"
          rx="48"
          fill="white"
          fillOpacity="0.01"
        />
      </g>

      {/* Check mark */}
      <path
        d="M63.1001 61.6496L50.1001 48.6496L54.6001 44.1496L63.1001 52.6496L81.4001 34.3496L85.9001 38.8496L63.1001 61.6496Z"
        fill="white"
      />

      <defs>
        <filter
          id="filter0"
          x="0"
          y="0"
          width="136"
          height="136"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feMorphology radius="6" operator="erode" />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.921569 0 0 0 0 0.317647 0 0 0 0 0.0980392 0 0 0 0.2 0"
          />
          <feBlend mode="normal" />

          <feMorphology radius="5" operator="erode" />
          <feOffset dy="20" />
          <feGaussianBlur stdDeviation="12.5" />
          <feComposite operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.921569 0 0 0 0 0.317647 0 0 0 0 0.0980392 0 0 0 0.2 0"
          />
          <feBlend mode="normal" />
          <feBlend mode="normal" in2="SourceGraphic" />
        </filter>
      </defs>
    </svg>
  );
}