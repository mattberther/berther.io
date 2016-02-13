---
title: ActionFixtures with .NET
disqus_identifier: 2006-05-actionfixtures-with-net
comments: true
---

Recently, I've gotten very interested in FitNesse and how it can be used to enhance the quality of both legacy and new applications. I purchased and have been reading the Fit bible ([Fit for Developing Software : Framework for Integrated Tests][1]). This is an absolutely amazing book and really helps to understand the immense capabilities of Fit.

We are using [Fitnesse][2] and have been kind of muddling our way through figuring things out. Cory has an excellent article that talks about how to [implement an ActionFixture in C#][3]. However, there were certain things about how he chose to implement them that bothered me a little.

I'd like to add some things to his article. It is not necessary to derive from ActionFixture to implement an action fixture. As a matter of fact, everything Im seeing in the Fit book is that you should derive from fixture. This gets around having to define a constructor to work around an issue with deriving action fixture. Because you do that, you can go back to the expected syntax for defining your action fixture

    |!-fit.ActionFixture-!|
    |start|!-FitnessTutorial.CalculatorTest-!|
    |check|display|blank|
    |press|one|
    |check|display|1|

The other thing to watch out for is that if you set up your Fitnesse site to point at your project output folder, you will need to set the Copy Local property on the fit.dll to false. Otherwise, you will end up with wierd errors suggesting that you did not derive from fit.Fixture (when you really did).

[1]:http://www.amazon.com/exec/obidos/redirect?link_code=as2&amp;path=ASIN/0321269349&amp;tag=mattbertherco-20&amp;camp=1789&amp;creative=9325
[2]:http://www.fitnesse.org
[3]:http://www.cornetdesign.com/2006/02/howto-fitnesse-actionfixture-in-c.html
