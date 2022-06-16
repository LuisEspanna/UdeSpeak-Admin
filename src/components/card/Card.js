import React from 'react'
import './card.scss'

export default function Card({children, className}) {
  return (
    <div
        className={`ccard ${className ? className : ''}`}
    >
        {children}
    </div>
  )
}
