---
title: VS 2005 Web Projects
disqus_identifier: 2005-10-vs-2005-web-projects
comments: true
---

Scott Guthrie has an article available on MSDN that talks about what the [web project system][1] is and why they did it that way.

All in all, a very informative read... I am going to express some disappointment in the lack of a master project file for web projects. This makes using an msbuild sln file as part of a CruiseControl.NET build process impossible. It appears as if the web projects require references to be stored in the bin folder.

We've encountered this issue and have resolved it by creating a separate msbuild file that builds every project underneath it, and then copies the output of those builds to the web project's bin folder. After this, then it builds the web project.

This just *screams* hack. Continuous integration is becoming more and more popular and is a use case that the ASP.NET team should be supporting.

[1]:http://msdn.microsoft.com/asp.net/default.aspx?pull=/library/en-us/dnaspp/html/VS05WebProjSys.asp
