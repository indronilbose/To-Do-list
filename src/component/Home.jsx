import React, { useState, useEffect } from "react";
import axios from 'axios';
import './home.css';

const Home = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos when the component mounts
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5001/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/add', { task });
      setTodos([...todos, response.data]); // Update todos list with new todo
      setTask(""); // Clear input field
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  const handleDelete = async (e)=>{
    axios.delete(`http://localhost:3001/delete/${id}`)
    

  }

  return (
    <div className="container">
      <form className="todo-form" onSubmit={handleAdd}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="todo-input"
        />
        <button type="submit" className="todo-btn">Add Todo</button>
      </form>
      <ul>
        {todos.map(todo=> (
          <li key={todo._id}>
            {todo.task} 
          <button className="delete-btn" onClick={handleDelete} >Delete</button></li>
        ))}
      </ul>

    </div>
  );
};

export default Home;