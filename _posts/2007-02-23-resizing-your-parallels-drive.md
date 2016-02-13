---
title: Resizing your Parallels Drive
disqus_identifier: 2007-02-resizing-your-parallels-drive
comments: true
---

[Parallels Desktop][1] is a fantastic virtualization package for Mac OSX. Features like Coherence and Bootcamp integration are certainly giving established players in the virtualization market a run for their money (VMWare and MS Virtual PC).

The only drawback that I've found with Parallels (and with VMWare for that matter) was that your hard drive size, once established, was fixed. If you got close to running out of room, you were pretty much SOL.

Until now, that is...

Parallels includes a great program called the "Parallels Image Tool" which lets you resize your virtual hard disk file on the fly. To get Windows to actually know about the size increase, you'll have to follow some steps. Certainly not hard, but to make sure you dont lose your data, make sure you follow [the instructions][2].

**Update:** If you're using the latest beta bits of Parallels, you'll also need to go into the VM configuration (Edit | Virtual Machine) and click on the Options resource and the Advanced tab. In this tab, make sure you uncheck Enable Intel VT-x support. This was what was needed to allow the GParted LiveCD to boot on my Intel Core Duo iMac.

[1]:http://www.parallels.com/
[2]:http://uneasysilence.com/archive/2007/01/9404/
