export default function TextInputWithLabel({
    elementId,
    labelText,
    onChange, 
    ref,
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
