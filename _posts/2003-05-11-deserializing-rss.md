---
title: Deserializing RSS
disqus_identifier: 2003-05-deserializing-rss
comments: true
---

I have created a simple object model to define an RSS Feed. This utility should allow you to easily consume an RSS feed into an object structure that can be easily used by your application.

For example:

``` csharp
RssFeed theFeed = RssFeed.Create("http://www.mattberther.com/index.xml")
foreach (RssItem item in theFeed.Channel.Items)
{
    // whatever you want to do with the feed
}
```

[Source Code][1]

Thoughts and feedback are always welcome.

[1]:https://gist.github.com/3762779
