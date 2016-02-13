---
title: XPathNavigator and OuterXml
disqus_identifier: 2005-09-xpathnavigator-and-outerxml
comments: true
---

A very simple .NET 2.0 (beta 2) application...

``` csharp
static void Main(string[] args)
{
    StringWriter writer = new StringWriter();
    XmlTextWriter xmlWriter = new XmlTextWriter(writer);

    xmlWriter.WriteStartElement("foo");
    xmlWriter.WriteCData("");
    xmlWriter.WriteEndElement();
    xmlWriter.Close();

    Console.WriteLine(writer.ToString());

    XPathDocument doc = new XPathDocument(new StringReader(writer.ToString()));
    Console.WriteLine(doc.CreateNavigator().OuterXml);
}
```

As you can see, this is utilizing an XmlTextWriter to write out a very simple fragment of xml. This then gets written out to the Console, and shows what I expect is the correct result:

``` xml
<foo><![CDATA[<bar>]]></foo>
```

However, after I load up the XPathDocument and write OuterXml to the Console, I get this:

``` xml
<foo><bar></foo>
```

Can anyone explain why this is happening, or is this a bug within the XPathNavigator?
