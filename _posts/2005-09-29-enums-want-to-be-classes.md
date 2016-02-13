---
title: Enums want to be classes...
disqus_identifier: 2005-09-enums-want-to-be-classes
comments: true
---

Michael Feathers has a [post][1] that talks about the exact reasons why I *hate* enums.

By designing your enums as classes, you gain a lot more flexibility down the road. In addition, the polymorphic capabilities gained from this technique covers you from some of the inherent dangers of using enums (such as adding or removing an enum, and not having a default handler in your switch statement).

This technique also reminds me of the [Replace Type Code with State/Strategy][2] and the [Replace Conditional with Polymorphism][3] refactorings from Fowler's book.

[1]:http://www.artima.com/weblogs/viewpost.jsp?thread=128338
[2]:http://www.refactoring.com/catalog/replaceTypeCodeWithStateStrategy.html
[3]:http://www.refactoring.com/catalog/replaceConditionalWithPolymorphism.html
