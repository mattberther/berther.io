---
title: Getting started with Test Driven Development (TDD)
disqus_identifier: 2004-03-getting-started-with-test-driven-development-tdd
comments: true
---

For the last few weeks, Ive been seriously looking into Test Driven Development (TDD) and how it could positively affect my development processes. For the most part, this has been an enlightening experience. Kind of like, why didnt I think of that? 

The principle is very simple. You dont write a bit of code, until you have a test for it that fails. Once you have a test that fails, you write the smallest bit of code that will make the test pass. Along the way, you look for duplications and other refactorings that can be applied to make the code more usable (making sure to run your tests afterward to insure that nothing has been broken by the changes).

A superb advantage to using TDD is also the iterative process by which you evolve your design. By creating the client code (test) first, you immediately start to see how usable your API is, and how it should be called, instead of trying to invision this all at the start of the project. This ends up getting you away from the "boy, it really seemed like a good idea at the time" style of programming.

Another advantage is the fact that anyone using your component has a great example on how to use the API, furthering the  idea of self-documenting code.

Of course, there is nothing that forces you to do this. The biggest factor driving TDD is your discipline. Either you choose to do it, or you dont. None of the tools available will force the practice on you.

It seems like it would be overly difficult to go through and write unit tests for existing libraries, so I'm just chomping at the bit for a new project, so that I can start implementing these practices.

There are several valuable resources that I've stumbled across while looking for information on how to best adapt this practice.

If you're looking to get started, check out the following links:

* [Test Driven Development][1] wiki
* [testdriven.com][3] -- a new community site geared towards test-driven developers.
* Craig Andera on [Getting Started with TDD][3]
* Darrel Norton's [TDD Resource][4] page
* A great walkthrough on working through your first TDD project is available from a [sample chapter][5] of the forthcoming book entitled Test Driven Development in .NET by James Newkirk &amp; Alexei Voronstov.

[1]:http://c2.com/cgi/wiki?TestDrivenDevelopment">
[2]:http://www.testdriven.com/">
[3]:http://staff.develop.com/candera/weblog2/PermaLink.aspx?guid=b95b0aec-53fb-47f4-b918-a17d4452d0f7
[4]:http://dotnetjunkies.com/WebLog/darrell.norton/articles/3374.aspx
[5]:http://www.testdriven.com/modules/mydownloads/visit.php?cid=2&amp;lid=2
