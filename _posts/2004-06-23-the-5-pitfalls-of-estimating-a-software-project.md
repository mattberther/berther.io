---
title: The 5 pitfalls of estimating a software project
disqus_identifier: 2004-06-the-5-pitfalls-of-estimating-a-software-project
comments: true
---

Christopher Hawkins has a great piece about the [5 pitfalls of estimating a software project][1]. I wonder how many of his issues would be mitigated by implementing an XP methodology.

Estimates would be a consensus between all parties involved (sales, marketing, development, *and* the customer), thereby getting rid of point one, which was allowing non-technical staffers to give development estimates. I agree with Christopher that it is very easy for a salesperson to think, "well, that is only one button or one screen; it shouldnt take that long". This is, of course, done without any working knowledge of the system and any of its underlying systems which may need to be modified to make this work. By having consensus estimates, everyone (including the customer) buys off on the estimate.

Refusing to look in the mirror is not something that is covered by any programming methodology, and I dont believe is something that can be easily enforced by process. The concept of doing a post-mortem is good, but what makes a post-mortem is great is to correctly identify and learn from your mistakes. This requires a lot of inward looking, which I think people are not accustomed to doing. It is quite difficult to find fault with ones self. Unless you have a strong desire to learn and improve, any sort of post-mortem will be of no benefit. Making a mistake is okay, not learning from it is not. This reminds me of an old quote, "It's not that fact that we shot ourselves in the foot that bothers me, but the fact that we reloaded and fired again."

Additionally, Mr. Hawkins discusses three other items; underestimating design and debugging time, inadequate/unclear requirements/ and taking too large a bite from the apple. I believe that these three items would all be covered by one principle of XP, which is do the simplest thing that can possibly work. 

It's not necessary to have a complete functional specification prior to starting development of an application. Using XP, there is a consensus on a small set of functionality that will be delivered (the simplest thing that could possibly work) and those requirements are generated. If these requirements are inadequate or unclear, then immediate clarification is obtained from the customer, so that work can continue.

It's not necessary to have a fully designed object model in place prior to starting development. By doing the simplest thing that could possibly work and constantly refactoring your code, you will end up with a much more elegant solution than you would by attempting to think of everything at the very beginning.

Now, I understand that prior to a project commencing you will still need to give some sort of ballpark estimate for completion so that it can be determined whether the project's timeline will be congruent with everyone's needs. 

Like Christopher said, if you can break the project down into the simplest thing that could possibly work, the more accurate your estimates will be.

[1]:http://www.christopherhawkins.com/06-01-2004.htm
