---
title: Replacing Notepad in Windows Vista
disqus_identifier: 2006-11-replacing-notepad-in-windows-vista
comments: true
---

After installing the Vista RTM, I wanted to replace Notepad with [Notepad2][1], as I find this to be a much more powerful editor. It's much more geared towards programmers, with built-in syntax highlighting. Best of all, it's free.

It's been pretty widely documented on how to replace Notepad on Windows XP. However, not much documentation was available for Windows Vista.

Interestingly enough, I found that it was very easy to do. These are the steps I followed, and I have yet to have Vista to replace it with the built-in version.

1. Download and extract Notepad2.
2. Rename Notepad2.exe to notepad.exe.
3. Find c:\windows\notepad.exe and c:\windows\system32\notepad.exe and set the owner to 'Administrators', and grant Administrators full control.
4. Using Windows Explorer, drag and drop the renamed notepad2.exe to c:\windows and c:\windows\system32.

Doing this allows you to get a much more powerful editor for things like viewing source from Internet Explorer or off of the Edit context menu.

[1]:http://www.flos-freeware.ch/notepad2.html
