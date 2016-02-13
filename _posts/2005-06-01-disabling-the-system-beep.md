---
title: Disabling the system beep
disqus_identifier: 2005-06-disabling-the-system-beep
comments: true
---

This came through an an email thread this afternoon and I thought Id share this with the rest of you.

Under Virtual Server, there are a lot of annoying beeps that occur as some sounds appear to beep  (since there is no sound support under Virtual Server). Turning it off is fairly straight-forward if this beep drives you bonkers (as it does me).

1. Open up Device Manager on the host machine (the one that you are using to control the virtual server).
2. From the View menu, select 'Show hidden devices'.
3. Expand 'Non-Plug and Play Drivers'.
4. Right-click 'Beep' and select 'Properties'.
5. Select the 'Drivers' tab.
6. Click 'Stop'.

You can also change the startup type to 'Disabled', so that the beep service never starts.

This is a great tip... Thanks, Jay!
