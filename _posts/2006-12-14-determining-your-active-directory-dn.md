---
title: Determining your Active Directory DN
disqus_identifier: 2006-12-determining-your-active-directory-dn
comments: true
---

This little piece of wscript works wonders when you're attempting to determine where you live in the active directory.

``` vbnet
Set objADSysInfo = CreateObject("ADSystemInfo")
wscript.echo objADSysInfo.UserName
```

You can put that into a file called FindMyDN.vbs, and then execute it with `wscript FindMyDN.vbs` from the command line. Voila!
