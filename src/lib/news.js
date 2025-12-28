const API_KEY = import.meta.env.VITE_NEWSDATA_KEY;
const BASE_URL = "https://newsdata.io/api/1/news";

// Helper to dedup articles based on strict title matching
function removeDuplicates(articles) {
  const seen = new Set();
  return articles.filter(article => {
    const duplicate = seen.has(article.title);
    seen.add(article.title);
    return !duplicate;
  });
}

export async function fetchHeadlines(category = "top", country = "us") {
  if (!API_KEY) {
    console.error("VITE_NEWSDATA_KEY is missing in .env");
    return [];
  }

  try {
    // Fetching English news, filtering for the specific category
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&country=${country}&language=en&category=${category}`
    );
    
    const data = await response.json();
    
    if (data.status !== "success") {
      throw new Error(data.results?.message || "Failed to fetch news");
    }

    // Transform API shape to match your ProveIt UI Component expectations
    return removeDuplicates(data.results).map(article => ({
      id: article.article_id,
      title: article.title,
      source: article.source_id,
      sourceName: article.source_name || article.source_id,
      url: article.link,
      image: article.image_url, // Might be null, handle in UI with a fallback pattern
      date: article.pubDate,
      description: article.description,
      // Placeholder for your Bias Engine (Step 3)
      biasRating: "analyzing", 
      biasScore: 0
    }));

  } catch (error) {
    console.error("News Fetch Error:", error);
    return [];
  }
}
