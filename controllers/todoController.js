import Todo from "../models/Todo.js";
import { verifyToken } from "../middleware/auth.js";

export const createTodo = [
  verifyToken,
  async (req, res) => {
    try {
      const { text } = req.body;
      const userId = req.user.userId;
      if (!text) {
        return res.status(400).json({
          status: 400,
          message: "Text is required",
        });
      }
      const newTodo = new Todo({ userId, text });

      await newTodo.save();

      return res.status(201).json({
        status: 201,
        data: newTodo,
        message: "todo's created",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
];

export const editTodo = [
  verifyToken,
  async (req, res) => {
    try {
      const { todoId } = req.params;
      const { text, onCheckList } = req.body;

      if (!todoId) {
        return res.status(400).json({
          status: 400,
          message: "Todo ID is required, but not provide",
        });
      }

      if (!text || !onCheckList) {
        return res.status(400).json({
          status: 400,
          message: "All field is required",
        });
      }

      const todo = await Todo.findById(todoId);

      if (!todo) {
        return res.status(404).json({
          status: 404,
          message: "Todo's not found",
        });
      }

      todo.set("text", text);
      todo.set("onCheckList", onCheckList);

      await todo.save();

      return res.status(200).json({
        status: 200,
        data: todo,
        message: "Todo's updated",
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
];

export const deleteTodo = [
  verifyToken,
  async (req, res) => {
    try {
      const { todoId } = req.params;
      if (!todoId) {
        return res.status(400).json({
          status: 400,
          message: "Todo ID is required, but not provide",
        });
      }

      const deletedTodo = await Todo.findByIdAndDelete(todoId);

      if (!deletedTodo) {
        return res.status(404).json({
          status: 400,
          message: "Todo's not found",
        });
      }

      return res.status(200).json({
        status: 200,
        data: deletedTodo,
        message: "Todo's deleted",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
];

export const getAllTodos = [
  verifyToken,
  async (req, res) => {
    try {
      const userId = req.user.userId;

      const todos = await Todo.find({ userId: userId });

      if (todos.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "Todos not found",
        });
      }

      return res.status(200).json({
        status: 200,
        data: todos,
        message:
          todos.length > 1
            ? `${todos.length} Todos founded`
            : `${todos.length} Todo founded`,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
];
