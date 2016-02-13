---
title: MTCodeBeautifier and C# keywords
disqus_identifier: 2004-05-mtcodebeautifier-and-c-keywords
comments: true
---

When using Sean Voisen's [MTCodeBeautifier][1] to colorize C# code, you may notice that the keywords this and base may not get properly colorized.

This is due to an omission in the CSharp hfile. To resolve this, add ".", to the $self-&gt;{delimiters} line in HFile_csharp.pm and rebuild your entries.

Example:

``` perl
$self->{delimiters} = [".", "~", ... ];
```

Hopefully, Sean can work this in to the next release.

[1]:http://voisen.org/archives/project_news/000388.php
