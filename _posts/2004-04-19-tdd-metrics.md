---
title: TDD Metrics
disqus_identifier: 2004-04-tdd-metrics
comments: true
---

[Matt Hawley][1] has a post that details the first measurements that I've seen regarding the effects of Test Driven Development (TDD).

Some of the interesting numbers:

* 95.8% of developers reported reduced debugging efforts.
* 79% of developers thought that TDD promotes a simpler design
* 92% of developers felt that TDD yielded high-quality code.

The challenges of TDD:

* 40% of developers found adoption of TDD was difficult.
* 16% increase in development time of projects.

I'll be the first to admin that getting into the TDD mindset is quite difficult. There is nothing to force you into doing it other than your own willpower. For me, a great difficulty came from knowing what types of conditions to test for. I recently purchased and downloaded [Pragmatic Unit Testing in C#][2] by the Pragmatic Programmers. This books seems to bridge the gap for me, and things are really starting to click.

Interesting note about the 16% increase in development time (from Matt's reference article) is that the variance in the performance of the teams was large, and the control group did not write any worthwhile automated test cases (even though they were instructed to do so). This factor would make the comparison uneven.

Even if the control groups were identical, is a 16% increase in development time justified if you know that you have a comprehensive set of unit tests that would allow you to more easily add features in the future with confidence?

[1]:http://weblogs.asp.net/mhawley/archive/2004/04/15/114005.aspx
[2]:http://www.pragmaticprogrammer.com/starter_kit/utc/index.html
