---
title: VS.NET and non-admin accounts
disqus_identifier: 2004-01-vsnet-and-non-admin-accounts
comments: true
---

After using Visual Studio.NET and the MSDN library/built-in help for a few days, I noticed that every time I tried to use the help, a lot of the topics tried to run the Windows installer. The installer would fail, since I was not an admin on the account.

To resolve this, I had to temporarily grant the user administrative privileges and run the MSDN library to let the installer run. After running the library and selecting a topic to make the installer run, I was able to remove the administrative privileges and everything appears to run fine now.

Apparently, VS.NET just needed a little kick start.
