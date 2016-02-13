---
title: Drop all stored procedures
disqus_identifier: 2004-12-drop-all-stored-procedures
comments: true
---

Ever want to drop all of the stored procedures in a database? I typically use this technique to do database updates (drop them all, and then recreate them) to make sure that I dont have any left over procedures and so I dont have to maintain different scripts for creating and updating my databases.

Try this script...

``` sql
USE myDatabase
GO

declare @procName sysname

declare someCursor cursor for
    select name from sysobjects
    where type = 'P'
      and objectproperty(id, 'IsMSShipped') = 0

open someCursor
fetch next from someCursor into @procName
while @@FETCH_STATUS = 0
begin
    exec('drop proc ' + @procName)
    fetch next from someCursor into @procName
end

close someCursor
deallocate someCursor
go
```

Please make sure that you dont run this against your master database. :)

**Update:** Changed declaration of `@procName` to `sysname` as per Raymond's comment.
