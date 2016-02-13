---
title: Building Service Layer Recommendations
disqus_identifier: 2005-07-building-service-layer-recommendations
comments: true
---

I'm currently working on a project that's goal will be to provide direction to our team as to what technology we want to use to create a service layer for our applications.

I've picked up Christian Nagel's book (detailed in a previous post), and have become fairly familiar with Enterprise Services (I think).

The thing that Im having the toughest time with right now is that when I use .NET remoting or DCOM as the transport, I *have* to have the runtime on the client. Meaning, if I developed my service using .NET 1.1, I *have* to have .NET 1.1 on the client (even if Whidbey is there). The same goes for a service developed with Whidbey... I have to have Whidbey on the client. I feel that a service should be sitting out there that any client can use and this dependency on runtime seems to go against that.

Using web services seems to get me around this, but the problem I have with web services is that I dont get the rich object model that I do with remoting or DCOM.

Is it even a good idea to have a service layer that is pure ASMX (on an intranet), even if the services are inter-dependant? For example, lets say I have ServiceA, ServiceB and ServiceC and they are implemented as .NET web services. Is this still a good architecture if ServiceA needs to talk to ServiceC to retrieve some piece of data?

Am I just missing something obvious here? Any ideas, or even pointers to content that discusses service layer implementations would be appreciated.
