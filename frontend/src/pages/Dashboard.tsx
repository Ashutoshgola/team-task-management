import { useEffect, useState } from "react";
import API from "../api/axios";
import CreateTaskModal from "../compoents/CreateTaskModal";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch {
      alert("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const columns = ["TODO", "IN_PROGRESS", "DONE"];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

      <div className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white"> Team Task Manager</h1>

        <div className="flex gap-3">

          <button
            onClick={toggleTheme}
            className="px-3 py-1 border rounded dark:text-white"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

          {user.role === "ADMIN" && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              + Task
            </button>
          )}

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="text-red-500 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-3 gap-6">
        {columns.map((col) => (
          <div key={col} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">

            <h2 className="font-bold mb-4 text-lg dark:text-white">
              {col.replace("_", " ")}
            </h2>

            {tasks.filter((t) => t.status === col).length === 0 && (
              <p className="text-gray-400 text-sm italic">No tasks here</p>
            )}

            {tasks
              .filter((t) => t.status === col)
              .map((task) => (
                <div
                  key={task._id}
                  className={`p-3 mb-3 rounded border hover:shadow transition ${
                    task.status === "DONE"
                      ? "bg-green-100 dark:bg-green-700"
                      : task.status === "IN_PROGRESS"
                      ? "bg-yellow-100 dark:bg-yellow-700"
                      : "bg-gray-50 dark:bg-gray-700"
                  }`}
                >
                  <h3 className="font-semibold dark:text-white">{task.title}</h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {task.description}
                  </p>

                  <div className="mt-2 text-xs text-gray-400 dark:text-gray-300">
                    {task.dueDate
                      ? new Date(task.dueDate).toDateString()
                      : "No due date"}
                  </div>

                  {user.role === "ADMIN" && (
                    <select
                      className="mt-2 text-sm border rounded p-1 dark:bg-gray-800 dark:text-white"
                      value={task.status}
                      onChange={async (e) => {
                        try {
                          await API.patch(`/tasks/${task._id}`, {
                            status: e.target.value
                          });
                          fetchTasks();
                        } catch {
                          alert("Error updating status");
                        }
                      }}
                    >
                      <option value="TODO">TODO</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="DONE">DONE</option>
                    </select>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>

      {showModal && user.role === "ADMIN" && (
        <CreateTaskModal
          close={() => setShowModal(false)}
          refresh={fetchTasks}
        />
      )}
    </div>
  );
}