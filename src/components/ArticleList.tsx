// ArticleList.tsx
// Component that fetches and displays a list of articles from the API
// Renders each article as an <ArticleCard />

import { useEffect, useState } from "react";
import api from "../api/axios"; 
import ArticleCard from "./ArticleCard";

// Type definition for articles
type Article = {
  id: number;
  title: string;
  author: string;
  created_at: string;
  excerpt?: string;
};

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState("");

  // Fetch articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get("/articles/");
        setArticles(response.data);
      } catch (err) {
        setError("Failed to load articles.");
        console.error(err);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          id={article.id}
          title={article.title}
          author={article.author}
          createdAt={article.created_at}
          excerpt={article.excerpt}
        />
      ))}
    </div>
  );
}
