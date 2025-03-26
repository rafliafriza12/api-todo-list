import express from "express";
import {
  createTodo,
  deleteTodo,
  editTodo,
  getAllTodos,
} from "../controllers/todoController.js";

const todoRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API untuk mengelola todo list
 */

/**
 * @swagger
 * /todo/createTodo:
 *   post:
 *     summary: Membuat todo baru
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your_token_here"
 *         description: "Masukkan token Bearer yang valid untuk mengakses endpoint ini."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Belajar Swagger"
 *           examples:
 *             contoh1:
 *               value:
 *                 text: "Mengerjakan tugas"
 *     responses:
 *       201:
 *         description: Todo berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todo berhasil dibuat"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "65f7a0d5c4b4e3d2f9d8f8e5"
 *                     text:
 *                       type: string
 *                       example: "Mengerjakan tugas"
 *                     onCheckList:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Text is required
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "Text is required"
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *              example:
 *                  status: 500
 *                  message: "Internal Server Error"
 */
todoRouter.post("/createTodo", createTodo);

/**
 * @swagger
 * /todo/updateTodo/{todoId}:
 *   put:
 *     summary: Mengupdate todo
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID todo yang akan diupdate
 *         example: "65f7a0d5c4b4e3d2f9d8f8e5"
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your_token_here"
 *         description: "Masukkan token Bearer yang valid untuk mengakses endpoint ini."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               onCheckList:
 *                 type: boolean
 *           examples:
 *             contoh1:
 *               value:
 *                 text: "Update todo"
 *                 onCheckList: true
 *     responses:
 *       200:
 *         description: Todo berhasil diupdate
 *         content:
 *           application/json:
 *             example:
 *               message: "Todo berhasil diupdate"
 *               todo:
 *                 id: "65f7a0d5c4b4e3d2f9d8f8e5"
 *                 text: "Update todo"
 *                 onCheckList: true
 *       400:
 *         description: Todo ID atau data tidak lengkap
 *       404:
 *         description: Todo tidak ditemukan
 *       500:
 *         description: Internal Server Error
 */
todoRouter.put("/updateTodo/:todoId", editTodo);

/**
 * @swagger
 * /todo/deleteTodo/{todoId}:
 *   delete:
 *     summary: Menghapus todo
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID todo yang akan dihapus
 *         example: "65f7a0d5c4b4e3d2f9d8f8e5"
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your_token_here"
 *         description: "Masukkan token Bearer yang valid untuk mengakses endpoint ini."
 *     responses:
 *       200:
 *         description: Todo berhasil dihapus
 *         content:
 *           application/json:
 *             example:
 *               message: "Todo berhasil dihapus"
 *       404:
 *         description: Todo tidak ditemukan
 *         content:
 *           application/json:
 *             example:
 *               message: "Todo tidak ditemukan"
 *       500:
 *         description: Internal Server Error
 */
todoRouter.delete("/deleteTodo/:todoId", deleteTodo);

/**
 * @swagger
 * /todo/getAllTodos:
 *   get:
 *     summary: Mendapatkan semua todo milik user
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your_token_here"
 *         description: "Masukkan token Bearer yang valid untuk mengakses endpoint ini."
 *     responses:
 *       200:
 *         description: Daftar todo ditemukan
 *         content:
 *           application/json:
 *             example:
 *               message: "Daftar todo ditemukan"
 *               todos:
 *                 - id: "65f7a0d5c4b4e3d2f9d8f8e5"
 *                   text: "Belajar Swagger"
 *                   onCheckList: false
 *                 - id: "65f7a0d6e4c8d3f9d8f8e6a3"
 *                   text: "Membuat API"
 *                   onCheckList: true
 *       404:
 *         description: Tidak ada todo ditemukan
 *         content:
 *           application/json:
 *             example:
 *               message: "Tidak ada todo ditemukan"
 *       500:
 *         description: Internal Server Error
 */
todoRouter.get("/getAllTodos", getAllTodos);

export default todoRouter;
