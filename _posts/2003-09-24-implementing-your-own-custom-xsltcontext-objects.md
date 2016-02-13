---
title: Implementing your own custom XsltContext objects
disqus_identifier: 2003-09-implementing-your-own-custom-xsltcontext-objects
comments: true
---

Today I was trying to execute a programmatic XPath query against a document with a query that contained the current() function.

current() is not part of the XPath standard, as it is an XSLT 1.0 extension. However, after spending the better part of an afternoon battling a cryptic exception ('System.Xml.XPath.XPathException: Namespace Manager or XsltContext needed. This query has prefix or variable or userdefined function."), I finally stumbled across another gem in the .NET framework: The ability to create your own XPath functions.

This capability comes from theSystem.Xml.Xsl.XsltContext class and System.Xml.Xsl.IXsltContextFunction class.

I hope the sample code below will help someone else. Information via Google is virtually non-existent on this topic.

``` csharp
public class CustomContext : System.Xml.Xsl.XsltContext
{
    public CustomContext() : base()
    {
    }

    public CustomContext(NameTable nt) : base(nt)
    {
    }

    public override int CompareDocument(string baseUri, string nextbaseUri)
    {
        return 0;
    }

    public override bool PreserveWhitespace(System.Xml.XPath.XPathNavigator node)
    {
        return false;
    }

    public override IXsltContextFunction ResolveFunction(string prefix, string name, System.Xml.XPath.XPathResultType[] ArgTypes)
    {
        if (name.Equals("current"))
        {
            return new XPathContextFunction("current");
        }

        return null;
    }

    public override IXsltContextVariable ResolveVariable(string prefix, string name)
    {
        return null;
    }

    public override bool Whitespace
    {
        get { return false; }
    }

    private class XPathContextFunction : IXsltContextFunction
    {
        private string _functionName;

        public XPathContextFunction(string functionName)
        {
            this._functionName = functionName;
        }

        public System.Xml.XPath.XPathResultType[] ArgTypes
        {
            get { return null; }
        }

        public System.Xml.XPath.XPathResultType ReturnType
        {
            get { return XPathResultType.Navigator; }
        }

        public int Minargs
        {
            get { return 0; }
        }

        public int Maxargs
        {
            get { return 0; }
        }

        public object Invoke(XsltContext xsltContext, object[] args, System.Xml.XPath.XPathNavigator docContext)
        {
            if (_functionName.Equals("current"))
            {
                XmlNode currentNode = ((IHasXmlNode)docContext).GetNode();

                return currentNode;
            }

            return null;
        }
    }
}
```

This XPath extension function can now be called via the method below:

``` csharp
CustomContext ctxt = new CustomContext(new NameTable());
ctxt.AddNamespace("mb", "urn:mattberther-com:xpath");

XmlNodeList nodes = node.SelectNodes("//NodeName[mb:current() = preceding-sibling::*]", ctxt);
```

The only changes are the prefacing of the method with your namespace prefix, and the addition of the CustomContext object to the SelectNodes call.
