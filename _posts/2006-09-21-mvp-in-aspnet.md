---
title: MVP in ASP.NET
disqus_identifier: 2006-09-mvp-in-aspnet
comments: true
---

Bill Pierce has been putting together what looks to be a fantastic framework for building ASP.NET applications using Fowler's [Supervising Presenter][1] pattern, using some neat features of the Castle IoC Container (aka Windsor).

I'm capturing the series here so that I can study them as a sequential unit instead of hopping all over his blog to find them.

* [MVP Framework][2]
* [Dependency Injection and UserControls with Castle MicroKernel][3]
* [UserControl Component Activation in Castle MicroKernel][4]
* [MVP Continued][5]
* [MVP - Tying it all Together][6]

The best part of this particular implementation is that the presenters and the interfaces are completely hidden from the web project.

This is very interesting to read and learn more about this particular pattern. Great job, Bill! I look forward to watching this progress.

[1]:http://www.martinfowler.com/eaaDev/SupervisingPresenter.html
[2]:http://blogs.meetandplay.com/WPierce/archive/2006/08/18/MVP_Framework.aspx
[3]:http://blogs.meetandplay.com/WPierce/archive/2006/08/18/Dependency_Injection_and_UserControls_with_Castle_MicroKernel.aspx
[4]:http://blogs.meetandplay.com/WPierce/archive/2006/08/18/UserControl_Component_Activation_in_Castle_MicroKernel.aspx
[5]:http://blogs.meetandplay.com/WPierce/archive/2006/08/19/MVP_Continued.aspx
[6]:http://blogs.meetandplay.com/WPierce/archive/2006/09/04/MVP__Tying_it_all_Together.aspx
