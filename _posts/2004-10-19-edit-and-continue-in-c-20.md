---
title: Edit and Continue in C# 2.0
disqus_identifier: 2004-10-edit-and-continue-in-c-20
comments: true
---

I'm sure that by now everyone has heard that [Edit and Continue will be a part of Visual C# 2005][1]. It's taken me a while to get my thoughts in order regarding this major announcement.

First off, let me say that I'm really pleased that Microsoft is listening to its user base and implementing features that they are asking for.

Given that, I want to go on record as saying that Edit and Continue is one of the worst things to happen to programming. Ever. 

In my experience, I've noticed when handling a bug, the first thing that most people do is load up the project, hit F5, and off they go. Why not execute the program, find where the bug occurs, take a look at the error message and *think*. Think about what might be causing the issue. This can be a lot quicker than single stepping through 200 lines of code.

Now, I've heard the arguments from people that say that edit and continue is a godsend for those quick typos, incorrect connection strings, etc. The way I look at it, users have been asking for three things from Whidbey (in no particular order): refactoring, edit and continue, and unit testing. I believe that E&C would be unnecessary if more effort was placed on the other two items. You dont need to modify running code, if you have a effective unit tests. The unit tests should have caught these typos. The tests that fail should be so isolated that there is no question of where the error is occuring. This means that you can go to the source of the problem, and fix it... without ever running your program in debug mode.

Lastly, another drawback to E&C is that it can be quickly used to fix something. However, I personally believe that it also leads to band-aid programming. Patching something quickly to make it work, rather than looking at the root cause of the problem. This is bad, and just leads to more issues down the road.

Edit and continue is just a quick way to hack and bang on something to make it work, without investigating the root cause of the problem, and I personally wish that MS would give refactoring and unit testing the time that is now being taken up by edit and continue.

[1]:http://msdn.microsoft.com/vcsharp/default.aspx?pull=/library/en-us/dnvs05/html/edit_continue.asp
