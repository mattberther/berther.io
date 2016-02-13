---
title: Enabling ActiveDesktop on Windows XP
disqus_identifier: 2006-08-enabling-activedesktop-on-windows-xp
comments: true
---

I love having an empty desktop without any clutter from icons. It seems that every time I repave my box I end up having to scour the web for information on how to make this happen, so Im mostly posting this for my reference.

For whatever reason, it seems that XP ships with ActiveDesktop turned off. When ActiveDesktop is turned off, you do not see the "Show Desktop Icons" option off the Arrange Icons By context menu from the desktop.

To get this to show up, I have to go into my registry (regedit.exe) and navigate to HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer and set NoActiveDesktop to 0.

After the compulsory reboot, I am presented with the option and unchecking it hides all of the icons on my desktop.
