import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, getTodos, saveEdit } from "./redux/action/todoAction";

const App = () => {
    const dispatch = useDispatch();
    const todosArray = useSelector(state => state.todos);
    const [todo, setTodo] = useState({});
    const [edit, setEdit] = useState(false);
    const [editTodo, setEditTodo] = useState({});

    useEffect(() => {
        dispatch(getTodos(todos));
    }, []);

    const handeAddTodo = () => {
        const data = { id: Date.now(), title: todo.title, completed: false };
        dispatch(addTodo(data));
        setTodo({});
    }

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    }

    const handleEdit = (todo) => {
        setEdit(true);
        setEditTodo(todo);
    }

    const handleSave = () => {
        dispatch(saveEdit(editTodo));
        setEdit(false);
        setEditTodo({});
    }

    return (
        <div>
            <div>
                <input
                    placeholder={'Enter your task'}
                    type="text"
                    value={todo.title || ''}
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                />
                <button onClick={handeAddTodo}>Add</button>
            </div>

            {
                todosArray.map(todo =>
                    <div key={todo.id}>
                        {
                            edit && editTodo.id === todo.id ?
                                <input
                                    type="text"
                                    defaultValue={todo.title}
                                    onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
                                /> :
                                <h3>{todo.title}</h3>
                        }
                        <div>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                            />
                            <button onClick={editTodo.id === todo.id ? handleSave : () => handleEdit(todo)}>
                                {editTodo.id === todo.id ? "Save" : "Edit"}
                            </button>
                            <button onClick={() => handleDelete(todo.id)}>Delete</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default App;

const todos = [
    {
        id: 1,
        title: 'Buy milk',
        completed: false
    },
    {
        id: 2,
        title: 'Buy eggs',
        completed: false
    },
    {
        id: 3,
        title: 'Buy bread',
        completed: false
    },
    {
        id: 4,
        title: 'Buy butter',
        completed: false
    }
]
