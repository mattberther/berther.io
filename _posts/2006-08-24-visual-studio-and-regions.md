---
title: Visual Studio and regions
disqus_identifier: 2006-08-visual-studio-and-regions
comments: true
---

At work, we like to group methods together by scope, meaning that all private methods are group together, and so on. The best way we've found to handle this is to define regions for each scope level.

However, I personally, like to see the whole file when I open it. However, C# defaults to collapsing the regions. Up until a few minutes ago, this was a frustration that I just thought I had to deal with.

Open Tools | Options from Visual Studio and select C# under the Text Editor option. Click the Advanced option and uncheck 'Enter outlining mode when files open'. Voila. Files open expanded.
