---
title: Disabling the Windows 2003 Shutdown tracker
disqus_identifier: 2003-09-disabling-the-windows-2003-shutdown-tracker
comments: true
---

My only annoyance with Windows 2003 is now resolved with these simple steps:

Start the Microsoft Management Console by clicking Start | Run and typing mmc. When the MMC window is open, Click File | Add/Remove Snap-in. Click Add and then find the Group Policy Object Editor. Click Add, then finish and finally OK.

Navigate through Local Computer Policy to Computer Configuration | Administrative Templates and select the System folder.

Double click Display Shutdown Event Tracker and select Disabled. Click OK, and close the MMC.

You're done.
