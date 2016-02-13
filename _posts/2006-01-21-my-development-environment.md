---
title: My Development Environment
disqus_identifier: 2006-01-my-development-environment
comments: true
---

For the past two years, I've been doing all of my development work inside Virtual PC images, and have found that this suits me very well. I like the keeping my development environment isolated from the other, more mundane functions of my PC (such as Outlook). I've been storing all of my virtual machines on an 160gb external USB drive, which again has been working quite well. The drive spins fast enough (7200rpm) and has a large enough cache that I dont really notice a difference between running my IDE on the host PC.

Late yesterday afternoon, as I was in a hurry to get out the door, I started to shutdown my computer. Before the computer had completely shut down, I disconnected my external USB drive. Fast forward to this morning, and imagine my horror when I tried to load up my dev environment and found that the .vhd was *gone*.

I spent a good portion of the day looking at tools to recover this .vhd file, to no avail. The majority of the critical code that I was working on was thankfully committed to Subversion. Have I ever talked about the importance of source control? However, the panic set in when I realized how much stuff on there was not in SVN. Little one-off projects Id been working on to test ideas and so on.

It became immediately clear to me that I needed to keep my source code separate from the virtual pc image, but how would I go about doing that?

I stumbled across a neat feature in Virtual PC called 'shared folders', which allows you to share a folder on your host pc and it can be accessed as a network share by the VPC image. This really seems to be the way to go.

So, I have a folder on my host pc called /shared. Within that folder, I have a folder called projects which now contains all of my source code for all my dev environments (VS.NET 2003 and VS.NET 2005).

As part of my backup plan now, that folder gets backed up and hopefully I never have to experience the agony of realizing that some valuable source code has been lost.

One thing I did notice is that because this runs through a network share, I had to adjust my .NET security policy to grant Local Intranet full trust permissions. Since I dont do anything but write code within the VM, I feel comfortable with granting that permission.
