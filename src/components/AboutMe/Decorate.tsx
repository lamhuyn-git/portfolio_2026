import React from "react";

interface DecorationProps {
  classname?: string;
  svgRef?: React.Ref<SVGSVGElement>;
}

const MASK_PATH_D =
  "M81 261.444C475.964 262.277 1277.41 306.944 1323.5 478.944C1362.1 622.999 891.064 658.861 576 743.997";

const Decorate = ({ classname, svgRef }: DecorationProps) => {
  return (
    <div className={classname}>
      <svg
        ref={svgRef}
        width="1326"
        height="557"
        viewBox="0 0 1326 557"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", overflow: "visible" }}
      >
        {/* ── Rail — faint path, always visible ──────────────────────────── */}
        <path
          d={MASK_PATH_D}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* ── Guide path (invisible) — used by JS for getPointAtLength ─────── */}
        <path
          data-about="guide"
          d={MASK_PATH_D}
          stroke="transparent"
          strokeWidth="1"
          fill="none"
        />

        {/* ── Mask: glow only visible along the line stroke ─────────────── */}
        <mask id="glowMask" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="79" y="259" width="1249" height="487">
          <path
            d={MASK_PATH_D}
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </mask>

        {/* ── Glow orb masked by line ────────────────────────────────────── */}
        <g mask="url(#glowMask)">
          <g filter="url(#glowDisplace)">
            <circle
              data-about="glow-outer"
              cx="80.5"
              cy="260.944"
              r="198.5"
              fill="url(#glowGrad)"
            />
          </g>
        </g>

        <defs>
          {/* ── Displacement filter (textured glow) ────────────────────────── */}
          <filter
            id="glowDisplace"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feTurbulence type="fractalNoise" baseFrequency="0.999" numOctaves={3} seed={4729} />
            <feDisplacementMap in="shape" scale={124.888} xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
            <feMerge>
              <feMergeNode in="displacedImage" />
            </feMerge>
          </filter>

          {/* ── Radial gradient ────────────────────────────────────────────── */}
          <radialGradient
            data-about="outer-grad"
            id="glowGrad"
            cx="0" cy="0" r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(80.5 260.944) rotate(90) scale(198.5)"
          >
            <stop offset="0.0677" stopColor="#83D3F1" />
            <stop offset="0.1355" stopColor="#1FC6E6" />
            <stop offset="0.4943" stopColor="#0577B0" />
            <stop offset="0.8666" stopColor="#0E1049" />
            <stop offset="1" stopColor="#05061A" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Decorate;
