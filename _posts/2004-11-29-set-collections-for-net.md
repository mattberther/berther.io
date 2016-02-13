---
title: Set Collections for .NET
disqus_identifier: 2004-11-set-collections-for-net
comments: true
---

The collections available in the .NET framework are sufficient for most types of operations you will encounter. However, there is one type that is missing. A Set is a collection that contains no duplicate elements. The Set is not used very often, but when you do need it, you *really* need it.

I've recently encountered the real need for a Set implementation and stumbled across a [very nice one][1] (with source code) over at [Code Project][2].

Jason's implementation has some very nice features, including:

* Union (a Set containing all elements from both input sets)
* Intersect (a Set containing all elements that are in both A and B)
* ExclusiveOr (a Set containing all elements that are in A or B, but are not in both A and B)
* Minus (a Set containing all the elements of A, with the elements from B removed)

Jason's implementation has allowed me to remove massive amounts of this type of code, which was done to filter duplicates:

``` csharp
ArrayList list1 = SomeMethodToPopulateAList();
ArrayList list2 = new ArrayList();
foreach (object o in list1)
{
    if (!list2.Contains(o))
        list2.Add(o);
}
```

This now becomes:

``` csharp
ISet mySet = new HashedSet(SomeMethodToPopulateAList());
```

There were also opportunities for me to take advantage of the Minus functionality, eliminating three ArrayLists (to track items to be inserted and removed) and a lot of stinky code.

Best of all, ISet also implements ICollection, so assuming you're returning interfaces from your methods rather than implementations, you will be just fine by changing things from ArrayList to ISet.

Ive not checked into Whidbey yet, so hopefully someone can let me know if Set collections will be available in the BCL. For now though, this is a wonderful piece of code and something you should definitely add to your code library.

[1]:http://www.codeproject.com/csharp/sets.asp
[2]:http://www.codeproject.com
