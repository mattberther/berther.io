---
title: Singletons are not evil
disqus_identifier: 2004-05-singletons-are-not-evil
comments: true
---

Scott Densmore has an interesting [post][1] regarding singletons and why he thinks they are evil. I'd like to go through his points one by one and add my thoughts:

>Singletons frequently are used to provide a global access point for some service.

Unfortunately, I tend to agree with this. However, this does not make the Singleton pattern evil. Using a singleton in this way could easily be compared to using global variables. Using a singleton for this is no different than having a class with a bunch of static members on it. 

Singletons should be used to control creation, not access. A singleton should *not* be used as a global object just because you can. I find it hard to dismiss a pattern simply because some people dont use it how it was intended to be used.

>Singletons allow you to limit creation of your objects.

Scott states that this is true (as it is), but thinks that this is a violation of the Single Responsibility Principle, since a class should only be concerned with its business responsibilities.

Most of the issues around singletons revolve around the terminology. After all, isnt the Singleton property/method *really* just a Factory Method.

I agree that you could use a factory or builder object to do this for you, however, this method doesnt allow you to create one and only one instance.

>Singletons promote tight coupling between classes.

This one I have to agree with. The way around this is to use a factory method, however, then you dont get the private constructor that the singleton really should have.

>Singletons carry state with them that last as long as the program lasts.

As they should. The idea behind a singleton is that you need one and only one instance of an object.

As with any design pattern, the singleton is good when it is used wisely. Unfortunately, what happens a lot of the time is that a pattern is thrown into something without looking at the other options. Before implementing a singleton is not a bad idea to ask yourself, would it be wrong to have another instance of this class in the system?

Let me leave you with this to chew on... If singletons are evil and should be avoided at all costs, how would you suggest to handle things in the framework such as HttpContext? I personally find HttpContext.Current to be an absolute godsend. Without it, I would probably end up having to corrupt my class interfaces with properties or method parameters that will allow me to access HttpContext.

[1]:http://weblogs.asp.net/scottdensmore/archive/2004/05/25/140827.aspx
