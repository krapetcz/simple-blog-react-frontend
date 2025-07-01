import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateArticlePage() {
  const [articlename, setArticlename] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      articlename,
      title,
      content,
    };

    // pouze pokud uživatel zadal URL obrázku
    if (image.trim() !== "") {
      payload.image_url = image;
    }

    try {
      await api.post("/articles/", payload);
      navigate("/dashboard");
    } catch (err: any) {
      const errorData = err?.response?.data?.error;

      if (errorData && typeof errorData === "object") {
        const errorMessages = Object.entries(errorData)
          .map(([key, val]) => `${key}: ${(val as string[]).join(", ")}`)
          .join(" | ");
        setError(errorMessages);
      } else {
        const msg = err?.response?.data?.msg || "Nepodařilo se vytvořit článek.";
        setError(msg);
      }

      console.error("❌ Axios chyba:", err.response?.data);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Vytvořit nový článek</h1>
      {error && (
        <div className="text-red-500 border border-red-300 p-2 rounded bg-red-50">
          {error}
        </div>
      )}
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
