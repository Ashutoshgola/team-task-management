import { Request, Response } from "express";
import Project from "../models/Project";

export const createProject = async (req: any, res: Response) => {
  try {
    const { name, description, members } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,
      members
    });
    res.json(project);
    res.status(201).json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req: any, res: Response) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user.id },
        { members: req.user.id }
      ]
    });

    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};