---
title: Developing portable ASP.NET apps
disqus_identifier: 2006-01-developing-portable-aspnet-apps
comments: true
---

We develop ASP.NET applications in our environment that may or may not be run on a clustered environment. As part of this clustered environment, we have session state set to SqlServer in the web.config file.

Due to this, we always have to be really careful to make sure that any items we add to the Session collection either has the `[Serializable]` attribute or implements ISerializable.

It seems as though, without fail, an object generally tends to be forgotten. I've found a quick way to make sure that this doesnt happen.

One of the first things Ive started doing with any new application I develop is to change the session state to use StateServer. Prior to doing this, you need to insure that you've started the ASP.NET State Server service using the Services MMC, or issuing the command 'net start aspnet_state' on the command line. This allows the Session to go through the same process and quickly exposes any serialization requirements you may have missed.

Once you deploy your application, you can always set it back to InProc, or change it to SqlServer, but you now know that your application will work correctly with either setting.
