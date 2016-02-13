---
title: Test Driven Development in Microsoft .NET
disqus_identifier: 2004-04-test-driven-development-in-microsoft-net
comments: true
---

Recently, I have been really trying to adopt two of the Extreme Programming (XP) rules. The first being constant refactoring and the second being test driven development (TDD).

Recently, I bought Refactoring: Improving the Design of Existing Code by Martin Fowler. This book is widely considered the holy grail when it comes to refactoring and should be on every developer's bookshelf.

One of the principles of refactoring is that the function of the code doesnt change, and to insure that this remains true after you finish your refactorings, you should have a failing unit test before you make any change to your code.

I've been researching TDD on the web for quite a while, and while there are some fantastic resources available (which I have detailed in another [previous post][1]), I was really looking for a hardcover resource that would guide me through creating my own unit tests.

I'd read some great reviews about [Test-Driven Development in Microsoft .Net][2], by James Newkirk and Alexei A. Vorontsov. James is one of the original creators of [NUnit][3], so his background in the unit testing field is undeniable.

I received the book today, and excitedly started reading through it. While I thought the book was really great, it wasnt quite what I was looking for. I thought that the book really assumed that the developer had previous experience writing tests. I saw the book as really more of a guide on how to effectively refactor a project with unit tests, not creating the tests themselves which is what I had anticipated.

I do have to say that I was really pleased with the sample application that they used throughout the book. This is a very real world application, not some simple program used to demonstrate some concepts. I could easily see how this technique (TDD) could work in the applications that Im developing, if only I had the background in creating the tests themselves.

Again, I want to reiterate that I really do think this is a wonderful book. However, I do think I would've gotten a lot more from it if I would have had a background in writing the tests. 

What Im *really* looking for is a guide on how to pick out which sorts of things should be included in a unit test. Does anyone have any thoughts on resources (books or otherwise) for this?

[1]:/2004/03/16/getting-started-with-test-driven-development-tdd/
[2]:http://www.amazon.com/exec/obidos/ASIN/0735619484/mattbertherco-20
[3]:http://www.nunit.org
