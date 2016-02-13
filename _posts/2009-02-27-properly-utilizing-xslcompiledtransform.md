---
title: Properly utilizing XslCompiledTransform
disqus_identifier: 2009-02-properly-utilizing-xslcompiledtransform
comments: true
---

Not long ago, we noticed some degradation in performance after we upgraded to .NET 2.0 and migrated to the XslCompiledTransform class from the now obsolete XslTransform class. Our implementation was fairly straightforward, although we hid it behind an interface for easy mocking/testing.

The code looked something like the below:

``` csharp
public interface TransformLoader
{
    XslCompiledTransform Load(string name);
}

class XslTransformLoader : TransformLoader
{
    public XslCompiledTransform Load(string name)
    {
        XslCompiledTransform transform = new XslCompiledTransform();
        transform.Load(name);
        return transform;
    }
}
```

This is a pretty standard implementation, although after JetBrains .Trace pointed out that a majority of the time was being spent in the Load method, we started doing some research. As it turns out, we mistakenly understood the XslCompiledTransform to be smart enough to determine whether or not the transform had already been compiled. If it was, we thought, it would use the compiled version. As it turns out, this is not the case. To effectively utilize this class, it is important to save off the instance of the class for subsequent uses.

To do this, we created a new implementation, the CachedXslTransformLoader, which looks like this:

``` csharp
using System.Xml.Xsl;

class CachedXslTransformLoader : TransformLoader
{
    private Dictionary<string, XslCompiledTransform> transforms = new Dictionary<string, XslCompiledTransform>();

    public XslCompiledTransform Load(string name)
    {
        XslCompiledTransform transform = null;
        if (!transforms.TryGetValue(name, out transform))
        {
            transform = new XslCompiledTransform();
            transform.Load(name);
            transforms[name] = transform;
        }

        return transform;
    }
}
```

When running the older XslTransformLoader through a loop of 100 transformations with our XSLT and XML files, we found that it was taking approximately 48 seconds to transform the entire loop. However, when utilizing the new CachedXslTransformLoader, the exact same loop only took 1.3 seconds to execute.

This is where the performance improvements from the XslCompiledTransform really come to fruition, so make sure that you are saving off the instance of the class. As we saw, the class is not smart enough to determine whether or not the XSL has already been compiled.

By the way, the performance problem we were experiencing went away with this minor change. On another note, it was nice to see this adhere to the open/closed principle. We were able to correct issues in the system by adding new code, not by touching existing/tested code.

Bottom line: when using XslCompiledTransform, make sure to save off the instance and reuse it for maximum performance benefit.
