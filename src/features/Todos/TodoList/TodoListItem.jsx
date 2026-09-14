import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../../utils/todoValidation";
import { useEditableTitle } from "../../../hooks/useEditableTitle";
import Button from "../../../shared/Button";
import styled from "styled-components";

const Item = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: 0;
  }
`;

const ItemForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: ${({ $editing }) => ($editing ? 'flex-end' : 'center')};
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  min-height: 56px;
`;

const CheckLabel = styled.label`
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 22px;
  height: 22px;
  margin: 0;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  position: relative;

  &:checked {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:checked::after {
    content: '';
    position: absolute;
    left: 6px;
    top: 2px;
    width: 6px;
    height: 11px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`;

const Title = styled.span`
  flex: 1;
  min-width: 0;
  word-break: break-word;
  cursor: pointer;
  padding: 0.4rem 0;
  color: ${({ $completed, theme }) => $completed ? theme.colors.muted : theme.colors.ink};
  text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
`;

const EditField = styled.div`
  flex: 1 1 100%;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.bp.tablet}) {
    flex: 1 1 0;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.bp.tablet}) {
    width: auto;
    justify-content: flex-start;
  }
`;

function TodoListItem({todo, onCompleteTodo, onUpdateTodo}) {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
    inputRef} = useEditableTitle(todo.title);

  const handleCancel = () => {
    cancelEdit();
  };

  const handleEdit = (event) => {
    updateTitle(event.target.value);
  };

  const handleUpdate = (event) => {
    if (!isEditing) return;
    event.preventDefault();
    if (!isValidTodoTitle(workingTitle)) return;

    const finalTitle = finishEdit();
    onUpdateTodo({ ...todo, title: finalTitle });
  };

  return (
    <Item>
      <ItemForm $editing={isEditing} onSubmit={handleUpdate}>
        { isEditing ? (
          <>
            <EditField>
              <TextInputWithLabel
                elementId={"todoTitle"}
                labelText={"Todo"}
                onChange={handleEdit}
                ref={inputRef}
                value={workingTitle}
              />
            </EditField>
            <Actions>
              <Button $variant="ghost" type="button" onClick={handleCancel}>Cancel</Button>
              <Button
                type="button"
                onClick={handleUpdate}
                disabled={!isValidTodoTitle(workingTitle)}
              >
                Update
              </Button>
            </Actions>
          </>
        ) : (
          <>
            <CheckLabel htmlFor={`checkbox${todo.id}`}>
              <Checkbox
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </CheckLabel>
            <Title $completed={todo.isCompleted} onClick={() => startEditing()}>
              {todo.title}
            </Title>
          </>
        )}
      </ItemForm>
    </Item>
  )
}

export default TodoListItem;
