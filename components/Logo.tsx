import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  color?: string;
}

interface LogoIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({
  className = "",
  size = 40,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circuit lines - simplified and stylized for the dark theme */}
      <path
        d="M15 50H5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="5" cy="50" r="2" fill={color} />

      <path
        d="M25 30L15 20H10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="10" cy="20" r="2" fill={color} />

      <path
        d="M25 70L15 80H10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="10" cy="80" r="2" fill={color} />

      <path
        d="M50 15V5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="50" cy="5" r="2" fill={color} />

      <path
        d="M85 50H95"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="95" cy="50" r="2" fill={color} />

      {/* Outer Hexagon / Frame fragment */}
      <path
        d="M70 15H80L90 40V60L80 85H70"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.3"
        strokeLinecap="round"
      />

      {/* Main Triangle (Play Button) */}
      <path
        d="M35 25L75 50L35 75V25Z"
        stroke={color}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Inner Chart */}
      <rect x="42" y="55" width="4" height="10" fill={color} />
      <rect x="48" y="50" width="4" height="15" fill={color} />
      <rect x="54" y="42" width="4" height="23" fill={color} />

      {/* Upward Arrow */}
      <path
        d="M42 52L56 38M56 38H50M56 38V44"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = 40,
  color = "currentColor",
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon
        size={size}
        color={color}
        className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] shrink-0"
      />
      <span className="text-2xl font-black tracking-tight uppercase font-elegant leading-none shrink-0 whitespace-nowrap">
        ANALYZIK
      </span>
    </div>
  );
};
