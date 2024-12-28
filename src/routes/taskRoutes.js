/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *   post:
 *     summary: Crear una nueva tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea
 *                 example: 'Tarea de prueba'
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea
 *                 example: 'Esta es una tarea de ejemplo'
 *     responses:
 *       201:
 *         description: Tarea creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error en los datos de entrada
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Título de la tarea
 *           example: 'Tarea de prueba'
 *         description:
 *           type: string
 *           description: Descripción de la tarea
 *           example: 'Descripción de la tarea'
 *         completed:
 *           type: boolean
 *           description: Estado de la tarea
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *           example: '2024-12-28T10:00:00Z'
 */

const express = require('express');
const { check, param } = require('express-validator');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

// Crear una tarea
router.post(
  '/',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('description', 'La descripción debe tener máximo 500 caracteres')
      .optional()
      .isLength({ max: 500 }),
  ],
  createTask
);

// Obtener todas las tareas
router.get('/', getTasks);

// Obtener tarea por ID
router.get(
  '/:id',
  [
    param('id', 'ID inválido').isMongoId(), // Validación de ID
  ],
  getTaskById
);

// Actualizar tarea
router.put(
  '/:id',
  [
    param('id', 'ID inválido').isMongoId(),
    check('title', 'El título es obligatorio').optional().not().isEmpty(),
    check('description', 'La descripción debe tener máximo 500 caracteres')
      .optional()
      .isLength({ max: 500 }),
    check('completed', 'El estado debe ser un valor booleano').optional().isBoolean(),
  ],
  updateTask
);

// Eliminar tarea
router.delete(
  '/:id',
  [
    param('id', 'ID inválido').isMongoId(),
  ],
  deleteTask
);

module.exports = router;
