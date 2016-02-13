---
title: Software and less privileged accounts
disqus_identifier: 2004-01-software-and-less-privileged-accounts
comments: true
---

After reducing my main account to a less privileged account, I've noticed that the XSLT configuration in the MovablePoster plugin ceases to function properly. This is because this stylesheet is stored in Program Files, which is a folder not normally granted write access by a standard user of the machine. For a temporary workaround, you can grant write access to Post.xslt for the Users group. Please be assured that this will be resolved in the next version of the plugin.

Also, we have chosen [XHEO|Licensing][1] for a product that we want to protect at work. On an unrelated note, if you're searching for a licensing solution, please make sure and check these guys out. This is far and away the best licensing solution Ive seen.

I've noticed that, after reducing my domain account to a less privileged account, the License Manager refuses to function. I've been in contact with the support team at XHEO and we came to the conclusion that it would be best for me to grant write access to LicenseManager.exe.config for now. However, I also recommended to them that they may want to use Environment.SpecialFolders.ApplicationData or IsolatedStorage so that these issues dont pop up in a future release.

I will probably end up using Enviornment.SpecialFolders.ApplicationData to resolve my issue with the MovablePoster plugin.

This leads me back to the original point of developing software as a non-administrator. These kinds of issues manifest themselves sooner and lead to a much more robust product.

[1]:http://www.dotnetlicensing.com/
