---
title: Visual Studio designer code
disqus_identifier: 2003-04-visual-studio-designer-code
comments: true
---

Shawn Van Ness had a great [post][1] a while back about not subscribing to your own events, because of the unnecessary havoc that it can wreak on your code.

Wouldn't it be nice if you could customize the VS.NET designer to generate code to your liking? To implement the ideas in the article above, I have to manually go through each of my .as?x files, and remove the line:

``` csharp
this.Load += new System.EventHandler(Page_Load)
```

from the InitializeComponent, and then modify the Page_Load method signature to:

``` csharp
protected override OnLoad(System.EventArgs e)
```

With an IDE as wonderful and as extensible as VS.NET, why am I not allowed to modify this generated code?

[1]:http://dotnetweblogs.com/SAVanNess/posts/3646.aspx
