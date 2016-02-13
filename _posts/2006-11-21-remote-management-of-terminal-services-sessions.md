---
title: Remote Management of Terminal Services Sessions
disqus_identifier: 2006-11-remote-management-of-terminal-services-sessions
comments: true
---

I could have swore that I blogged these tools a while back, but could not find any record of it, so here goes.

Again, I found myself locked out of a terminal server here at work, seems some sessions had started misbehaving, and would not terminate. To the rescue came two tools, included with Windows XP/2003/Vista, [qwinsta.exe and rwinsta.exe][1].

qwinsta.exe displays information about Terminal Sessions. This information can then be used to feed rwinsta, which will reset a session identified either by name or by session id.

[1]:http://weblogs.asp.net/owscott/archive/2003/12/30/46776.aspx
