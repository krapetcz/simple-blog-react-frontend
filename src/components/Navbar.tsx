import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // přesměrování
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow">
      <div className="max-w-4xl mx-auto flex justify-between">
        <Link to="/" className="font-bold text-xl">
          Flask Blog
        </Link>
        <div className="space-x-4">
          {isLoggedIn && (
            <>
              <Link to="/dashboard" className="hover:underline">Admin Dashboard</Link>
              <Link to="/admin/create" className="hover:underline">Vytvořit článek</Link>
              <button onClick={handleLogout} className="hover:underline">Odhlásit se</button>
            </>
          )}
          {!isLoggedIn && (
            <Link to="/login" className="hover:underline">Přihlásit se</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
