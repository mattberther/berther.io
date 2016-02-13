---
title: A WTF moment
disqus_identifier: 2005-07-a-wtf-moment
comments: true
---

Stumbled across this chunk of code while tracking down a bug... Although this had nothing to do with the bug, it did leave my scratching my head saying WTF... Variable names have been changed to protect the guilty... :)

``` csharp
private int SOME_CONSTANT = System.Convert.ToInt32("1", 16);
// ED: numerous similar lines snipped.
private int SOME_OTHER_CONSTANT = System.Convert.ToInt32("200000", 16);
```

These are supposed to be constants that are being passed in as XOR'd options to an external program. The first thing that you can see going on is that they are not constants (note the lack of a const keyword).

You cant use the const keyword with an expression that is not a compile time constant (ie: the Convert.ToInt32 method). This leads me to my second point... Why arent we using hex codes to define these and save the initialization? Everytime the class gets instantiated all of these expressions need to be evaluated.

``` csharp
private const int SOME_CONSTANT = 0x80;
```

Once you do this, you can get the const keyword, because 0x80 is a compile time constant. Also, you save the reinitialization of these values everytime the class gets instantiated.
