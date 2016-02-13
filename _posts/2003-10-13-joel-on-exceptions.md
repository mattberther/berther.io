---
title: Joel on Exceptions
disqus_identifier: 2003-10-joel-on-exceptions
comments: true
---

So, I think this is the first time I've ever disagreed with anything that Joel Spolsky has said. However, [his take on exceptions][1] is ridiculous, in my opinion.

>The reasoning is that I consider exceptions to be no better than "goto's", considered harmful since the 1960s, in that they create an abrupt jump from one point of code to another. In fact they are significantly worse than goto's:

>1. *They are invisible in the source code.* Looking at a block of code, including functions which may or may not throw exceptions, there is know way to see which exceptions might be thrown and from where. This means that even careful code inspection doesn't reveal potential bugs.
>2. *They create too many possible exit points* for a function. To write correct code, you really have to think about every possible code path through your function. Every time you call a function that can raise an exception and don't catch it on the spot, you create opportunities for surprise bugs caused by functions that terminated abruptly, leaving data in an inconsistent state, or other code paths that you didn't think about.

>A better alternative is to have your functions return error values when things go wrong, and to deal with these explicitly, no matter how verbose it might be.

Wow...

From my own experience, it is much more intuitive to catch a (for example) FileNotFoundException, than it is to get back the results of an OpenFile call, and determine what the error was based on a myriad of constants defined in the windows api header files. Granted, SEH isnt all that it could be, *but* return values and error codes are much worse.

[1]:http://www.joelonsoftware.com/items/2003/10/13.html
