
export const TODO_ACTIONS = {
    // Fetch operations
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',

    // Add todo operations
    ADD_TODO_START: 'ADD_TODO_START',
    ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
    ADD_TODO_ERROR: 'ADD_TODO_ERROR',

    // Update todo operations
    UPDATE_TODO_START: 'UPDATE_TODO_START',
    UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
    UPDATE_TODO_ERROR: 'UPDATE_TODO_ERROR',

    // Complete todo operations
    COMPLETE_TODO_START: 'COMPLETE_TODO_START',
    COMPLETE_TODO_SUCCESS: 'COMPLETE_TODO_SUCCESS',
    COMPLETE_TODO_ERROR: 'COMPLETE_TODO_ERROR',

    // UI Operation
    SET_SORT: 'SET_SORT',
    SET_FILTER: 'SET_FILTER',
    CLEAR_ERROR: 'CLEAR_ERROR',
    RESET_FILTERS: 'RESET_FILTERS',
};

export const initialTodoState = {
    todoList: [],
    error: '',
    filterError: '',
    isTodoListLoading: true,
    sortBy: 'createdAt',
    sortDirection: 'asc',
    filterTerm: '',
    dataVersion: 0,
};

export function todoReducer(state, action) {
    switch (action.type) {
        case TODO_ACTIONS.FETCH_START:
            return {
                ...state,
                isTodoListLoading: true,
                error: '',
                filterError: '',
            };
        
        case TODO_ACTIONS.FETCH_SUCCESS:
            return {
                ...state,
                isTodoListLoading: false,
                todoList: action.payload,
                error: '',
                filterError: '',
            };

        case TODO_ACTIONS.FETCH_ERROR:
            if (action.payload.isFiltered) {
                return {
                    ...state,
                    isTodoListLoading: false,
                    filterError: `Error filtering/sorting todos: ${action.payload.message}`,
                };
            }
            return {
                ...state,
                isTodoListLoading: false,
                error: `Error fetching todos: ${action.payload.message}`,
            };

        case TODO_ACTIONS.ADD_TODO_START:
            return {
                ...state,
                todoList: [...state.todoList, action.payload],
                error: '',
            }

        case TODO_ACTIONS.ADD_TODO_SUCCESS:
            return {
                ...state,
                todoList: state.todoList.map(todo => 
                        todo.id === action.payload.newTodoId ? action.payload.realTodo : todo
                    ),
                error: '',
                dataVersion: state.dataVersion + 1,
            }

        case TODO_ACTIONS.ADD_TODO_ERROR:
            return {
                ...state,
                todoList: state.todoList.filter(todo => todo.id !== action.payload.newTodoId),
                error: action.payload.message || "There was an issue adding the todo",
            }

        case TODO_ACTIONS.UPDATE_TODO_START:
            return {
                ...state,
                todoList: state.todoList.map(todo => {
                    if (todo.id === action.payload.editedTodo.id) {
                        return {...action.payload.editedTodo};
                    }

                    return todo;
                }),
                error: '',
            }

        case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
            return {
                ...state,
                error: '',
                dataVersion: state.dataVersion + 1,
            }

        case TODO_ACTIONS.UPDATE_TODO_ERROR:
            return {
                ...state,
                todoList: state.todoList.map(todo => 
                        todo.id === action.payload.editedTodoId ? action.payload.originalTodo : todo
                    ),
                error: action.payload.message || "There was an issue with updating the todo",
            }
        
        case TODO_ACTIONS.COMPLETE_TODO_START:
            return {
                ...state,
                todoList: state.todoList.map(todo =>
                    todo.id === action.payload ? { ...todo, isCompleted: true } : todo
                ),
                error: '',
            }

        case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
            return {
                ...state,
                error: '',
                dataVersion: state.dataVersion + 1,
            }

        case TODO_ACTIONS.COMPLETE_TODO_ERROR:
            return {
                ...state,
                todoList: state.todoList.map(todo => 
                        todo.id === action.payload.id ? action.payload.originalTodo : todo
                    ),
                error: action.payload.message || "There was an issue marking the todo as completed",
            }

        case TODO_ACTIONS.SET_SORT:
            return {
                ...state,
                [action.payload.field]: action.payload.value,
            }

        case TODO_ACTIONS.SET_FILTER:
            return {
                ...state,
                filterTerm: action.payload
            }

        case TODO_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                [action.payload]: '',
            }
        
        case TODO_ACTIONS.RESET_FILTERS:
            return {
                ...state,
                filterError: '',
                sortBy: 'createdAt',
                sortDirection: 'asc',
                filterTerm: '',
            }

        default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
}