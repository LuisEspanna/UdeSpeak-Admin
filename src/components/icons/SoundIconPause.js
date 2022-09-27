import React from 'react'

export default function SoundIconPause(props) {
    return (
        <svg {...props} width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1697_338)">
                <circle cx="23.5" cy="23.5" r="16.5" fill="#0FB4B9" />
            </g>
            <circle cx="23.5" cy="23.5" r="22.5" stroke="#0FB4B9" />
            <rect x="18" y="17" width="3" height="15" rx="1.5" fill="white" />
            <rect x="26" y="17" width="3" height="15" rx="1.5" fill="white" />
            <defs>
                <filter id="filter0_d_1697_338" x="3" y="5" width="41" height="41" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1697_338" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1697_338" result="shape" />
                </filter>
            </defs>
        </svg>

    )
}
