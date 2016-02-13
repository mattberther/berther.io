---
title: System.Xml limitations
disqus_identifier: 2006-04-systemxml-limitations
comments: true
---

Why, oh why, arent the System.Xml classes easier to work with? Why is everything tied to the XmlDocument?

I'd love to be able to do something like this:

``` csharp
public XmlElement ToXml(MyClass obj)
{
    XmlElement elem = new XmlElement("myclass");
    // additional code to populate the element
    return elem;
}
```

All the constructors on the objects are protected, and it seems as if none of these objects can stand by themselves. In my humble opinion, all of these classes should be able to stand on their own, and I should be able to take any instance of these classes and add them to a document, not create them as part of the document.
