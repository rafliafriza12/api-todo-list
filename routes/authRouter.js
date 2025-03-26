import express from "express";
import { register, login, logout } from "../controllers/authController.js";

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API untuk autentikasi pengguna
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Mendaftarkan pengguna baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Pengguna berhasil terdaftar
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               data:
 *                 email: "user@example.com"
 *                 fullName: "John Doe"
 *               message: "Pengguna berhasil terdaftar."
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "Silakan isi semua kolom yang diperlukan."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: "Internal server error"
 */
authRouter.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               data:
 *                 token: "jwt_token_here"
 *               message: "Login Successfully"
 *       400:
 *         description: Email atau password salah
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "Email atau kata sandi salah."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: "Kesalahan server internal"
 */
authRouter.post("/login", login);

/**
 * @swagger
 * /auth/logout/{userId}:
 *   post:
 *     summary: Logout pengguna
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pengguna yang ingin logout
 *     responses:
 *       200:
 *         description: Logout berhasil
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Logout successfully"
 *       400:
 *         description: User ID tidak diberikan
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "User ID is required, but not provided"
 *       404:
 *         description: Pengguna tidak ditemukan
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: "Internal Server Error"
 */
authRouter.post("/logout/:userId", logout);

export default authRouter;
