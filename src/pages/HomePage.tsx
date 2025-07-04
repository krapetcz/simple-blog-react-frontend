// HomePage.tsx
// Homepage component that displays a heading and a list of all blog articles

import ArticleList from "../components/ArticleList";

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Články
      </h1>
      <ArticleList />
    </div>
  );
}
