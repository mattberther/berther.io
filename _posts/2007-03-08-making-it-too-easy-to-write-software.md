---
title: Making it too easy to write software
disqus_identifier: 2007-03-making-it-too-easy-to-write-software
comments: true
---

This article came through Google Reader not long ago, and initially I skipped past it, but I ended up coming back to it, because I think this message in this post epitomizes why so much of our software ends up in the state that it is.

The headline to the article is: "[Microsoft ruined databinding when they dropped component support][1]".

Wow! Let me state that again: "Microsoft ruined databinding when they dropped component support."

The core issue here is that Microsoft was unable to implement a component tray for components in VS.NET 2005. The model used in VS 2003 was much to buggy to consider for VS 2003 and has committed to looking at solutions for future solutions.

Microsoft ruined databinding when they dropped component support. I could not disagree more strongly with this statement, because I am absolutely positive that databinding still functions completely.

What Microsoft has done is created the need for developers to actually understand whats going on under the covers. Its not as easy to "write" an "application" by simply dragging and dropping things around on a design surface. I have no idea why this is a bad thing.

This type of simplicity can be great for a quick prototype, however, for maintainable, testable, quality software, people have to be willing to write some code instead of dragging/dropping database connections on a design surface.

Its much easier to get an elegant design, as well as a system under test when you have clearly separated concerns that can take advantage of concepts such as Inversion of Control and Dependency Injection. The designer-based databinding model did not allow for this at all.

We should only hope that by removing the component tray for VS.NET 2005 that Microsoft has encouraged developers to understand more about how the technology works, and that the developers are able to take some time to inject thoughts around quality and testing into the code.

Thank you Microsoft, for understanding that less can be more. I only hope that the Control lifecycle is the next thing on the chopping block. The concept of a Control/Page seems so bloated, if you think about the fact that all of this stuff happens so that you can get designer support in VS.NET.

[1]:http://www.entityspaces.net/blog/MicrosoftRuinedDataBindingInASPNET20WhenTheyDroppedComponentSupportFromTheDesignSurface.aspx
