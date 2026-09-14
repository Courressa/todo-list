import { useSearchParams } from 'react-router';
import styled from 'styled-components';

const TabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.25rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  width: 100%;
  margin: 0.75rem 0;

  @media (min-width: ${({ theme }) => theme.bp.tablet}) {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Tab = styled.button`
  min-height: 44px;
  padding: 0 0.9rem;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  font: inherit;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? '#fff' : theme.colors.muted};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  transition: background 0.15s ease, color 0.15s ease;

  &:hover:not(:disabled) {
    color: ${({ $active, theme }) =>
      $active ? '#fff' : theme.colors.ink};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focusRing};
  }
`;

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get('status') || 'all';

  const handleStatusChange = (status) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (status === 'all') {
      // Remove status param for 'all' to keep URL clean
      nextSearchParams.delete('status');
    } else {
      nextSearchParams.set('status', status);
    }
    setSearchParams(nextSearchParams);
  };

  return (
    <TabList role="group" aria-label="Filter todos by status">
      <Tab
        type="button"
        $active={currentStatus === 'all'}
        onClick={() => handleStatusChange('all')}
      >
        All Todos
      </Tab>
      <Tab
        type="button"
        $active={currentStatus === 'active'}
        onClick={() => handleStatusChange('active')}
      >
        Active
      </Tab>
      <Tab
        type="button"
        $active={currentStatus === 'completed'}
        onClick={() => handleStatusChange('completed')}
      >
        Completed
      </Tab>
    </TabList>
  );
}

export default StatusFilter;