import { useState } from 'react';
import './App.scss';
import Todo from './Todo';

function App() {
	const [input, setInput] = useState('');
	const [todos, setTodos] = useState([]);

	const handleChange = (event) => {
		setInput(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		setTodos([...todos, { id: Date.now(), text: input, completed: false }]);

		setInput('');
	};

	function toggleComplete(id) {
		const updateTodos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}

			return todo;
		});

		setTodos(updateTodos);
	}

	function deleteTodo(id) {
		const remainingTodos = todos.filter((todo) => id !== todo.id);

		setTodos(remainingTodos);
	}

	return (
		<div className="App">
			<div className="container">
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
							required
						/>
						<button type="submit" className="form__button btn btn--primary">
							Create
						</button>
					</div>
				</form>
			</div>
			<div className="container">
				<ul className="todo-list">
					{todos &&
						todos.map((todo) => {
							return (
								<Todo
									todos={todos}
									key={todo.id}
									id={todo.id}
									text={todo.text}
									completed={todo.completed}
									toggleComplete={toggleComplete}
									deleteTodo={deleteTodo}
								/>
							);
						})}
				</ul>
			</div>
		</div>
	);
}

export default App;
