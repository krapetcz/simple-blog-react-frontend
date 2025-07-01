import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";

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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/articles");
        setArticles(response.data);
      } catch (err) {
        setError("Nepodařilo se načíst články.");
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
