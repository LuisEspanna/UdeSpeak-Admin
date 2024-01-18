import * as React from "react";

function HelpIcon(props) {
  return (
    <svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        clipPath="url(#clip0_3268_577)"
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M5.5 22a16.5 16.5 0 1033 0 16.5 16.5 0 00-33 0zM22 29.333v.019" />
        <path d="M22 23.833a3.666 3.666 0 10-.692-7.262 3.63 3.63 0 00-2.058 1.214" />
      </g>
      <defs>
        <clipPath id="clip0_3268_577">
          <path fill="#fff" d="M0 0H44V44H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default HelpIcon;