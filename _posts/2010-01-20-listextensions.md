---
title: ListExtensions
disqus_identifier: 2010-01-listextensions
comments: true
---

I prefer to use the abstract `IList<T>` interface in my public APIs, rather than passing around concrete `List<T>` implementations. However, the one thing I've always missed was the awesome .ForEach syntax which was available on the `List<T>` implementation.

Today, I realized that I can use extension methods to add methods to interfaces.

``` csharp
public static class ListExtensions
{
    public static void ForEach<T>(this IList<T> source, Action<T> action)
    {
        foreach (T item in source)
            action(item);
    }
}
```

This now allows me to do things like:

``` csharp
public static void Main(string[] args)
{
    IList<string> items = GetItems();
    items.ForEach(Console.WriteLine);
}

private static IList<string> GetItems()
{
    return new List<string> { "abc", "123" };
}
```

I much prefer this syntax to the foreach construct.
