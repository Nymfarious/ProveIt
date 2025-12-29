const NEWS_API_KEY = import.meta.env.VITE_NEWSDATA_KEY || localStorage.getItem('proveit-user-newsdata-key')

export async function fetchHeadlines(category = 'top', country = 'us') {
  if (!NEWS_API_KEY) {
    // Return demo data if no API key
    return getDemoArticles(category)
  }

  try {
    const url = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&country=${country}&category=${category}&language=en`
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.status === 'success' && data.results) {
      return data.results.map((article, index) => ({
        id: article.article_id || index,
        title: article.title,
        description: article.description,
        url: article.link,
        image: article.image_url,
        source: article.source_id,
        sourceName: article.source_name || article.source_id,
        date: article.pubDate,
        category: article.category?.[0] || category,
      }))
    }
    return getDemoArticles(category)
  } catch (error) {
    console.error('News fetch error:', error)
    return getDemoArticles(category)
  }
}

function getDemoArticles(category) {
  return [
    { id: 1, title: `Demo: ${category} headline #1`, description: 'This is demo content. Add your NewsData.io API key for live news.', url: '#', source: 'Demo', sourceName: 'Demo Source', date: new Date().toISOString() },
    { id: 2, title: `Demo: ${category} headline #2`, description: 'Configure your API key in DevTools for real news.', url: '#', source: 'Demo', sourceName: 'Demo Source', date: new Date().toISOString() },
    { id: 3, title: `Demo: ${category} headline #3`, description: 'ProveIt supports NewsData.io for live news feeds.', url: '#', source: 'Demo', sourceName: 'Demo Source', date: new Date().toISOString() },
  ]
}
