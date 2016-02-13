---
title: Clean Code
disqus_identifier: 2006-02-clean-code
comments: true
---

I've long placed very high value on writing exceptionally clean code. The latest article ([pdf][1]) from Uncle Bob talks about the steps that it takes to take a "[big ball of mud][2]" and turning into something that is very easy to extend and maintain.

An excerpt:

>If you have been a programmer for more than two or three years, you have probably been significantly slowed down by someone else's messy code. If you have been a programmer for longer than two or three years, you have probably been slowed down by your own messy code. The degree of the slow-down can be significant. Over the span of a year or two, teams that were moving very fast at the beginning of a project can find themselves moving at a snail's pace. Every change they make to the code breaks two or three other parts of the code. No change is trivial. Every addition or modification to the system requires that the tangles, twists, and knots be "understood" so that more tangles, twists, and knots can be added. Over time the mess becomes so big and so deep and so tall, they can not clean it up. There is no way at all.

>As the mess builds, the productivity of the team continues to decrease, asymptotically approaching zero. As productivity decreases, management does the only thing they can; they add more staff to the project in hopes of increasing productivity. But that new staff is not versed in the design of the system. They don't know the difference between a change that matches the design intent, and a change that thwarts the design intent. Furthermore, they, and everyone else on the team are under horrific pressure to increase productivity. So they all make more and more messes, driving the productivity ever further towards zero.

I think this essay is absolutely spot-on, and is the reason why constant refactoring should be an implied part of every developers day to day tasks. Leave it neater than you found it. Im not advocating going through and performing a massive amount of refactorings all at once, but if everyone does a little something every time they look at a piece of code, before you know it, you have a very elegant, loosely coupled, and most importantly, well-tested code base.

[1]:http://www.objectmentor.com/resources/articles/Clean_Code_Args.pdf
[2]:http://www.laputan.org/mud/mud.html
