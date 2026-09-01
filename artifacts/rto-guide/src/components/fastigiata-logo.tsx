interface FastigiataLogoProps {
  variant?: "mark" | "wordmark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: { tree: { w: 18, h: 28 }, name: "0.62rem", sub: "0.5rem" },
  md: { tree: { w: 24, h: 36 }, name: "0.78rem", sub: "0.62rem" },
  lg: { tree: { w: 32, h: 48 }, name: "1rem",    sub: "0.78rem" },
};

export function FastigiataLogo({
  variant = "wordmark",
  size = "md",
  className = "",
}: FastigiataLogoProps) {
  const s = SIZE_MAP[size];

  const TreeMark = () => (
    <svg
      viewBox="0 0 32 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: s.tree.w, height: s.tree.h, flexShrink: 0 }}
    >
      {/* Top tier — smallest */}
      <polygon points="16,2 10,14 22,14" fill="white" />
      {/* Middle tier */}
      <polygon points="16,9 6,24 26,24" fill="white" opacity="0.85" />
      {/* Bottom tier — widest */}
      <polygon points="16,17 2,35 30,35" fill="white" opacity="0.7" />
      {/* Trunk */}
      <rect x="14" y="35" width="4" height="6" rx="0.5" fill="white" opacity="0.5" />
    </svg>
  );

  if (variant === "mark") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <TreeMark />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <TreeMark />
      <div className="leading-none flex flex-col gap-[2px]">
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: s.name,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "white",
            lineHeight: 1,
          }}
        >
          Fastigiata
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: s.sub,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1,
          }}
        >
          Systems
        </div>
      </div>
    </div>
  );
}
