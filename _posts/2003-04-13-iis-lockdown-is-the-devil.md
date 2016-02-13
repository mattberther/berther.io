---
title: IIS Lockdown is the devil
disqus_identifier: 2003-04-iis-lockdown-is-the-devil
comments: true
---

So, I installed the [Microsoft Baseline Security Analyzer][1].

One of the biggest points that it makes is that the IIS lockdown tool is not installed. So, I go grab this tool, and run it. Everything appears to work normally.

Meanwhile, I make some other changes to my configuration here. I ended up moving some Exchange servers around, demoted a PDC, etc. Still, everything appears to function normally.

Early yesterday, I check my email (via OWA). Wouldnt you know it? It doesnt work. I started looking through event logs and log files, which provided no information. According to them, everything was running fine.

So, I come to the realization that my front-end exchange server is corrupted. I attempt to uninstall this, which, of course, is no easy task. The setup program ended up refusing to uninstall the Information Store. I ended up going through the register and deleting everything that had Exchsrv in it, and deleting the %InstallDir%\ExchSrv directories.

Finally, Im set to reinstall... Reinstall again runs flawlessly. I set the server up to be a front-end server. Check the webmail... Nothing... Just sits there and hangs...

Argh! By this time, I am completely livid. So, thinking that something went wrong with the Exchange install, I repeat the above procedure 3 more times with the same results.

After this, I have an epiphany... I remembered that IISLockdown disables the .asp script mapping by default, and guess what, I have a default.asp which provides the redirection to the /Exchange folder. After updating URLScan to allow the .asp extension, I try again. This time, Im getting through, but I cant see any of the email messages. Then I remember that IISLockdown also does some stuff to disable WebDAV, which OWA needs.

No problem, I think... I will just run IISLockd.exe, and it will undo the changes... This was a great thought, but in practice, it proved to be less than effective.

Upon doing this, my Exchange install and IIS were completely fubar'd. So, I do a Google search on these messages, and I come up with this [article][2] at Microsoft. 

I am completely disheartened by the fact that removal of a security utility has a resolution of "reinstall Microsoft Exchange 2000 Server, and then reapply the most recent service pack".

So, for a fifth time, I reinstall Exchange, and reconfigure IIS to the state that it was before IISLockdown's uninstall destroyed it.

All in all, I feel like I learned quite a bit (including that [Snoop Dogg dodged a bullet][3]), which, in the grand scheme of things, is what is important. Specifically, that IIS Lockdown is evil, and Im much better staying on top of service packs and careful permissions myself.

Anyways, everything works again... Webmail is back online, and Im off for a beer. :)

[1]:http://www.microsoft.com/TechNet/Security/tools/tools/MBSAHome.ASP
[2]:http://support.microsoft.com/default.aspx?scid=kb;[LN];Q323672
[3]:http://www.cnn.com/2003/SHOWBIZ/Music/04/11/snoop.dogg.ap/
