import { Link } from "react-router-dom";

type Props = {
  title: string;
  author: string;
  createdAt: string;
  excerpt?: string;
  id?: number;
};

export default function ArticleCard({ title, author, createdAt, excerpt, id }: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-2 border">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      {excerpt && <p className="text-gray-600 text-sm">{excerpt}</p>}
      <div className="text-xs text-gray-500">
        <span>Autor: {author}</span> · <span>{createdAt}</span>
      </div>
      {id && (
        <Link to={`/articles/${id}`} className="text-blue-600 text-sm hover:underline">
          Číst více
        </Link>
      )}
    </div>
  );
}
