import styled from 'styled-components';
import { Field, Label, Select } from './TextInputWithLabel';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  justify-content: center;
`;

const CompactField = styled(Field)`
  flex: 0 0 auto;
`;

export default function SortBy({ sortBy, sortDirection, onSortByChange, onSortDirectionChange }) {
  return (
    <Row>
      <CompactField>
        <Label htmlFor="sortBy">Sort By </Label>
        <Select id="sortBy" value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
            <option value="createdAt">Created At</option>
            <option value="title">Title</option>
        </Select>
      </CompactField>
      <CompactField>
        <Label htmlFor="order">Order </Label>
        <Select id="order" value={sortDirection} onChange={(e) => onSortDirectionChange(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </Select>
      </CompactField>
    </Row>
  )
}
