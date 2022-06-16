import React from 'react'

export default function CloseIcon() {
    return (
        <svg
            className='icon'
            width="1.3rem"
            height="1.3rem"
            viewBox="0 0 24 24"
            strokeWidth="1.5" 
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path 
                stroke="none" d="M0 0h24v24H0z"
                fill="none">
            </path>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    )
}
