// ArticleDetailPage.tsx
// Displays the full content of a single article, fetched by ID from the API

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios"; // Axios instance with JWT handling

// Article type definition
type Article = {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  image_url?: string;
};

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState("");

  // Fetch the article from the API when the component mounts or ID changes
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        //const token = localStorage.getItem("token");
        const response = await api.get(`/articles/${id}`);
        setArticle(response.data);
      } catch (err) {
        setError("Failed to load the article");
        console.error(err);
      }
    };

    fetchArticle();
  }, [id]);

  // Show error message if fetch failed
  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  // Show loading message until article is fetched
  if (!article) {
    return <p className="text-center mt-10">Loading article...</p>;
  }

  // Render the article content
  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <p className="text-sm text-gray-500">Autor: {article.author} · {article.created_at}</p>
      {article.image_url && (
        <img src={article.image_url} alt={article.title} className="w-full rounded shadow" />
      )}
      <p className="text-gray-700 mt-4 whitespace-pre-line">{article.content}</p>
    </div>
  );
}
