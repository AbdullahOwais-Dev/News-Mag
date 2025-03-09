import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = import.meta.env.VITE_API_KEY; // Ensure this is set in .env
        if (!apiKey) throw new Error("API Key is missing!");

        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "ok") throw new Error(data.message || "Failed to fetch news");
        
        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>

      {loading && <p className="text-center">Loading news... 🔄</p>}
      {error && <p className="text-danger text-center">⚠️ {error}</p>}

      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {articles.length > 0 ? (
          articles.map((news, index) => (
            <NewsItem
              key={index}
              title={news.title || "No Title Available"}
              description={news.description || "No description provided."}
              src={news.urlToImage || "https://via.placeholder.com/150"}
              url={news.url}
            />
          ))
        ) : (
          !loading && <p className="text-center">No news found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default NewsBoard;
