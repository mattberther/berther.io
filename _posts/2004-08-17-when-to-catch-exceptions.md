---
title: When to catch exceptions
disqus_identifier: 2004-08-when-to-catch-exceptions
comments: true
---

Ian Griffiths has a great [article][1] talking about the appropriate times to catch an exception.

One of the things that I notice quite a bit is that try/catch tends to be used as a band-aid to solve bugs. I find it infuriating to no end to see something like:

``` csharp
try
{
    SomeMethod();
}
catch (Exception)
{
}
```

I'm in agreement with Ian in that service boundaries are typically the most appropriate places to capture exceptions. This allows you to have centralized error handling among other things.

Of course, there are certain times when you have to have a try/catch in a specific method, as Ian details in his article. However, these should be the exception (pun intended) rather than the norm. try/finally or using should be a lot more used throughout your code. You dont have to catch an exception to free the resources.

[1]:http://www.interact-sw.co.uk/iangblog/2004/08/16/whentocatch
