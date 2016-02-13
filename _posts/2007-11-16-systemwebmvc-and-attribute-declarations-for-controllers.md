---
title: System.Web.MVC and attribute declarations for controllers
disqus_identifier: 2007-11-systemwebmvc-and-attribute-declarations-for-controllers
comments: true
---

I've managed to take a look at some of the ASP.NET MVC sample code available on the web. This looks really good, and I am quite excited to see some bits that I can reference to start working this into my own project.

One request (for now)... As it stands, each item that should be available via the controller needs to be decorated with an attribute. Separation of concerns is something that really motivates this MVC framework, and because of this, it should be reasonable to state that all public methods in the class that derives Controller should be methods that are available via a URL.

I much prefer the convention over configuration ideas put forward by the Ruby on Rails group. Not having to place this attribute on each method leans more towards convention and also enforces more separation of concerns.

[Phil][1], what do you think? Are you listening?

[1]: http://www.haacked.com
