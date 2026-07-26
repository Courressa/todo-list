function TodoList() {
    const todoList = [
        {id: 1, title: "wash the car"},
        {id: 2, title: "fold laundry"},
        {id: 3, title: "eat strawberry cake"}
    ];

    return (
        <ul>
            {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
        </ul>
    );
}

export default TodoList;