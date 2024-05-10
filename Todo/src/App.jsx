import { useState,useEffect } from 'react'

import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('todos'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = { text: taskInput, completed: false };
      setTasks([...tasks, newTask]);
      updateLocalStorage([...tasks, newTask]);
      setTaskInput('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem('todos', JSON.stringify(updatedTasks));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="task-input">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list p1 ">
        {tasks.map((task, index) => (
          <li  key={index} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <span>{task.text}</span>
            <button onClick={() => removeTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App
