// CreateArticlePage.tsx
// Page for creating a new article. Sends form data to the backend via POST request
// Handles validation errors and optional image URL input

import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

// Form for creating an article with title, content and optional image URL
export default function CreateArticlePage() {
  // Form field states
  const [articlename, setArticlename] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare payload
    const payload: any = {
      articlename,
      title,
      content,
    };

    // Only include image_url if provided
    if (image.trim() !== "") {
      payload.image_url = image;
    }

    try {
      // Send POST request to backend
      await api.post("/articles/", payload);
      navigate("/dashboard");
    } catch (err: any) {
      // Extract and format backend validation errors
      const errorData = err?.response?.data?.error;
      if (errorData && typeof errorData === "object") {
        const errorMessages = Object.entries(errorData)
          .map(([key, val]) => `${key}: ${(val as string[]).join(", ")}`)
          .join(" | ");
        setError(errorMessages);
      } else {
        const msg = err?.response?.data?.msg || "Failed to create the article.";
        setError(msg);
      }

      console.error("Axios error:", err.response?.data);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create New Article</h1>
      {error && (
        <div className="text-red-500 border border-red-300 p-2 rounded bg-red-50">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Short article name (articlename)"
          value={articlename}
          onChange={(e) => setArticlename(e.target.value)}
          className="w-full border px-3 py-2"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2 h-40"
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
