import { useRef, useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";
import Button from "../../shared/Button";
import styled from "styled-components";
import { TODO_TITLE_MAX } from "../../utils/todoValidation";

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

function TodoForm({ onAddTodo }) {
    const inputRef = useRef();
    const [workingTodoTitle , setWorkingTodoTitle] = useState("");

    const handleAddTodo = (event) => {
        event.preventDefault();

        if (!isValidTodoTitle(workingTodoTitle)) return;

        onAddTodo(workingTodoTitle.trim());
        setWorkingTodoTitle("");
        inputRef.current.focus();
    }

    return (
        <Form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                ref={inputRef} 
                value={workingTodoTitle}
                onChange={event => setWorkingTodoTitle(event.target.value)}
                elementId={"todoTitle"}
                labelText={"Todo"}
                maxLength={TODO_TITLE_MAX}
            />  
            <Button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>Add Todo</Button>
        </Form>
    );
}

export default TodoForm;