import React from 'react'

export default function TextInputWithLabel({
    elementId,
    ref, 
    onChange, 
    labelText,
    value
}) {
  return (
    <>
        <label htmlFor={elementId}>{labelText}</label>
        <input
            type="text"
            ref={ref}
            id={elementId}
            value={value}
            onChange={onChange}
        />
    </>
  )
}
