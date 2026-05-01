import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN"
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", form);
      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <input
          placeholder="Name"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full p-3 border rounded-lg mb-6"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="ADMIN">Admin</option>
          <option value="MEMBER">Member</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
        >
          Signup
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-green-500 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}