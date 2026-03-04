interface MyThinkingProps {
  // Define any props if needed
  classname?: string;
}
const Decoration = ({ classname }: MyThinkingProps) => {
  return (
    <div className={classname}>
      <svg
        width="768"
        height="1177"
        viewBox="0 0 768 1177"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_g_303_31)">
          <circle
            cx="378.867"
            cy="798"
            r="309"
            fill="url(#paint0_radial_303_31)"
          />
        </g>
        <path
          d="M347.867 675L347.867 1099"
          stroke="url(#paint1_linear_303_31)"
        />
        <path
          d="M247.867 675L247.867 836"
          stroke="url(#paint2_linear_303_31)"
        />
        <path d="M83.8672 836H347.867" stroke="url(#paint3_linear_303_31)" />
        <path d="M767.867 675H507.867" stroke="url(#paint4_linear_303_31)" />
        <path d="M84.8672 675H440.867" stroke="url(#paint5_linear_303_31)" />
        <path
          d="M84.8672 1099L84.8672 283"
          stroke="url(#paint6_linear_303_31)"
        />
        <g opacity="0.9" clip-path="url(#clip0_303_31)">
          <path
            d="M83.8672 -6C461.934 -6 767.867 300.195 767.867 678.585V676.974C767.867 910.248 579.276 1099 346.201 1099C201.193 1099 83.8672 981.574 83.8672 836.442V838.052C83.8672 749.024 155.856 676.974 244.808 676.974C300.848 676.974 346.201 722.366 346.201 778.453V776.843C346.201 810.669 318.841 838.052 285.044 838.052C262.802 838.052 244.808 820.044 244.808 797.783C244.808 787.103 254.159 778.453 265.731 778.453"
            stroke="white"
            stroke-opacity="0.05"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_g_303_31"
            x="0"
            y="419.133"
            width="757.734"
            height="757.734"
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
            <feMerge result="effect1_texture_303_31">
              <feMergeNode in="displacedImage" />
            </feMerge>
          </filter>
          <radialGradient
            id="paint0_radial_303_31"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(378.867 798) rotate(90) scale(309)"
          >
            <stop offset="0.0677345" stop-color="#83D3F1" />
            <stop offset="0.135469" stop-color="#1FC6E6" />
            <stop offset="0.494333" stop-color="#0577B0" />
            <stop offset="0.866587" stop-color="#0E1049" />
            <stop offset="1" stop-color="#05061A" />
          </radialGradient>
          <linearGradient
            id="paint1_linear_303_31"
            x1="347.867"
            y1="674.191"
            x2="347.867"
            y2="1098.19"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_303_31"
            x1="247.867"
            y1="674.693"
            x2="247.867"
            y2="835.693"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_303_31"
            x1="83.3634"
            y1="836"
            x2="347.363"
            y2="836"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_303_31"
            x1="768.363"
            y1="675"
            x2="508.363"
            y2="675"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_303_31"
            x1="84.1878"
            y1="675"
            x2="440.188"
            y2="675"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint6_linear_303_31"
            x1="84.8672"
            y1="1100.56"
            x2="84.8672"
            y2="284.557"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" stop-opacity="0" />
            <stop offset="0.400681" stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <clipPath id="clip0_303_31">
            <rect
              width="1101"
              height="683"
              fill="white"
              transform="matrix(0 1 -1 0 767.867 0)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Decoration;
