---
title: Blasting open source
disqus_identifier: 2008-04-blasting-open-source
comments: true
---

In the [latest installment][1] of the Elegant Code Cast, David Starr talks with Darrel Carver, a local .NET developer and member of the Elegant Code group. I found the talk quite fascinating, but do want to pick on Darrel for one of his comments.

Repeatedly through the podcast, Darrel mentioned that open source is guilty of continuing the re-invention of software, simply because someone may not like the project owner, or that just one additional feature is needed. After all, as Darrel puts it, why do we need 10 IOC containers? While this may certainly be true, I do not think that it was fair for Darrel to state that this was purely a trait of open source.

Microsoft itself is guilty of continuing and enabling this behavior. Rather than reach to the open source community and leverage the great tools that are already there, Microsoft insists on rebranding tools that have been created in the open source space (NAnt/MSBuild, MonoRail/System.Web.MVC, NUnit/MSUnit, NDoc/Sandcastle, etc). They do this because it is far easier to have enterprises adopt a toolset when it is supported by a company like Microsoft. What I fail to see is why enterprises that use Java do not have the same problems. I also fail to see how the open source community can be faulted without mention of the identical behavior from the platform vendor. After all, had we been blindly following the tools given to us by a vendor, many of us would have never even been exposed to IOC, xUnit or many of the other principles that ALT.NET developers hold dear.

The primary difference is that the majority of different open source projects add their own value in ways. Take for example StructureMap vs Castle Windsor. The essence of both is the same; they are both IOC containers. StructureMap has been around a bit longer, but Castle Windsor has many more features, including interceptors, facilities and such. These diverse feature sets are where the value of multiple projects comes to bear. However, simply re-branding the best of breed projects does nothing to add value. 

It is these re-branded projects that make Darrel's point: many projects that do not add value do much to clutter up the developers toolbox and should be eliminated.

[1]: http://elegantcode.com/cast/archives/8
