import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending' });
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };
    const handleCreateTask = async () => {
        try {
            const response = await axios.post('/api/tasks', { ...newTask, id: Date.now().toString() });
            setTasks([...tasks, response.data]);
            setNewTask({ title: '', description: '', status: 'pending' });
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleUpdateTask = async (task) => {
        try {
            const response = await axios.put(`/api/tasks/${task.id}`, task);
            setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
            setEditingTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`/api/tasks/${taskId}`);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="App">
            <h1>Task Manager</h1>
            <div>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={handleInputChange}
                />
                <select name="status" value={newTask.status} onChange={handleInputChange}>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
                <button onClick={handleCreateTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {editingTask === task.id ? (
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    value={task.title}
                                    onChange={(e) => handleUpdateTask({ ...task, title: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={task.description}
                                    onChange={(e) => handleUpdateTask({ ...task, description: e.target.value })}
                                />
                                <select
                                    name="status"
                                    value={task.status}
                                    onChange={(e) => handleUpdateTask({ ...task, status: e.target.value })}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <button onClick={() => handleUpdateTask(task)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <p>Status: {task.status}</p>
                                <button onClick={() => setEditingTask(task.id)}>Edit</button>
                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;