---
title: Additional items for IBlogIt
disqus_identifier: 2003-04-additional-items-for-iblogit
comments: true
---

Greg brings up some [valid points][1]. A few ideas I have are detailed below.

In the case of MovableType, as Im sure is the case with other blog software, there are numerous properties available when submitting a new post. Take for example:

* Category
* Convert Line Breaks
* Allow Comments
* Allow Pings
* Additional Entry Text
* Excerpt Entry Text
* Keywords

Given this, and the fact that the aggregator should be able to display its own interface in the case of HasEditingGUI() returning false, should there be some method allowed to make these properties and whatever values available via this interface as well?

Im thinking something along the lines of:

``` csharp
public interface IBlogThisEx : IBlogThis
{
  ///...
  BlogPropertyCollection Properties { get; set; }
}

public class BlogPropertyCollection : CollectionBase
{
  ///...
}

public class BlogProperty
{
    private string _name;
    private IEnumerable _values;

    public string Name
    {
        get { return _name; }
        set { _name = value; }
    }

    public IEnumerable Values
    {
        get { return _values; }
        set { _values = value; }
    }
}
```

Secondly, since exceptions are likely to be thrown back to the aggregator, perhaps there should be a common Exception-derived object that the aggregator can expect. For example:

``` csharp
public class BlogThisException : Exception
{
    // Implementation goes in here
}
```

[1]:http://www.rassoc.com/gregr/weblog/archive.aspx?post=578
