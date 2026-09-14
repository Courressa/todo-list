import TextInputWithLabel from './TextInputWithLabel';

export default function FilterInput({filterTerm, onFilterChange }) {
  return (
    <div>
        <TextInputWithLabel
          elementId="filterInput"
          labelText="Search todos"
          value={filterTerm}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Search by title..."
        />
    </div>
  )
}
