import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5050/api/auth/login", {
        username,
        password,
      });
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setError("");
      navigate("/dashboard");
    } catch (err) {
      setError("Chybné přihlašovací údaje.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10 space-y-4">
      <input
        type="text"
        placeholder="Uživatelské jméno"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="Heslo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
        Přihlásit se
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
