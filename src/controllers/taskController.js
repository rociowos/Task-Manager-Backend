const { validationResult } = require('express-validator');
const Task = require('../models/task');

// Crear tarea
exports.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// Obtener todas las tareas
exports.getTasks = async (req, res, next) => {
  try {
    const { completed } = req.query;  // Filtrar por estado
    const filter = completed ? { completed: completed === 'true' } : {};
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// Obtener tarea por ID
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// Actualizar tarea
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// Eliminar tarea
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (err) {
    next(err);
  }
};
