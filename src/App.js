import { useEffect, useState } from 'react';
import './App.scss';
import Todo from './Todo';

function App() {
	const [input, setInput] = useState('');
	const [todos, setTodos] = useState(() => {
		const savedTodos = localStorage.getItem('todos');

		if (savedTodos) {
			return JSON.parse(savedTodos);
		} else {
			return [];
		}
	});
	const [newTask, setNewTask] = useState('');

	//LOCAL STORAGE
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const handleChange = (event) => {
		setInput(event.target.value);
	};

	//FORM SUBMIT HANDLER
	const handleSubmit = (event) => {
		event.preventDefault();

		setTodos([...todos, { id: Date.now(), text: input, completed: false }]);

		setInput('');
	};

	//FUNTION TO MARK ITEM AS COMPLETED
	function toggleComplete(id) {
		const updateTodos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}

			return todo;
		});

		setTodos(updateTodos);
	}

	//FUNCTION TO DELETE ITEM
	function deleteTodo(id) {
		const remainingTodos = todos.filter((todo) => id !== todo.id);

		setTodos(remainingTodos);
	}

	//FUNCTION TO HANDLE CHANGES IN EDIT FORM
	const handleEdit = (event) => {
		setNewTask(event.target.value);
	};

	//FUNTION TO HANDLE EDIT FORM SUBMISSION
	function handleEditSubmit(event, id, newTask) {
		event.preventDefault();

		const updatedTasks = todos.map((todo) => {
			if (id === todo.id) {
				return { ...todo, text: newTask };
			}
			return todo;
		});

		setTodos(updatedTasks);
	}

	return (
		<div className="App">
			<div className="container top">
				<h1>To-do List</h1>
				<form className="form" onSubmit={handleSubmit}>
					<div>
						<input
							type="text"
							aria-label="New task"
							className="form__input"
							value={input}
							onChange={handleChange}
							placeholder="Write new task here..."
							minLength="3"
							maxLength="50"
							autoFocus
						/>
						<button type="submit" className="form__button btn btn--primary">
							Create
						</button>
					</div>
				</form>
			</div>
			<div className="container bottom">
				<ul className="todo-list">
					{todos &&
						todos.map((todo) => (
							<Todo
								todos={todos}
								key={todo.id}
								id={todo.id}
								text={todo.text}
								completed={todo.completed}
								toggleComplete={toggleComplete}
								deleteTodo={deleteTodo}
								handleEdit={handleEdit}
								newTask={newTask}
								handleEditSubmit={handleEditSubmit}
							/>
						))}
				</ul>
				<div className="hideButton-container">
					<input type="checkbox" name="hideCompleted" id="hideCompleted" />
					<label htmlFor="hideCompleted">Hide Completed</label>
				</div>
			</div>
		</div>
	);
}

export default App;
