---
title: Solving problems by elevating permissions
disqus_identifier: 2004-04-solving-problems-by-elevating-permissions
comments: true
---

I've recently been participating in several .NET newsgroups, and I cringe everytime I see a posts asking for help where the answer involves elevating permissions. 

When all else fails, throw excessive permissions at the problem. ARGH!!! Some of the better ones Ive seen are:

* Grant EVERYONE full control of c:\windows\microsoft.net\framework. I dont think I even need to explain why this is bad.
* Apply the APTC attribute. Keith Brown talks about this in one of his [Security Briefs][1].
* Give the ASPNET account full control to a folder. Uh sure, let's open that folder up to anyone with a web browser and an imagination...

When will people realize that elevating permissions unnecessarily to work around something, without finding the *real* reason to the problem, is why Windows has such a shoddy reputation when it comes to security?

If an application has problems writing a file, then grant write access, not full control. If an application can't read a value from the registry, then grant read access, not full control.

Ideally, an application would be developed where the absolute bare minimum permissions are required. Should additional functionality require additional permissions, *then and only then*, just enough permission would be added to make the app work. I believe this is defined as the [Principle of Least Privilege][2].

I'm ever so glad that VS.NET 2005 is making strides in this area by allowing debugging to occur with specific permission sets. Hopefully soon we will see an end to this madness.

*Update:* Looks like Keith Brown has a new article on MSDN discussing [security in Longhorn and the focus on least privilege][3].

[1]:http://msdn.microsoft.com/msdnmag/issues/03/08/SecurityBriefs/
[2]:http://c2.com/cgi/wiki?PrincipleOfLeastPrivilege
[3]:http://msdn.microsoft.com/longhorn/default.aspx?pull=/library/en-us/dnlong/html/leastprivlh.asp
