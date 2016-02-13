---
title: Extension to IBlogThis
disqus_identifier: 2003-04-extension-to-iblogthis
comments: true
---

[Greg Reinacker][1] and [Simon Fell][2] are proposing a new interface to extend IBlogThis...

``` csharp
public interface IBlogIt : IBlogThis
{
    // Display configuration dialog to user, if applicable
    void Configure();

    // Return true if an editing GUI will be shown to the
    // user when BlogItem is called. In this case, the
    // aggregator will not display its own editing UI.
    bool HasEditingGUI();
}
```

This seems very nice to me. I'm currently working on a plugin for [MovableType][3] utilizing the IBlogThis interface. One of the hurdles I've encountered is a clean way to bring up the configuration dialogs, if the user hasnt completed them.

This would also allow incorporation of Luke Hutteman's [BlogThisURL][4], creating a complete MT plugin.

[1]:http://www.rassoc.com/gregr/weblog/archive.aspx?post=577
[2]:http://www.pocketsoap.com/weblog/2003/04/1239.html
[3]:http://www.movabletype.org
[4]:http://www.hutteman.com/weblog/2003/04/17.html#000068
