import styled from "styled-components";

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const Label = styled.label`
  font-size: 0.92rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
`;

export const Input = styled.input`
  min-height: 44px;
  padding: 0 0.85rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  font: inherit;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
  }
`;

export const Select = styled.select`
  min-height: 44px;
  padding: 0 0.85rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  font: inherit;
  cursor: pointer;
  width: auto;
  min-width: 10rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
  }
`;

export default function TextInputWithLabel({
    elementId,
    labelText,
    onChange, 
    ref,
    value,
    placeholder,
}) {
  return (
    <Field>
        <Label htmlFor={elementId}>{labelText}</Label>
        <Input
            type="text"
            ref={ref}
            id={elementId}
            value={value}
            onChange={onChange}
            placeholder={placeholder ? placeholder : ""}
        />
    </Field>
  )
}
