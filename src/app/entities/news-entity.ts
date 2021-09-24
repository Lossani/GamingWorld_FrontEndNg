export interface source{
    id: string,
    name: string
}

export interface article {
    source: source,
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}

export interface topHeadlines{
    status: string,
    totalResults: number,
    articles: article[],
}

export interface allArticles{
    
}