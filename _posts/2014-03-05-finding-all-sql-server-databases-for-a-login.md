---
title: Finding all SQL Server databases for a login
disqus_identifier: 2014-03-finding-all-sql-server-databases-for-a-login
comments: true
---

Earlier today, I had a need to deactivate a SQL Server login. Before I did that, I wanted to find out which databases the user was allowed to access. Rather than opening each of the 35 databases on the SQL Server in SSMS and looking to see whether or not the login was a user in the database, I wanted to create a query that would do this all in one fell swoop for me.

I learned a little more about `sp_MSforeachdb`, which is a stored procedure that executes the parameter against every database on the SQL Server. There are several documented problems with this stored procedure, but for what I needed to do, it was a great way to get the job done.

The command I used was:

``` sql
exec sp_MSforeachdb 'if (select count(*) from [?].sys.sysusers where
  name = "usernametosearch") > 0 select "?"'
```

In the above command, you'll notice the '?', which is substituted for the database name on every iteration of the loop.

Again, not the right tool for every job... but it served well here.
