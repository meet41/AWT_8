const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const tasksFilePath = path.join(__dirname, 'tasks.json');

app.use(bodyParser.json());

// Read tasks
app.get('/api/tasks', (req, res) => {
    fs.readFile(tasksFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read tasks' });
        }
        const tasks = JSON.parse(data);
        res.json(tasks);
    });
});

// Create task
app.post('/api/tasks', (req, res) => {
    const newTask = req.body;
    fs.readFile(tasksFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read tasks' });
        }
        const tasks = JSON.parse(data);
        tasks.push(newTask);
        fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save task' });
            }
            res.status(201).json(newTask);
        });
    });
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    fs.readFile(tasksFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read tasks' });
        }
        let tasks = JSON.parse(data);
        tasks = tasks.map(task => task.id === taskId ? updatedTask : task);
        fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update task' });
            }
            res.json(updatedTask);
        });
    });
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    fs.readFile(tasksFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read tasks' });
        }
        let tasks = JSON.parse(data);
        tasks = tasks.filter(task => task.id !== taskId);
        fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete task' });
            }
            res.status(204).end();
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});