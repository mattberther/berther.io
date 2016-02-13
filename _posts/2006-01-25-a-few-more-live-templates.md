---
title: A few more live templates
disqus_identifier: 2006-01-a-few-more-live-templates
comments: true
---

A few weeks ago, I talked about [TDD bliss][1] and showed some live templates that I had created for Resharper to relieve some of the more mundane parts of writing unit tests.

The original version of the templates included only a Test method and a TestFixture class. I've updated the live template file to now also include these templates:

* te : A test with an ExpectedException attribute.
* ti : A method called TestInitialize decorated with the [SetUp] attribute.
* td : A method called TestCleanup decorated with the [TearDown] attribute.

This should handle most scenarios you encounter while using NUnit. Of course, these templates can easily be modified to support the VSTS Unit Testing Framework.

**Update**: These live templates are now available on [github][2].

[1]:/2005/12/17/tdd-bliss
[2]:http://github.com/mattberther/resharper-tdd-live-templates
