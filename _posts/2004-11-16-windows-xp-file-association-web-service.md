---
title: Windows XP File Association Web Service
disqus_identifier: 2004-11-windows-xp-file-association-web-service
comments: true
---

Via [Darrell Norton][1] comes one of the best tips ever:

When you open a filetype that is unregistered on your system, you get presented with a time-wasting dialog about if you would like to use a web service to find the appropriate program, or select the program from a list. This tip involves bypassing that dialog and going straight to the Choose Program dialog.

Option 1:
Using the Registry Editor, navigate to HKCU (or HKLM, if you want to make it machine wide)\Software\Microsoft\Windows\CurrentVersion\Explorer. In the right panel, set REG_DWORD InternetOpenWith to 0, creating it if it doesnt exist.

Option 2:
Using the Registry Editor, navigate to HKCU (or HKLM, if you want to make it machine wide)\Software\Microsoft\Windows\CurrentVersion\Policies\System. In the right panel, create a REG_DWORD value named NoInternetOpenWith and set its data to 1.

[1]:http://dotnetjunkies.com/WebLog/darrell.norton/archive/2004/11/16/32271.aspx
