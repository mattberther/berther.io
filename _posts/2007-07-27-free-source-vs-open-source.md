---
title: Free Source vs Open Source
disqus_identifier: 2007-07-free-source-vs-open-source
comments: true
---

Very often, I hear people referring to open source software as any software in which the deliverable includes source code. This is not the case. There is a fundamental difference between free source and open source.

When delivering the source code for a library or application, developers typically are allowed to make changes to the source code to support their particular business needs. Almost never do these changes end up in the core library. The developer is ultimately responsible for maintaining their changes between releases of the library or application.

Contrast that with an open source model, in which developers contribute code to the trunk, or to the main code base for inclusion in a future version. This way, developers do not have to maintain their changes between releases. Supporting the open source project benefits both the developer as well as the rest of the community using that library or application.

There are pros and cons to each. In some situations, a developer may not want to relinquish complete control of the code base. In this case, a free source model will work better. The con to the open source model is that you could potentially end up with a library full of features or components that nobody is using. The key to solving this is to look for open source projects that are very well managed, such as [nHibernate][1] or [castleproject.org][2].

Yesterday, Phil Haack [challenged users of Open Source Software][3] to contribute to their favorite projects. I strongly support Phil's campaign and have pledged myself to contribute to open source tools that I use on a regular basis. It's a very important way to keep your saw sharp.

I'd like to take Phil's challenge a little bit further and challenge users to contribute to open source projects that they use once per month. This contribution can be financial (as little as $1 goes a long way). The contribution can be a bug fix or a code addition. Regardless of what the contribution is, I urge you to do something to support the people that are working hard to provide us with very high quality free software tools. This is the least we can do to ensure that the libraries we use will continue to evolve.

[1]:http://www.nhibernate.org/
[2]:http://www.castleproject.org/
[3]:http://www.haacked.com/archive/2007/07/26/second-annual-contribute-to-open-source-day.aspx
