---
title: Excluding items from Time Machine
disqus_identifier: 2008-02-excluding-items-from-time-machine
comments: true
---

Leopard's new backup system has made it virtually inexcusable for users to not have automated backup systems in place for their Mac. It can not get any easier to do this: plug in a USB/Firewire drive and slide the switch to On in Time Machine.

I've been using this since Leopard came out and I love having the extra piece of mind. One part of this nagged at me a little bit, which was that my virtual machines were being backed up each time they were modified. As you can imagine, this eats up a lot of disk space. The data that I am interested in having backed up from the virtual machine already gets synced up via Parallel's Shared Folders, so it gets picked up by Time Machine.

Finding out how to exclude my VMs turned out to be a little more complicated than I would have expected. For whatever reason, I missed the options button on the Time Machine preferences window. Click options and then add in folders which will be excluded from the Time Machine backup. I store all of my VMs in one folder, so I just added it to the list. Disk usage has gone down considerably, now that Time Machine isnt copying over multi-gig files every hour.
