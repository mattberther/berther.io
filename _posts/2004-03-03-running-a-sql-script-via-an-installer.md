---
title: Running a SQL script via an Installer
disqus_identifier: 2004-03-running-a-sql-script-via-an-installer
comments: true
---

A lot of times, when installing an application, it will be necessary to run some SQL scripts to prepare the application for first use.

Of course, you could have the user do this part manual, but in my opinion, a well polished installation should do everything for the user.

For a while now, I've been looking at a good way to accomplish integrating the creation of SQL scripts with an installer. Deciding to leverage C# components, I came up with this solution.

``` csharp
[RunInstaller(true)]
public class SqlInstaller : System.Configuration.Install.Installer
{
    public override void Install(IDictionary stateSaver)
    {
        string server = this.Context.Parameters["Server"];
        string password = this.Context.Parameters["Password"];
        string user = this.Context.Parameters["User"];
        string database = this.Context.Parameters["Database"];
        string sqlFile = this.Context.Parameters["SqlFile"];

        // Store these values in the saved state so they will be available to
        // us in the uninstall.
        stateSaver.Add("Server", server);
        stateSaver.Add("Password", password);
        stateSaver.Add("User", user);
        stateSaver.Add("Database", database);

        string commandLine = String.Format("-U {0} -P {1} -S {2} -i \"{3}\"",
            user, password, server, sqlFile);
        LaunchOSql(commandLine);

        base.Install(stateSaver);
    }

    public override void Uninstall(IDictionary savedState)
    {
        base.Uninstall(savedState);

        string server = (String)savedState["Server"];
        string password = (String)savedState["Password"];
        string user = (String)savedState["User"];
        string database = (String)savedState["Database"];
        string sqlFile = this.Context.Parameters["SqlFile"];

        string commandLine = String.Format("-U {0} -P {1} -S {2} -i \"{3}\"",
            user, password, server, sqlFile);
        LaunchOSql(commandLine);
    }

    private void LaunchOSql(String commandLine)
    {
        using (Process process = new Process())
        {
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.FileName = "osql.exe";
            process.StartInfo.Arguments = commandLine;
            process.Start();

            process.WaitForExit();
        }
    }
}
```

When creating this custom action, you will need to pass in the appropriate parameters that you collect from the user. When using VS.NET's installer, your parameter string would look something like:

``` console
/Server=[SERVERNAME] /User=[USERNAME] /Password=[PASSWORD] /Database=[DATABASE] /SqlFile=[SQLFILE]
```

There are ways to enhance this class. One thing that I have done, for example, is to process the incoming SQL script so that it can create a database with a name of the user's choice.

Doing this involved adding a placeholder to the SQL script (%%DBNAME%%), and then loading the script in memory during my Install and Uninstall methods. After the script was loaded into a String, I simply do a replace on %%DBNAME%% with the value of the passed in database.

Also, the code could be easily modified to allow for using SSPI authentication by replacing the -U and -P in the command line assignment to -E.

Lastly, the code that I posted above does not have any error handling. I'll leave that as an excercise to the reader.

If you encounter any issues with this code, please do let me know.
