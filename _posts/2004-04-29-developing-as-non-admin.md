---
title: Developing as non-admin
disqus_identifier: 2004-04-developing-as-non-admin
comments: true
---

It has been almost three months now since I have taken the plunge and removed myself from the administrators group and started doing everything with a less privileged account. I've found that it greatly changes the way you think about writing certain pieces of code.

One thing that has been bugging me for a while is the apparent inability to access windows explorer from this non-privileged account via the runas command. However, [Peter Torr][1] has a great tip to get around this.

From your admin console, navigate to HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced and set SeparateProcess DWORD to 0x01.

[1]:http://weblogs.asp.net/ptorr/archive/2004/03/21/93352.aspx
