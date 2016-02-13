---
title: The ASP.NET Page Lifecycle
disqus_identifier: 2007-07-the-aspnet-page-lifecycle
comments: true
---

Alex Mueller posted an article the other day that talks about the [ASP.NET page life cycle][1] and focuses specifically on occasions where OnPreRender may or may not be called.

Alex's post just reiterated to me why I choose [MonoRail][2] over the WebControl model every time. With MonoRail, I have true separation of concerns. With MonoRail, I have views that are responsible only for presentation. With MonoRail, I don't have to worry about a complicated page life cycle. I dont have to concern myself with which method I need to override to get my control to render properly. I dont have to worry about overriding a different method to do the same thing when the control's Visible property is set to false.

MonoRail does everything that a framework should by making the developers day to day tasks easier. Since I've made the switch to using MonoRail, I no longer have to use .NET Reflector to try and understand why some piece of code isnt working the way I expected it to. I also dont have these wierd bugs popping up anymore, because the testability of the controllers in MonoRail is much, much better than the web forms model.

Thanks, Alex, for your post. Your post reaffirmed my deep dislike of the web forms programming model. Thanks to the Castle devs for making a much more intuitive framework.

[1]:http://muellerdesigns.net/DasBlog/PermaLink,guid,112425f6-dfa3-46bf-a995-dd28c7dcbb99.aspx
[2]:http://www.castleproject.org/monorail/index.html
