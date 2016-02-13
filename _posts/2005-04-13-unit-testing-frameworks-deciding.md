---
title: "Unit Testing Frameworks: Deciding"
disqus_identifier: 2005-04-unit-testing-frameworks-deciding
comments: true
---

As we start migrating towards a more agile environment at work, I want to bring forward a unit testing framework that we could standardize on. The way I see it there are four unit testing frameworks available for the .NET framework right now. These are [NUnit][1], [MbUnit][2], [csUnit][3] and [Zanebug][4].

NUnit is the de facto standard as far as unit testing goes. NUnit started as a direct port of Kent Beck's JUnit framework. Over the course of time, it has evolved to use several features of the .NET framework that make it much easier to use such as custom attributes and reflection related capabilities. Most books and tutorials that are written around unit testing in the .NET framework use NUnit as the framework of choice. This is a big deal.

csUnit has not been updated since November 9, 2003. No, thanks! I want something that will have continuous development and improvements.

I believe that Zanebug is the latest player in the unit testing framework arena. Zanebug looks very promising as an open source unit testing tool. It includes NUnit compatibility to the point of providing the ability to run existing NUnit tests without modification. It also provides additional features such as performance metrics, results graphing, and perfmon integration.

MbUnit was written by Jonathon de Halleux and has quickly progressed into a very robust framework. One of my favorite features of MbUnit is the console runner that you can use to generate HTML reports. It allows you to give your unit test assembly a Main method and distribute it as an exe. This is kinda cool.

A very compelling argument for MbUnit is its packaging with [TestDriven.NET][5] which is an addin that lets you execute tests on any piece of code directly in the VS.NET IDE. 

Similarly to Zanebug, MbUnit is compatible with NUnit in that you only have to change the namespaces. MbUnit seems to have a lot of the same additional features that Zanebug does, including test decorators which handle repeated tests, "timed" tests, load tests, multi-threaded tests. MbUnit offers a very rich feature set, but there is also a nice extensibility model should there be something that you need that isnt present.

At work, we are using CruiseControl.NET for all of our projects and so I think it would be really nice if the unit testing framework could be integrated into NAnt and CruiseControl. At this point, the only solutions that do this are NUnit and MbUnit.

As such, I think the recommendation that Im going to bring to our team will be MbUnit, as it seems to have the most features as well as integration with the tools that we're using (VS.NET and CruiseControl).

[1]:http://www.nunit.org
[2]:http://mbunit.tigris.org
[3]:http://www.csunit.org
[4]:http://www.adapdev.com/zanebug
[5]:http://www.testdriven.net/
