---
title: The three qualities of good code
disqus_identifier: 2005-04-the-three-qualities-of-good-code
comments: true
---

Not long ago, I stumbled across a gem on the Refactoring list that talks about [code clarity][1]. The piece is by Michael Feathers, of [Working Effectively with Legacy Code][2] fame.

There are some interesting thoughts that come up after thinking about this article for a bit. I believe that there are three qualities of good code. In order, I think that these qualities are that 1) the code is well tested, 2) the code has a clear intent, and 3) the code is well documented.

I believe that the documentation is least important simply for the fact that its not executable and is not guaranteed to be an accurate representation of the code base. Documentation also does not give me the confidence I would need when jumping into a [big ball of mud][3].

I would prefer to have well tested (read: having sufficient unit tests) code as opposed to clear code every single time. If I have that same big ball of mud and I have a set of comprehensive unit tests, it would be very easy to refactor and increase code clarity and insure that I have not broken anything.

With the clearest code and best documentation, if I have to make a change, I have no easy way to make sure that I got everything right.

Test Driven Development (TDD) has the potential to help my code achieve the first two levels of my defined quality. Since you write no code until you have a test for it, you can insure complete coverage (when starting from scratch). Since TDD's mantra is red/green/refactor, having those tests in place will also help clear up the intent of the code.

Quality is a very subjective term. My definition of code quality could be completely different than someone else's. Given that, the above was just my opinion and of course I could be wrong.

[1]:http://www.objectmentor.com/resources/articles/beforeClarity.pdf
[2]:http://www.amazon.com/exec/obidos/ASIN/0131177052/mattbertherco-20
[3]:http://c2.com/cgi/wiki?BigBallOfMud
