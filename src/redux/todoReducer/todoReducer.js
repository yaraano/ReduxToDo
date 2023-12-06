import {editTodo} from "../action/todoAction";

const initialState = {
    todos: [],
    editTodo:{}
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODOS':
            return {...state, todos: action.payload}
        case 'ADD_TODO':
            return  {...state, todos:[...state.todos, action.payload] }
        case 'DELETE_TODO':
            return {...state, todos: state.todos.filter((todo)=>todo.id!==action.payload)}
        case 'EDIT_TODO':
            return {...state, todos: editTodo(action.payload)}
        case 'SAVE_EDIT':
            return {...state, todos: state.todos.map(todo => todo.id === action.payload.id ? action.payload:todo)}
        default:
            return state
    }
};