// AdminDashboard.tsx
// Admin dashboard page for managing articles
// Allows listing, editing and deleting articles using protected API calls

import { useEffect, useState } from "react";
import api from "../api/axios"; // Axios instance with JWT interceptor
import { useNavigate, Link } from "react-router-dom";

// Type definition for article objects
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

  // Fetch all articles from the backend
  const fetchArticles = async () => {
    try {
      const response = await api.get("/articles/"); 
      setArticles(response.data);
    } catch (err) {
      setError("Failed to load articles.");
      console.error(err);
    }
  };

  // Delete a specific article by ID
  const deleteArticle = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this article?");
    if (!confirmed) return;

    try {
      await api.delete(`/articles/${id}`); // interceptor přidá token
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert("Failed to delete article.");
      console.error(err);
    }
  };

  // Load articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Article Administration</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Created</th>
            <th className="p-2 border">Actions</th>
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
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
