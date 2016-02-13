---
title: OSX slowdowns
disqus_identifier: 2008-01-osx-slowdowns
comments: true
---

For some time now, my wife has been complaining about slowdowns on her iMac. Occassionally, I would login and try to do something and I found that the only way for me to login would be to completely reboot the machine. The user switching was essentially non-functional and just left the computer completely hung. Other problems she mentioned were that everytime she started Safari, she would get a message that said the Safari had been updated and would she want to allow the new version to access the same keychain items.

Normally, a user would just have to click the change all button once, but this prompt kept coming back, eventually beachballing the system. Thinking that the two problems were unrelated, I first set out to fix this to get around that annoyance.

I stumbled across [the fix for securityd eating up RAM when updating keychain entries][1] on the unsanity.org site. As it turns out, this fix cleared up both problems.

In short, if you dont want to read all the technical details on the unsanity.org article, this was caused by a corrupt CodeEquivalenceDatabase file. The fix was simple enough:

``` console
superbia:~ matt$: sudo mv /var/db/CodeEquivalenceDatabase /var/db/CodeEquivalenceDatabase.old
```

After a reboot, the system is *MUCH* more responsive and all the annoying keychain notices have ceased.

[1]: http://www.unsanity.org/archives/security/love_tropicana.php
