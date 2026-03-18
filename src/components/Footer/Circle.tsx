interface CircleProps {
  className?: string;
}
const Circle = ({ className }: CircleProps) => {
  return (
    <div className={className}>
      <svg
        width="588"
        height="588"
        viewBox="0 0 588 588"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_g_187_379)">
          <circle
            cx="293.867"
            cy="293.867"
            r="224"
            fill="url(#paint0_radial_187_379)"
          />
        </g>
        <defs>
          <filter
            id="filter0_g_187_379"
            x="0"
            y="-1.52588e-05"
            width="587.734"
            height="587.734"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.99900001287460327 0.99900001287460327"
              numOctaves="3"
              seed="4729"
            />
            <feDisplacementMap
              in="shape"
              scale="139.73440551757812"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacedImage"
              width="100%"
              height="100%"
            />
            <feMerge result="effect1_texture_187_379">
              <feMergeNode in="displacedImage" />
            </feMerge>
          </filter>
          <radialGradient
            id="paint0_radial_187_379"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(293.867 293.867) rotate(90) scale(224)"
          >
            <stop offset="0.0677345" stop-color="#83D3F1" />
            <stop offset="0.135469" stop-color="#1FC6E6" />
            <stop offset="0.494333" stop-color="#0577B0" />
            <stop offset="0.866587" stop-color="#0E1049" />
            <stop offset="1" stop-color="#05061A" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Circle;
