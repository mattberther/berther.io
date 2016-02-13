---
title: VS.NET 2005, ASP.NET and inheriting custom classes
disqus_identifier: 2004-06-vsnet-2005-aspnet-and-inheriting-custom-classes
comments: true
---

One of the first things that I typically do when creating a new ASP.NET application is to create a base class which all of the pages in the application will derive from. Doing this allows me to handle some common tasks, such as error handling, in a centralized location.

I just finished installing the VS.NET 2005 May CTP, and proceeded to create my first ASP.NET application using the new web application model being introduced (code-beside, rather than code-behind).

The concept of partial classes was kind of new to me, so the first thing I tried to do was this in my code file.

`public partial class MyPage : PageBase`

Which leads me to another issue about why a class in  an ASP.NET application insists on being public. Surely, this has to be a hold-over from the ASP.NET 1.1 days. But, I digress...

This is how I accomplished this using .NET 1.1. However, using .NET 2.0, the compiler screamed at me that you couldnt change the base type when using a partial class. This does make perfect sense, as otherwise you would end up with some freaky permutation of multiple inheritance.

Anyways, I started to panic a little, thinking that perhaps this task could not be handled anymore. Surely, the ASP.NET developers wouldnt leave me hanging like this.

With a little bit of digging, I found the Inherits attribute on the Page directive.
