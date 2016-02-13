---
title: Implementing your own custom XsltContext objects, cont'd
disqus_identifier: 2003-09-implementing-your-own-custom-xsltcontext-objects-contd
comments: true
---

In my [previous post][1], I mentioned that the only changes are prefacing your XPath function with a namespace prefix.

However, thanks to a post from [Oleg Tkachenko][2], I found a way around this.

In the CustomContext class, override LookupNamespace(string prefix) with the following code:

``` csharp
public override string LookupNamespace(string prefix)
{
    if (prefix == String.Empty)
        return String.Empty;

    string uri = base.LookupNamespace(NameTable.Get(prefix));
    if (uri == null)
        throw new XsltException("Undeclared namespace prefix - " + prefix, null);

    return uri;
}
```

[1]:/2003/09/24/implementing-your-own-custom-xsltcontext-objects/
[2]:http://www.tkachenko.com/blog/archives/000042.html
