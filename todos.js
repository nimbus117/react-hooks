import React from "react";
import ReactDOM from "react-dom";

/*
  INSTRUCTIONS:
  Create a "todo" app with the following criteria.
    1. The user can add new todo items
    2. The user can remove todo items
*/

const guid = () => Math.random().toString(36).substr(2);

function Todo() {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todos) => [{ id: guid(), task: todo }, ...todos]);
    setTodo("");
  };

  const deleteTodo = (id) =>
    setTodos((todos) => todos.filter((t) => t.id !== id));

  const styles = {
    delete: { color: "red", marginLeft: 5 },
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <button style={styles.delete} onClick={() => deleteTodo(todo.id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Todo />, rootElement);
