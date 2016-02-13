---
title: Web services and derived classes
disqus_identifier: 2005-10-web-services-and-derived-classes
comments: true
---

When doing this in an ASP.NET 2.0 (and I imagine ASP.NET 1.1 functions similarly)

``` csharp
[WebMethod]
public MyBase SayHello()
{
    return new MyDerivedClass();
}

public class MyBase
{
}

public class MyDerivedClass : MyBase
{
}
```

I get hit with this exception:

``` console
System.InvalidOperationException: There was an error generating the XML document. --->
System.InvalidOperationException: The type MyNamespace.MyDerivedClass was not expected.
Use the XmlInclude or SoapInclude attribute to specify types that are not known statically.`
```

This seems to be a major design flaw in the implementation of the Xml Serializer (which was rumoured to be completely revamped in 2.0). It seems strange that I should need to go into my web service and add an XmlInclude attribute every time I add a new derived class.
