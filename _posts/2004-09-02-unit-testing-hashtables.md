---
title: Unit testing Hashtables
disqus_identifier: 2004-09-unit-testing-hashtables
comments: true
---

Consider the following three tests. Without compiling, what would you expect the results to be and why? A GMail invite will be provided to the first right answer, so make sure you provide your email address or some other means of contacting you when commenting.

``` csharp
[TestFixture]
public class HashtableTestFixture
{
    [Test]
    public void TestHashtableEquals()
    {
        Hashtable h = new Hashtable();
        h.Add("foo", "foo");

        Hashtable h2 = new Hashtable();
        h2.Add("foo", "foo");

        Assert.IsTrue(h.Equals(h2));
    }

    [Test]
    public void TestHashtableClone()
    {
        Hashtable h = new Hashtable();
        h.Add("foo", "foo");

        Hashtable h2 = (Hashtable)h.Clone();

        Assert.AreEqual(h, h2);
    }

    [Test]
    public void TestHashtable()
    {
        Hashtable h = new Hashtable();
        h.Add("foo", "foo");

        Hashtable h2 = new Hashtable(h);

        Assert.AreEqual(h, h2);
    }
}
```
