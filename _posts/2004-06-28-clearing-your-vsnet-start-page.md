---
title: Clearing your VS.NET start page
disqus_identifier: 2004-06-clearing-your-vsnet-start-page
comments: true
---

Earlier today, I was looking for a way to remove items from my VS.NET start page, yet still retain the projects on disk. The solution I found was to delete the registry key `HKCU\Software\Microsoft\VisualStudio\7.1\ProjectMRUList`. 

This will remove *all* the items from the MRU list in the start page and the file menu. It will not remove the projects themselves.
