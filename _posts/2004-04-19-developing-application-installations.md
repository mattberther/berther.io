---
title: Developing application installations
disqus_identifier: 2004-04-developing-application-installations
comments: true
---

During the past few weeks, I've learned way more about InstallShield than I ever wanted to know.

Several months ago, I was tasked with creating an installer for one of our applications at work. Thanks to DevStudio, the installer originally seemed to be pretty painless. 

Unbeknownst to me at the time, some of the defaults that InstallShield sets for you are just ridiculous (ie: components are shared by default). During the last two weeks, I've spent some time reworking this installer and ironing out some of the kinks.

I've found two great resources for dealing with these sorts of issues.

Michael Dunn's [Ten Tips for Well Behaved Application Installations][1] and Bob Baker's [Practical Windows Installer Solutions for Building InstallShield Setup Applications][2].

[1]:http://weblogs.asp.net/mdunn/archive/2004/04/09/110702.aspx
[2]:http://www.amazon.com/exec/obidos/ASIN/0971570833/mattbertherco-20
