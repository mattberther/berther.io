---
title: List.ForEach and Single Responsibility Principle
disqus_identifier: 2007-09-listforeach-and-single-responsibility-principle
comments: true
---

Mladen discusses the [performance of List&lt;T&gt;.ForEach][1] vs foreach and finds that the earlier is more performant than other methods of iterating collections. The comments are rather interesting and most focus on the readability/maintainability of one versus the other. The primary argument is that you should prefer maintainability/readability over performance. I completely agree with this.

I disagree with the commenters in that I feel that List&lt;T&gt;.ForEach actually reads better. In addition, the List&lt;T&gt;.ForEach construct stays true to the single responsibility principle. Other classes should not know how to iterate a collection, only that the interface supports it. The calling class only passes a delegate that should be executed on each item in the collection.

I talked about this point in an article entitled [refactoring away external loops][2]. The code in the article is .NET 1.1 specific, but the point of the article still applies.

[1]: http://weblogs.sqlteam.com/mladenp/archive/2007/09/01/Little-.Net-tip-Start-using-ListT.ForEach.aspx
[2]: /2005/01/17/refactoring-away-external-loops/
