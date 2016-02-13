---
title: COM Interop and .NET
disqus_identifier: 2007-02-com-interop-and-net
comments: true
---

Sometimes, you still have to use COM objects from your .NET 2.0 code (*groan*). However, when you do this, its usually not a bad idea to remember the System.Runtime.InteropServices.Marshal class. The Marshal class has a method on it called ReleaseComObject(object), that can aid greatly in reducing memory usage running rampant.

I've added this call and my private byte usage in the application has gone from an exponential line to a pretty much flat line.
