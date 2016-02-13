---
title: How to design a good API
disqus_identifier: 2006-10-how-to-design-a-good-api
comments: true
---

Earlier today, I had the great privilege to listen to Joshua Bloch's invited talk here at OOPSLA. For those not familiar with Joshua, he is a Chief Java Architect at Google, formerly a Distinguished Engineer at Sun Microsystems, where he led the design and implementation of numerous Java platform features.

This talk alone was worth the price of admission to this conference, and Im really hoping to get a video or audio transcript of this conference so that everyone on my team can see or hear this. It was that good!

Some of the things that came through loud and clear for me:

1. An API can be among your greatest assets or liabilities. A good API can greatly enhance your customer experience and can create customers for life. If you create a bad API, you've create a support headache.
2. A public API is forever. You have one chance to get it right. As soon as you put something onto an API, it is permanent.
3. When in doubt, leave it out. This is probably the most important thing when designing an API. Like the above point, an API is forever. It's *much* easier to add to a public API than it is to remove something from the same API. 
4. Minimize accessibility. This is a big thing for me. A lot of developers do not seem to be aware of a scope other than public. It's perfectly valid to start something in a private scope, and only enhancing that scope as necessary.
5. Prefer composition to inheritance. Exposed classes should never subclass just to reuse implementation code. Create a subclass only if you can say that every instance of the subclass is an instance of the superclass. This is the [Liskov Substitution Principle][1].
6. Constant feedback is imperative. Show your API to as many people as possible. Others will think about things that will pass you by.
7. It's not preferred to provide an overload for every potential code path. If the two methods have different behaviour, name them differently.
8. Names are very important. Strive for intelligibility, consistency, and symmetry. Every API is a little language, and people must learn to read and write it. *If you get an API right, code will read like prose*.

There was so much more than these 8 items packed into this 90 minute talk. During the question and answer session afterwards, Joshua did hint that he is working on a book about effective API design and why you want to do it. I'm so looking forward to that. That title could certainly turn into required reading for any developer.

[1]:http://en.wikipedia.org/wiki/Liskov_substitution_principle
