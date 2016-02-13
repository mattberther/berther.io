---
title: Comment Rot
disqus_identifier: 2004-05-comment-rot
comments: true
---

Eric Lippert has a great post about [comment rot][1]. Eric found a way to very eloquently state something I have been trying to say for a very long time.

My problem with the majority of comments are:

* They state the blatantly obvious. For example: `i = i + 1; // increment i by 1`. Thanks for that.</li>
* The comments very rarely get updated with the code. As Eric states, "Wrong comments are usually much worse than no comments at all."

Good code does not need comments. Good code should comment itself via variable and method names that clearly state their purpose. Comments should never talk about the whats (since the code should be doing that), but rather the whys.

The one part that I still havent quite decided on is the C# documentation comments. Going back to my VB days, we were asked to put a comment block like this above every method that defined the method purpose, the method author, and a change log. It was interesting that virtually every method in our libraries had exactly the same purpose and the same author, with no change log (effectively rendering the comments useless). ;)

I definately agree that any public API needs to have documentation. Now, I would be really quick to adopt the C# documentation comments if it wouldnt pollute my code file. Typically, when you write a good piece of documentation for a class, you're going to include some small sample of how to use it. This can quickly grow to over a page, even at the 1920x1200 resolution I'm running at. I dont want to have to scroll through all of this junk just to look at whats in the code file.

Wouldnt it be great if there were some way to link these comments to an external file? C#/VS.NET teams, are you listening?

[1]:http://blogs.msdn.com/ericlippert/archive/2004/05/04/125893.aspx
