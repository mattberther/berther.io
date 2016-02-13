---
title: AllowSorting and ViewState
disqus_identifier: 2005-11-allowsorting-and-viewstate
comments: true
---

Im working through a bug fix round on an ASP.NET project that I've had for a while. One of the issues that we found was that all of the sudden, when turning ViewState off, the Sort functionality stopped working on a particular datagrid that we had. We had to leave ViewState off, because of the sheer amount of data that was being put into the grid was causing timeouts when the page was loading and other issues.

Interestingly enough, it seems that if you turn the view state off, you need to rebind the grid to get sorting to work. Ultimately, this means that you're binding the grid twice.

I had all my code inside of an `if (!Page.IsPostBack)` block, so the fix was simple enough. Im just wondering about performance. Is it that much more expensive to bind twice?
