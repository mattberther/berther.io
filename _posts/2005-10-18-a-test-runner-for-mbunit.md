---
title: A Test Runner for mbUnit
disqus_identifier: 2005-10-a-test-runner-for-mbunit
comments: true
---

Andrew Stopford, the new leader of the mbUnit team, is wondering why people seem to [overlook mbUnit][1]. My personal thought on this is that until recently, it was unclear how to download and install mbUnit. Previously, you only got mbUnit by installing a VS.NET addin, which might have scared people away.

We're using mbUnit after [evaluating it][2] against several of its competitors.

After using it for a while, one of my favorite features is this:

``` csharp
using MbUnit.Core;

class Startup
{
    public static void Main(string[] args)
    {
        using (AutoRunner runner = new AutoRunner())
        {
            runner.Load();
            runner.Run();
            runner.ReportToHtml();
        }
    }
}
```

This simple class allows me to build my unit tests as an executable, therefore allowing me to execute them at any time. Awesome...

[1]:http://weblogs.asp.net/astopford/archive/2005/10/18/427838.aspx
[2]:/2005/04/13/unit-testing-frameworks-deciding/
