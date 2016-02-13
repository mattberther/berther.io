---
title: The quickest way to screw up your SQL Server install...
disqus_identifier: 2003-10-the-quickest-way-to-screw-up-your-sql-server-install
comments: true
---

is to accidentally run an MSDE install on the same machine.

I managed to do this today, while testing a custom installation. Instead of running it in my Virtual PC instance, I ran it on my desktop. When I rebooted, the SQL server popped up a message box saying that the installation had been tampered with and that I should uninstall and reinstall.

The great thing about that was that neither the SQL Server, or the MSDE installer would uninstall via the Add/Remove Programs option. 

I ended up performing the following steps to get things up and running again:

1. Copy the contents of my data directory to a new folder, so I could sp_attach_db later.
2. Open up regedit and search for Microsoft Sql Server, and delete anything I found that matched
3. Reboot
4. Reinstalled Microsoft Sql Server and SP3
5. Copied the databases back, and performed an sp_attach_db on them to get the server to see them.

Ultimately, this ended up only costing me a half a day of time on an already late project. I suppose it could have been worse.
