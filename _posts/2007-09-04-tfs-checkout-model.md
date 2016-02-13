---
title: TFS Checkout Model
disqus_identifier: 2007-09-tfs-checkout-model
comments: true
---

We are probably one of the very few organizations in the wild that is actually using TFS for our source control system as well as backlog items, etc. We are really striving for an end-to-end TFS solution.

Coming from a CVS/SVN background, the one thing in particular drives me bonkers about TFS's source control system is its insistence that I check something out prior to being able to work on it. There are very many times when I would like to just touch a file on the file system, and *not* fire up my IDE to do so.

This checkout/commit (aka VSS) model of source control can be likened to having a box of floppy disks somewhere in your building. Whenever you need to modify a file, you have to go get the floppy disk and take it back to your desk. Once there, make your changes and then return the disk to the central storage. If you go on vacation, you also have to make sure and either return all the disks, or make a copy of the disks, so that other members of your team can continue working.

Contrast this with the SVN/CVS model, where you get a writable copy as soon as you do a get from the repository. Once you have the writable copy, you can make all the changes you want. Only once you are ready do you notify the repository that you have some changes for it. People can work simultaneously on the same file. The only "problem" comes up when two or more people modify exactly the same location in the file. At that point though, basically, the last person in has to resolve his changes with the others.

This seems to be a much more efficient way of getting work done. I'd like to see an option in TFS that allows you to create this model at the server level.
