import { Request, Response } from "express";
import Task from "../models/Task";

export const createTask = async (req: any, res: Response) => {

  try {

    const { title, description, projectId, assignedTo, dueDate } = req.body;
    if (!title || title.trim() === "") {

      return res.status(400).json({ message: "Title is required" });

    }

    if (!projectId) {

      return res.status(400).json({ message: "Project ID is required" });

    }
    const task = await Task.create({

      title,
      description,
      projectId,
      assignedTo,
      dueDate
    });

    res.status(201).json(task);

  } catch (error: any) {

    res.status(500).json({ message: error.message });

  }

};

export const getTasks = async (req: any, res: Response) => {

  try {

    const tasks = await Task.find();
    // console.log(tasks);

    res.json(tasks);

  } catch (error: any) {

    res.status(500).json({ message: error.message });

  }

};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOverdueTasks = async (req: any, res: Response) => {

  try {

    const tasks = await Task.find({

      assignedTo: req.user.id,

      dueDate: { $lt: new Date() },

      status: { $ne: "DONE" }

    });

    res.json(tasks);

  } catch (error: any) {

    res.status(500).json({ message: error.message });

  }

};