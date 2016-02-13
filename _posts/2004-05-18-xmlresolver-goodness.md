---
title: XmlResolver Goodness
disqus_identifier: 2004-05-xmlresolver-goodness
comments: true
---

Today I was looking through the best way to transform some XML documents using XSLTs from a database instead of from a file system.

Typically, this would be no problem, via the following simple code:

``` csharp
XslTransform xsl = new XslTransform();
Stream strm = SomeMethodToLoadTheXslFromTheDatabase();
XmlTextReader rdr = new XmlTextReader(strm);
xsl.Load(rdr);
```

Now, the snag happens when you do an xsl:import or xsl:include in your XSLT. In this case, the XslTransform will try to load the specified file from the filesystem, which is obviously not what we want.

I started to panic a little bit while reading the MSDN documentation when all of the sudden, the XmlResolver class came to my rescue. The XmlResolver class resolves external XML resources named by a URI.

To resolve my problem, I ended up subclassing XmlUrlResolver and overriding the GetEntity method. The GetEntity method maps a URI to an object containing the actual resource. You're supposed to return a Stream out of it. The only changes to the original code is passing an instance of this custom Resolver to XslTransform.Load().

``` csharp
class MyResolver : XmlUrlResolver
{
    public override object GetEntity(Uri absoluteUri,
        string role, Type ofObjectToReturn)
    {
        string doc = Path.GetFileName(absoluteUri.AbsoluteUri);
        Stream strm = SomeMethodToLoadTheUriFromTheDatabase(doc);
    }
}

XslTransform xsl = new XslTransform();
Stream strm = SomeMethodToLoadTheXslFromTheDatabase();
XmlTextReader rdr = new XmlTextReader(strm);
xsl.Load(rdr, new MyResolver(), null);
```

This is a great little class to remember if you ever need to do something like this...
