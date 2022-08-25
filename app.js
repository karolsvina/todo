import { useState } from "react";
import "./App.css";

// TODO: when completed, think about design:
// * should a todo have a `completed` flag, or should it be removed entirely?
// * How does a user mark the todo as done?
function App() {
  const [todos, setTodos] = useState([]);

  // TODO: fetching of todos.
  // (use GET request)

  // Use the library `axios` to fetch.
  // https://axios-http.com/docs/intro -> `npm install axios`

  // To congifure base URL of our backend, use:
  // import axios from "axios";
  // ...
  // let instance = axios.create({
  //   baseURL: `http://localhost:8000/`, (or whatever port the php is running on)
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // });
  // ...
  // USAGE:
  // instance.get("/path/to/resource");
  // instance.post("/path/to/resource", { data });

  const addTodo = (newTodo) => {
    console.log("Adding a todo:", newTodo);
    setTodos((prev) => {
      const highestId = prev
        .map((todo) => todo.id)
        .reduce((a, b) => Math.max(a, b), 0);
      return [...prev, { ...newTodo, id: highestId + 1 }];
    });

    // TODO: save into DB, and generate ID on backend instead of on frontend
    // (use POST request)
  };

  const deleteTodo = (id) => {
    console.log("Deleting TODO with id:", id);
    setTodos((prev) => prev.filter((x) => x.id !== id));
    // TODO: delete from DB
    // (use DELETE request)
  };

  return (
    <>
      <TodoList todos={todos} removeTodo={deleteTodo} />
      <NewTodo addTodo={addTodo} />
    </>
  );
}

function NewTodo({ addTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <div>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => addTodo({ title, description })}>
          add todo
        </button>
      </div>
    </div>
  );
}

function TodoList({ todos, removeTodo }) {
  return (
    <ul>
      {todos.map((todo) => {
        console.log("todo:", todo);
        return (
          <li
            key={todo.id}
            onClick={(e) => removeTodo(todo.id)}
            style={{ cursor: "pointer" }}
          >
            {todo.title} ({todo.description})
          </li>
        );
      })}
    </ul>
  );
}

