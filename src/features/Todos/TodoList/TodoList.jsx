import TodoListItem from "./TodoListItem";
import { useMemo } from "react";
import styled from 'styled-components';
import { EmptyState } from "../../../shared/Layout";


const ListCard = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  overflow: hidden;
  margin-top: 1rem;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

function TodoList({todoList, onCompleteTodo, onUpdateTodo, dataVersion, statusFilter = 'all' }) {
    const filteredTodoList = useMemo(() => {

    let filteredTodos;
    switch (statusFilter) {
        case 'completed':
            filteredTodos = todoList.filter((todo) => todo.isCompleted);
            break;
        case 'active':
            filteredTodos = todoList.filter((todo) => !todo.isCompleted);
            break;
        case 'all':
        default:
            filteredTodos = todoList;
            break;
    }

    return {
        version: dataVersion,
        todos: filteredTodos,
    };
  }, [todoList, dataVersion, statusFilter]);

  const getEmptyMessage = () => {
    switch (statusFilter) {
        case 'completed':
            return 'No completed todos yet. Complete some tasks to see them here.';
        case 'active':
            return 'No active todos. Add a todo above to get started.';
        case 'all':
        default:
            return 'Add todo above to get started.';
    }
  };

  return filteredTodoList.todos.length === 0 ? (
    <EmptyState>
        <p>{getEmptyMessage()}</p>
    </EmptyState>
  ) : (
    <ListCard>
        <List>
            {filteredTodoList.todos.map((todo) => (
                <TodoListItem
                    key={todo.id}
                    todo={todo}
                    onCompleteTodo={onCompleteTodo}
                    onUpdateTodo={onUpdateTodo}
                />
            ))}
        </List>
    </ListCard>
  );
}

export default TodoList;