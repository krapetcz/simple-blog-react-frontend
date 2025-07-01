import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

type Article = {
  id: number;
  title: string;
  author: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/articles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArticles(response.data);
    } catch (err) {
      setError("Nepodařilo se načíst články.");
      console.error(err);
    }
  };

  const deleteArticle = async (id: number) => {
    const confirmed = window.confirm("Opravdu chcete smazat tento článek?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Aktualizuj seznam po smazání
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert("Nepodařilo se smazat článek.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Administrace článků</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Název</th>
            <th className="p-2 border">Autor</th>
            <th className="p-2 border">Vytvořeno</th>
            <th className="p-2 border">Akce</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-t">
              <td className="p-2 border">{article.id}</td>
              <td className="p-2 border">{article.title}</td>
              <td className="p-2 border">{article.author}</td>
              <td className="p-2 border">{article.created_at}</td>
              <td className="p-2 border space-x-2">
                <Link
                  to={`/admin/edit/${article.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Upravit
                </Link>
                <button
                  onClick={() => deleteArticle(article.id)}
                  className="text-red-600 hover:underline"
                >
                  Smazat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
