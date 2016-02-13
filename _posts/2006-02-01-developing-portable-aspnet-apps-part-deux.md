---
title: Developing portable ASP.NET apps, part deux
disqus_identifier: 2006-02-developing-portable-aspnet-apps-part-deux
comments: true
---

Recently, I developed a website for a client using ASP.NET 2.0, along with the fantastic [MonoRail][1] framework. I'll be posting more on MonoRail in the future, but to put it in a nutshell, Monorail is an MVC web framework similar to Ruby on Rails. Its a very productive, intuitive and easily testable way to develop web applications. If you have not seen or used MonoRail, you owe it to yourself to go check it out.

What I found was that the application I developed worked perfectly when I ran it locally. However, as soon as I uploaded it to the host (crystaltech.com), I couldnt load any page in the application. It errored out with a very cryptic 'SecurityException' with the message 'That assembly does not allow partially trusted callers'.

Naturally, this was a permission issue, since it worked on my dev environment, but what was it, and where do I start? After some back and forth with their support staff, I was able to figure out that crystaltech.com runs their .NET 2.0 servers under a medium trust level, instead of the full trust that .NET 1.1 ran under.

So, in my local web.config, I was able to put the line:

``` xml
<system.web>
    <trust level="Medium" />
</system.web>
```

Immediately, I saw the same behaviour locally as I did on the crystaltech servers. Again, this goes back to developing software using the principle of least responsibility. As security becomes more and more of an issue, I think we as developers owe it to ourselves and our clients to make sure that the software we develop will run in a security-conscious environment.

I've set the trust level to medium in my machine.config file on my VS2005 VM to insure that I dont get bit by this again.

Ultimately, the issue centered around a strong-named assembly calling into the ConfigurationSettings API, which has had a lot of security enhancements in the .NET 2.0 framework. I was able to get the application running by removing the strong name from the affected assemblies, however, Im not sure of the implications of this.

[1]:http://www.castleproject.org/index.php/MonoRail
