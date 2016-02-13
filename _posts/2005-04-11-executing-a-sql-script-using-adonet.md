---
title: Executing a SQL script using ADO.NET
disqus_identifier: 2005-04-executing-a-sql-script-using-adonet
comments: true
---

Recently, while creating an installer application, I had the need to execute a sql script while my application was being installed. A while back, I [posted a technique][1] that would accomplish this.

The drawback to that technique was that it required the osql.exe on the machine I was installing. In most cases this would work, but I wanted to find a way to run a sql script, without any outside dependencies (other than the .NET framework that my installer would lay down).

This is what I came up with:

``` csharp
public void ExecuteSql(SqlConnection connection, string sqlFile)
{
    string sql = "";

    using (FileStream strm = File.OpenRead(sqlFile))
    {
        StreamReader reader = new StreamReader(strm);
        sql = reader.ReadToEnd();
    }


    Regex regex = new Regex("^GO", RegexOptions.IgnoreCase | RegexOptions.Multiline);
    string[] lines = regex.Split(sql);

    SqlTransaction transaction = connection.BeginTransaction();
    using (SqlCommand cmd = connection.CreateCommand())
    {
        cmd.Connection = connection;
        cmd.Transaction = transaction;

        foreach (string line in lines)
        {
            if (line.Length > 0)
            {
                cmd.CommandText = line;
                cmd.CommandType = CommandType.Text;

                try
                {
                    cmd.ExecuteNonQuery();
                }
                catch (SqlException)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }
    }

    transaction.Commit();
}
```

The key here is the regex that looks for a line that starts with 'GO'. This needs to be done because ADO.NET will throw a SqlException if the script contains 'GO'. I'm now taking advantage of this technique in my installers, eliminating the osql dependency.

Also, you'll notice that I make use of ADO.NET's fantastic transaction capabilities. The SqlTransaction class represents a T-SQL transaction to be made in a SQL Server database.

By using it in the way that I have, if any portion of the sql script fails, the whole thing aborts (see the Rollback call in the exception handler). Since we would be using this to install or update a database, we would want to use this so that we do not leave the database in an unusable state. When all commands in the file successfully have executed, we call Commit on the transaction which sends the transaction through.

[1]:/2004/03/03/running-a-sql-script-via-an-installer/
