import { useEffect, useReducer, useState } from 'react';
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
	const [hide, setHide] = useState(false);
	const [uncompleteTodos, setUncompleteTodos] = useState([]);

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

	//FUNCTION TO HANDLE EDIT FORM SUBMISSION
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

	// FUNCTION TO HIDE ALL COMPLETED TODOS
	const hideCompleted = () => {
		setHide(!hide);

		setUncompleteTodos(todos.filter((todo) => !todo.completed));
	};

	//FUNCTION TO SORT TODOS BY ASCENDING ORDER
	const sortAscending = () => {
		const sortedTodos = todos.sort(function compare(a, b) {
			const textA = a.text.toLowerCase();
			const textB = b.text.toLowerCase();

			if (textA < textB) {
				return -1;
			}
			if (textA > textB) {
				return 1;
			}
			return 0;
		});

		console.log(sortedTodos);

		setTodos(sortedTodos);
	};

	//FUNCTION TO SORT TODOS BY DESCENDING ORDER
	const sortDescending = () => {
		const sortedTodos = todos.sort(function compare(a, b) {
			const textA = a.text.toLowerCase();
			const textB = b.text.toLowerCase();

			if (textA > textB) {
				return -1;
			}
			if (textA < textB) {
				return 1;
			}
			return 0;
		});

		console.log(sortedTodos);

		setTodos(sortedTodos);
	};

	// FUNCTION TO SORT TODOS BY DATE OF CREATION
	const sortDefault = () => {
		const sortedTodos = todos.sort(function compare(a, b) {
			if (a.id < b.id) {
				return -1;
			}
			if (a.id > b.id) {
				return 1;
			}
			return 0;
		});

		console.log(sortedTodos);

		setTodos(sortedTodos);
	};

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
				<div className="sort-buttons">
					<button
						type="button"
						className="btn btn--secondary"
						onClick={sortAscending}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path d="M239.6 373.1c11.94-13.05 11.06-33.31-1.969-45.27c-13.55-12.42-33.76-10.52-45.22 1.973L160 366.1V64.03c0-17.7-14.33-32.03-32-32.03S96 46.33 96 64.03v302l-32.4-35.39C51.64 317.7 31.39 316.7 18.38 328.7c-13.03 11.95-13.9 32.22-1.969 45.27l87.1 96.09c12.12 13.26 35.06 13.26 47.19 0L239.6 373.1zM448 416h-50.75l73.38-73.38c9.156-9.156 11.89-22.91 6.938-34.88S460.9 288 447.1 288H319.1C302.3 288 288 302.3 288 320s14.33 32 32 32h50.75l-73.38 73.38c-9.156 9.156-11.89 22.91-6.938 34.88S307.1 480 319.1 480h127.1C465.7 480 480 465.7 480 448S465.7 416 448 416zM492.6 209.3l-79.99-160.1c-10.84-21.81-46.4-21.81-57.24 0L275.4 209.3c-7.906 15.91-1.5 35.24 14.31 43.19c15.87 7.922 35.04 1.477 42.93-14.4l7.154-14.39h88.43l7.154 14.39c6.174 12.43 23.97 23.87 42.93 14.4C494.1 244.6 500.5 225.2 492.6 209.3zM367.8 167.4L384 134.7l16.22 32.63H367.8z" />
						</svg>
					</button>
					<button
						type="button"
						className="btn btn--secondary"
						onClick={sortDescending}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path d="M104.4 470.1c12.12 13.26 35.06 13.26 47.19 0l87.1-96.09c11.94-13.05 11.06-33.31-1.969-45.27c-13.02-11.95-33.27-11.04-45.22 1.973L160 366.1V64.03c0-17.7-14.33-32.03-32-32.03S96 46.33 96 64.03v302l-32.4-35.39c-6.312-6.883-14.94-10.39-23.61-10.39c-7.719 0-15.47 2.785-21.61 8.414c-13.03 11.95-13.9 32.22-1.969 45.27L104.4 470.1zM320 96h50.75l-73.38 73.38c-9.156 9.156-11.89 22.91-6.938 34.88s16.63 19.74 29.56 19.74h127.1C465.7 223.1 480 209.7 480 192s-14.33-32-32-32h-50.75l73.38-73.38c9.156-9.156 11.89-22.91 6.938-34.88S460.9 32 447.1 32h-127.1C302.3 32 288 46.31 288 64S302.3 96 320 96zM492.6 433.3l-79.99-160.1c-10.84-21.81-46.4-21.81-57.24 0l-79.99 160.1c-7.906 15.91-1.5 35.24 14.31 43.19c15.87 7.922 35.04 1.477 42.93-14.4l7.154-14.39h88.43l7.154 14.39c6.174 12.43 23.97 23.87 42.93 14.4C494.1 468.6 500.5 449.2 492.6 433.3zM367.8 391.4L384 358.7l16.22 32.63H367.8z" />
						</svg>
					</button>
					<button
						type="button"
						className="btn btn--secondary"
						onClick={sortDefault}
					>
						Default
					</button>
				</div>
				<ul className="todo-list">
					{todos && hide
						? uncompleteTodos.map((todo) => (
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
						  ))
						: todos.map((todo) => (
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
					<input
						type="checkbox"
						name="hideCompleted"
						id="hideCompleted"
						onClick={hideCompleted}
					/>
					<label htmlFor="hideCompleted">Hide Completed</label>
				</div>
			</div>
		</div>
	);
}

export default App;
