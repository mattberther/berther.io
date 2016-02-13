---
title: Removing xsd and xsi namespaces from XmlSerializer output
disqus_identifier: 2005-03-removing-xsd-and-xsi-namespaces-from-xmlserializer-output
comments: true
---

One question that I see come up quite a bit is how to remove the xsd and xsi namespaces from the XmlSerializer output.

The easiest way to do this is to use an overload of the Serialize method.

``` csharp
StringWriter sw = new StringWriter();
XmlTextWriter tw = new XmlTextWriter(sw);

XmlSerializerNamespaces xsn = new XmlSerializerNamespaces();
xsn.Add(String.Empty, String.Empty);

XmlSerializer serializer = new XmlSerializer(typeof(MyObject));
serializer.Serialize(tw, myObject, xsn);
```

According to Reflector, the main Serialize method checks if the XmlSerializerNamespace instance is null or has a zero length. If either are true, it uses a default XmlSerializerNamespaces instance which includes the xsd and xsi namespaces.

This little tidbit helped me remove the cruft from my XmlSerializer output. Hopefully it helps you do the same.
