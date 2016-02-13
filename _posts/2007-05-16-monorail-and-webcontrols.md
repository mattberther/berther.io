---
title: MonoRail and WebControls
disqus_identifier: 2007-05-monorail-and-webcontrols
comments: true
---

I've been using [Castle's MonoRail][1] for new websites that I've developed for the last couple years or so. I absolutely love the separation of concerns and the testability that this MVC framework brings to me. It's been amazing to watch this project grow under Hammett's leadership over this time. It seems that every time that I start to think about doing something, the framework already supports it. However, not everyone sees the advantages...

When I talk to traditional ASP.NET developers about MonoRail, the first thing I usually hear is something along the lines of: "WHAT?!?! You dont have WebControls? You mean I have to handcode the HTML for a DataGrid?"

Until recently, I had no way of really countering that. Some people think that being able to put together things in a drag-drop manner is much more important than the loose coupling that an MVC type of framework&nbsp;gives. Unfortunately, when that is the case, it's very difficult to get the other side to see the error of their ways. :)

Until now... Recently, MonoRail has introduced the concept of ViewComponents, which are reusable pieces of functionality that you can introduce into your application. Some of my favorite are the DiggStylePagination component, which makes it absolutely dead simple to put paging on any sort of data table.

I also recently discovered a very nice set of use controls written in Javascript which allow you to build interactive web apps. The [Yahoo! User Interface Library][2] is an incredible suite of *FREE* controls.

The beauty of a control library like this is that as you become more and more familiar with it, you're not locking yourself into a specific framework. The YUI Library will work with static HTML files, Ruby on Rails, ASP.NET and (you guessed it) MonoRail. Why wouldn't you give this library a look?

[1]:http://www.castleproject.org/monorail/
[2]:http://developer.yahoo.com/yui/
