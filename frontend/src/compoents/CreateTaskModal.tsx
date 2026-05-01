import { useState, useEffect } from "react";
import API from "../api/axios";

export default function CreateTaskModal({ close, refresh }: any) {
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "TODO",
    dueDate: ""
  });

  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);

        if (res.data.length > 0) {
          setSelectedProject(res.data[0]._id);
        }
      } catch {
        alert("Error fetching projects");
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async () => {
    if (!form.title || form.title.trim() === "") {
      alert("Title is required");
      return;
    }

    if (!selectedProject) {
      alert("Please select a project");
      return;
    }

    try {
      await API.post("/tasks", {
        ...form,
        projectId: selectedProject
      });

      refresh();
      close();
    } catch {
      alert("Error creating task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        
        <h2 className="text-xl font-bold mb-4">Create Task</h2>

        {/*Project Dropdown */}
        <select
          className="w-full p-2 border rounded mb-3"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Title */}
        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* Description */}
        <textarea
          className="w-full p-2 border rounded mb-3"
          placeholder="Description"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* Due Date */}
        <input
          type="date"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) =>
            setForm({ ...form, dueDate: e.target.value })
          }
        />

        {/* Status */}
        <select
          className="w-full p-2 border rounded mb-4"
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button onClick={close} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}