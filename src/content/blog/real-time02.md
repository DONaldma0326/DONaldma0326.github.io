---
title: "Real-Time RAG data platform - Ingestion"
description: "To begin our project, we first need to acquire the necessary data. I have decided to use RSS to implement this feature, as it provides a reliable way to subscribe to URLs and recei"
publishDate: 2026-06-13
tags:
  - "Project"
  - "RAG"
---

To begin our project, we first need to acquire the necessary data. I have decided to use RSS to implement this feature, as it provides a reliable way to subscribe to URLs and receive updated feeds.

## What is RSS?

Really Simple Syndication (RSS) is a technology that allows people to automatically receive updates from different websites—such as news sites, blogs, or podcasts—without having to visit each site individually.

RSS introduces the concept of "feeds" which is some auto-generated, continuously updated standard XML files containing information like the latest headlines and posts. Users can utilize an RSS reader to subscribe to these feeds and view updated information from a single interface.

##  RSS on BBC

Here is a quick example of how to use RSS to retrieve posts from BBC News.

Python
```
import feedparser
import trafilatura
import time

# 1. Define your news sources
news_feeds = [
    "https://feeds.bbci.co.uk/news/rss.xml"    # Example: BBC UK
]
def fetch_and_clean_news(rss_url):
    feed = feedparser.parse(rss_url)
    articles = []
    
    for entry in feed.entries[:5]: # Limit to 5 per feed to start
        # 2. Extract the actual article content from the link
        # trafilatura is much more robust than BeautifulSoup for article text
        downloaded = trafilatura.fetch_url(entry.link)
        if downloaded:
            clean_text = trafilatura.extract(
                downloaded, 
                include_comments=False, 
                output_format="markdown"
            )
            articles.append({
                "title": entry.title,
                "url": entry.link,
                "content": clean_text,
                "published": getattr(entry, 'published', 'N/A')
            })
    return articles

for feed in news_feeds:
    data = fetch_and_clean_news(feed)
    for article in data:
        print(f"Title: {article['title']}\nContent: {article['content'][:200]}...\n")

```

Websites that support RSS provide an explicit URL to retrieve their feeds. For BBC UK, the URL is <i>https://feeds.bbci.co.uk/news/rss.xml</i>. We can use feedparser, Python package for reading RSS data, to parse the feeds and extract the content. By incorporating RSS URL and checking for updates every few seconds, we can create our own real-time data source for BBC news.

We now have sample data that we can feed into our RAG system. Let’s move on to how we can transform this data and design a RAG data store.

## 🔗 Resources

[What is RSS](https://www.youtube.com/watch?v=6HNUqDL-pI8&pp=ygUDUlNT)

[BBC RSS doc](https://support.bbc.co.uk/platform/index.htm)
