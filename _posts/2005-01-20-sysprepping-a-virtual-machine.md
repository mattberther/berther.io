---
title: Sysprepping a virtual machine
disqus_identifier: 2005-01-sysprepping-a-virtual-machine
comments: true
---

When working with virtual machines, it is very helpful to run SysPrep on the operating system that you want to clone. This way, the guest operating system receives a unique GUID and MAC address when they start up. Otherwise, you will (like me) encounter any number of conflicts when bringing a new VM online.

Megan Davis has a very helpful post that details [how to sysprep a virtual machine][1] step by step. 

This is going to save me lots of time when bringing a new VM online. If you're working with base virtual machines, you also need to be doing this. Thanks, Megan!

[1]:http://blogs.msdn.com/megand/articles/357570.aspx
