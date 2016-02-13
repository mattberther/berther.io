---
title: NTFS Junction Points
disqus_identifier: 2004-02-ntfs-junction-points
comments: true
---

[Charles][1] and [John][2] are talking about junction points, which are an NTFS feature let you create directory aliases.

I've implemented the ideas that Charles presented to succesfully work with a project that uses an interface based plugin architecture. All projects were in the same solution in VS.NET. However, since the main application referenced the extensibility layer, but never the actual plugin itself, I was constantly having to move the plugin file over to my main application's bin\debug folder.

Using the junction command, I now always have the latest version of the particular plugin that Im working on available when I compile and debug my solution.

``` console
junction "\main project\bin\debug" "\plugin project\bin\debug"
```

As John states, even though this is an NTFS feature, Windows does not ship with a tool that can create junction points, so you can use either the `linkd` tool from the Windows 2000 Resource Kit, or Mark Russinovich's [junction utility][3].

[1]:http://www.cookcomputing.com/blog/archives/000351.html
[2]:http://www.iunknown.com/000421.html
[3]:http://www.sysinternals.com/ntw2k/source/misc.shtml#junction
