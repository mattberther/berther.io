---
title: Reading binary data in C#
disqus_identifier: 2004-06-reading-binary-data-in-c
comments: true
---

If you're reading binary data from streams using syntax similar to the following, you'll need to make sure to read [this article][1]. This code is not at all guaranteed to work.

``` csharp
byte[] buffer = null;
using (Stream strm = File.OpenRead(filename))
{
    buffer = new byte[strm.Length];
    fs.Read(buffer, 0, buffer.Length);
}
```

[1]:http://www.yoda.arachsys.com/csharp/readbinary.html
