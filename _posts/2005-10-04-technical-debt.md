---
title: Technical Debt
disqus_identifier: 2005-10-technical-debt
comments: true
---

Its been a few years since I've been introduced to the concept of [Technical Debt][1]. There's been some attention to this idea in the blogsphere again lately.

In a nutshell, when you put off doing something in your development effort, you incur technical debt. This technical debt can include unresolved bugs, insufficient unit tests, or not refactoring when you need it. As discussed in Fowler's article, the technical debt incurs interest, which is extra effor that you do later because of the quick and dirty design choice. You can pay down principal with some refactorings, and this reduces interest payments in the future.

Andy Hunt talks about "[Broken Windows][2]" and how it is critical to take time to address the technical debt in your project, before the entire codebase deteriorates into an unmanageable mess. Phil also has great post on another variation of technical debt, called [design debt][3].

So, how do you [eliminate technical debt][4]? Ward's wiki has a page devoted to that, and mentions two techniques:

* Set aside a regular time to eliminate the debt. For example, 4 hours once a week. If this isnt enough, be more aggressive.
* Making the debt visible. Make sure that the business side of the house knows that the list exists and make sure that they know that "if we dont schedule time to pay off the technical debt, you might not get all the new features you want".

Keep in mind that just because you make the date does not mean you have a successful project. A successful project comes when you deliver it *and* that it's low on Technical Debt. Otherwise, future releases will be dedicated to refactoring, rather than the addition of new features.

[1]:http://www.martinfowler.com/bliki/TechnicalDebt.html
[2]:http://www.artima.com/intv/fixit2.html
[3]:http://haacked.com/archive/2005/09/24/10336.aspx
[4]:http://www.c2.com/cgi/wiki?EliminateTechnicalDebt
