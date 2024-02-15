import * as React from "react"

function FilterIcon(props) {
  return (
    <svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_2806_673)">
        <path
          d="M7.333 7.333h29.333v3.982c0 .973-.386 1.905-1.074 2.593L27.5 22v12.833l-11 3.667V22.917l-8.214-9.035a3.667 3.667 0 01-.953-2.466V7.333z"
          fill="none"
          strokeWidth={2.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2806_673">
          <path fill="#fff" d="M0 0H44V44H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default FilterIcon
