---
title: TDD can lead to a simpler design
disqus_identifier: 2005-12-tdd-can-lead-to-a-simpler-design
comments: true
---

A few weeks ago, I was working through an issue with one of the projects Im responsible for. Basically, we have a collection of id/name pairs that needed to be sorted alphabetically by name.

I started working through how to attack this problem and ended up with an absolutely over-designed solution, involving 4 different objects and approximately 200 lines of code. I thought that surely there had to be a better way of solving this problem, so I shelved what I had and started over using TDD.

I wrote one test at a time, writing just enough code to make the test pass. In the end, I have one very well tested class that is responsible for sorting these items. Amount of production code: 14 lines. Clearly a better solution.

Interestingly enough, I saw a similar result from Robert Martin's presentation at our organization last week when he went through his TDD example to [calculate bowling scores][1].

[1]:http://www.objectmentor.com/resources/articles/xpepisode.htm
