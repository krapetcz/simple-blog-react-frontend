import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateArticlePage() {
  const [articlename, setArticlename] = useState(""); // přidáno
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      //console.log("Token při odeslání:", token);
      await axios.post("/api/articles", {
        articlename,  // přidáno
        title,
        content,
        image_url: image // pokud backend nezpracovává, můžeš odebrat
      }, {
        headers: {
          Authorization: `Bearersss ${token}`,
        },
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Nepodařilo se vytvořit článek.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Vytvořit nový článek</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Krátké jméno článku (articlename)"
          value={articlename}
          onChange={(e) => setArticlename(e.target.value)}
          className="w-full border px-3 py-2"
        />
        <input
          type="text"
          placeholder="Název"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2"
        />
        <textarea
          placeholder="Obsah"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2 h-40"
        />
        <input
          type="text"
          placeholder="URL obrázku"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Vytvořit
        </button>
      </form>
    </div>
  );
}
