---
title: foreach and performance
disqus_identifier: 2004-04-foreach-and-performance
comments: true
---

One statement that I have heard incessantly is that foreach over an array is slower than `for (int i = 0; i < array.Length; i++)`.

Finally, some good people have debunked this myth:

* [Kevin Ransom][1] -- To foreach or not to foreach, that is the question.
* [Eric Gunnerson][2] -- Efficiency of iteration over arrays

I personally find it *SO* much nicer to look at code like:

``` csharp
foreach (int i in array)
{
    Console.WriteLine(i.ToString());
}
```

as opposed to:

``` csharp
for (int i = 0; i < foo.Length; i++)
{
    int item = foo[index];
    Console.WriteLine(item.ToString());
}
```

mostly because the first code chunk is a lot more compact, and I think more clearly states its purpose.

[1]:http://weblogs.asp.net/Kevin_Ransom/archive/2004/04/19/116072.aspx
[2]:http://blogs.msdn.com/ericgu/archive/2004/04/18/115566.aspx
