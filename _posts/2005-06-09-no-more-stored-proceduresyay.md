---
title: No more stored procedures...YAY!
disqus_identifier: 2005-06-no-more-stored-proceduresyay
comments: true
---

During a recent upgrade to an application Ive been working, all but one of the stored procedures was removed.

What?!?! Indeed, data access can happen without stored procedures, and as referenced in some other weblog posts this may be very advantageous. Go ahead and read this post ([stored procedures are bad, m'kay?][1]) now... I'll wait.

In the case of this particular application, there was always an issue about keeping three different projects in sync (the DAL, the database project, and the installer project).

Any time that I needed to make a change to retrieve additional data from a table in the application's database, I had to make changes to three projects. First off, I had to update the database project to modify the stored procedure. Once that modification was done, I was able to modify the Data Access Layer to use the new field. Finally, when everything was done, I needed to remember to update the installer project so that the scripts that create and update the database have the correct stored procedures.

Now, as you can see this can cause quite a bit of headache and an update process that can be very prone to error. The way that I found to get around this is to move all but the most complex stored procedures (the ones that were actually performing real work) into the DAL directly.

What this means is that instead of having a stored procedure that does `SELECT * FROM Users`, I send that command directly to the SQL database using the SqlCommand object in the .NET framework. The technique is identical to what is used to execute the stored procedures.

One thing that I hear quite a bit is that you open yourself up to Sql injection attacks when using dynamic sql, instead of stored procedures, because you can not use parameters. This is completely wrong. Let me show an small working example:

``` csharp
SqlCommand cmd = new SqlCommand("select * from users where UserName = @UserName");
cmd.Parameters.Add("@UserName", SqlDbType.VarChar).Value = someUserNameVariable;
```

You see here that you have exactly the same parameter semantics as you do using stored procedures. These semantics allow you to pass values into the parameter object where they will be scrubbed to make sure that no sql injection attacks can take place.

Using dynamic sql in the data access layer, if I want to update the columns that are pulled back, I no longer have to modify a stored procedure in the database project. Also, I dont have to modify the installer project, because all of my sql is right where it belongs... in the data access layer.

[1]:http://weblogs.asp.net/fbouma/archive/2003/11/18/38178.aspx
