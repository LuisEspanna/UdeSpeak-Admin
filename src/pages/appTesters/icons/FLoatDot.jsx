import React from 'react';

/**
 * @typedef {"ligth" | "dark"} MetricFormat
 */

/**
 * @param {object} param0
 * @param {MetricFormat} param0.type
 * @returns 
 */

export default function FLoatDot({size, posX, posY, type}) {
  return (
    <span 
      className={`float-dot ${type}`} 
      style={{width: `${size}em`, height: `${size}em`, top: posY, right: posX}}
    />
  )
}
