const express = require('express');
const app = express();
const { Todo } = require('./models');

app.use(express.json());

// Obtener todas las tareas
app.get('/todos', async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

// Obtener una tarea por su ID
app.get('/todos/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  res.json(todo);
});

// Crear una nueva tarea
app.post('/todos', async (req, res) => {
  const { title, description, completed } = req.body;
  const todo = await Todo.create({ title, description, completed });
  res.json(todo);
});

// Actualizar una tarea
app.put('/todos/:id', async (req, res) => {
  const { title, description, completed } = req.body;
  const todo = await Todo.update({ title, description, completed }, { where: { id: req.params.id } });
  res.json(todo);
});

// Eliminar una tarea
app.delete('/todos/:id', async (req, res) => {
  await Todo.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Tarea eliminada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
