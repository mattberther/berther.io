---
title: TestDriven.NET 1.0
disqus_identifier: 2004-11-testdrivennet-10
comments: true
---

Looks like Jamie finally released [TestDriven.NET][1] version 1.0 today. This is the tool formerly known as NUnitAddin. Jamie has taken this thing *so* much further, now providing integrated support for all major unit testing frameworks, including the forthcoming Team System.

I was using the NUnitGUI until I came across this tool. No more. No more switching back and forth between NUnitGUI and VS.NET. TestDriven.NET runs all of your tests from a right click context menu in VS.NET. Test output goes directly to the output window. 

What do you want to test? A single method? Right click on the method and click Run Test(s). An entire class? Right click on the class name and click Run Test(s). A namespace? Right click on the namespace and click Run Test(s). You get the idea.

Again, this is compatible with all major unit testing frameworks, so the Right click/Run Test(s) technique works whether your using mbUnit, nUnit or even Team System. How cool is that?

Ad-hoc tests are also supported. Ad-hoc tests offer a useful alternative to those throw-away console applications which we use to explore private methods or 3rd party code. Any method can be executed as an ad-hoc test by right clicking inside it and selecting Run Test(s). Are you starting to see a theme here? :=)

On a side note, I've been really exploring [mbUnit][2] lately. (It is distributed with TestDriven.NET). This tool is definately worth a look, as it provides a lot of stuff that requires you to jump through hoops to do with nUnit. For example:

* A Rollback attribute, which would come in handy for unit testing a data layer. This attribute uses EnterpriseServices to create a COM+ domain around the test. All tests are transacted and rolled back when completed.
* A Duration attribute. This verifies that the method call duration is below a given value.</li>

Earlier today I came across a very interesting feature of mbUnit. [TypeFixture][3] lets you write a fixture for a specific type and apply it to a number of instances of this type. For me, this came in really handy for writing a single fixture for an interface and applying the fixture to all the types that implement the interface.

Wow! This is what people had in mind by doing continuous integration and TDD...

[1]:http://www.testdriven.net
[2]:http://mbunit.tigris.org/
[3]:http://www.testdriven.net/wiki/default.aspx/MyWiki.TypeFixture
