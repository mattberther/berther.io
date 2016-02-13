---
title: Microsoft Updates vs. Other OS Updates
disqus_identifier: 2007-09-microsoft-updates-vs-other-os-updates
comments: true
---

Is it a fair assessment to state that organizations that utilize platforms other than Microsoft Windows are much quicker to install security related operating system patches?

I've found over my career in the software engineering field that organizations are typically very slow to install new security patches from Microsoft simply because they are not sure of the impacts of a particular patch. Very often, it seems that patches come through to fix previous patches. This must not help the credibility of the patch concept. If a patch is installed and it breaks something else, pretty soon, I'm going to be conditioned not to install patches (ala Pavlov's dog).

I understand that mistakes happen occassionally, but it seems like more often than not, a Windows patch has very unintended consequences. We saw this earlier today at a client site. A client had ran a particular IE security patch to get past some display issues that they were having with our web application. The patch fixed the display issue; however, every time an AJAX request was executed, the browser would crash because a buggy version of jscript.dll was delivered with the original patch. So, now they had a patch ([KB917344][1]) for the patch ([KB937143][2]).

Not to say that Apple or Linux are off the hook for this either, because I, personally have had issues with an Apple security patch affecting my application. Not long ago, an OSX security patch broke the USB support in Parallels. However, the problem was not with OSX, but rather a workaround that Parallels had put in, which was no longer required.

I'm anxious to hear from other people out there: Do you have Automatic Updates turned on? If not, why? Would you have automatic updates turned on if you were running an OSX or Unix based operating system? Why is this different?

[1]: http://support.microsoft.com/kb/917344
[2]: http://support.microsoft.com/kb/937143
