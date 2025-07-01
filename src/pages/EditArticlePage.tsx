import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  // ⬇️ Načtení dat po načtení stránky
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/articles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const article = response.data;
        setTitle(article.title);
        setContent(article.content);
        setImage(article.image_url || "");
      } catch (err) {
        setError("Nepodařilo se načíst článek.");
        console.error(err);
      }
    };

    fetchArticle();
  }, [id]);

  // ⬇️ Odeslání změn
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/articles/${id}`, {
        title,
        content,
        image_url: image,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Nepodařilo se uložit změny.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Upravit článek #{id}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2 h-40"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border px-3 py-2"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Uložit změny
        </button>
      </form>
    </div>
  );
}
