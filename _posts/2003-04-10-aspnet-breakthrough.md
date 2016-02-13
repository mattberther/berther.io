---
title: ASP.NET breakthrough
disqus_identifier: 2003-04-aspnet-breakthrough
comments: true
---

Today I had an breakthrough in designing web applications. I had kind of resigned myself to the fact that ASP.NET was rather inflexible to design via VS.NET.

Then today, I finally realized the power of codebehind to pull the business logic from an external assembly, rather than compiling everything into one assembly.

The majority of my ASP.NET development has been centered around the IBuySpy portal framework. I have found myself cussing the design of this framework, as all new modules needed to recompile the entire portal.

As it turns out, all that really needs to happen is the .ascx files need to be deployed into a location in the applications virtual root, and then deploying an external assembly into the applications bin directory.

Your ascx file then does not specify a CodeBehind file, but simply says

``` aspx-cs
<%@ Control Inherits="Namespace.Control" %>
```

then in the cs file, you define the methods for that class, hook up event handlers, and all the other things that you would normally do.

This lends itself very nicely to plugable components, and skinable UIs.
