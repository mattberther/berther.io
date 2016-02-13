---
title: How to install a component to the VS.NET toolbox
disqus_identifier: 2004-01-how-to-install-a-component-to-the-vsnet-toolbox
comments: true
---

I think one of the things that makes a good component even better is that when I install it, it automatically installs itself to my Visual Studio.NET toolbox. For a while now, I've been looking at ways to accomplish this and finally came up with this.

**Update:** This project is now available at [github][1].

I've created a base class that you can derive from that will do exactly this. You only have to implement three properties: ComponentName, ComponentPath, and TabName.

I've provided another property that will remove the tab when an uninstall occurs. Also, to make sure that the tab gets registered properly, I included a protected property that determines whether or not VS.NET is running. This is code that I found via [Shawn Van Ness][2], who happened to be going through a similar problem.

Using this is very straightforward, and you should be able to hook it up to any installation utility that supports .NET assemblies as custom actions (InstallShield, VS.NET Setup, and WISE).

A simple implementation might look like this:

``` csharp
[
RunInstaller(true),
ToolboxItem(false)
]
public class MyComponentToolboxInstaller : MattBerther.Install.ToolboxInstallerBase
{
    protected override string ComponentName
    {
        get { return "My Control Package"; }
    }

    protected override string ComponentPath
    {
    	get
    	{
    	    return Path.Combine(
    	        this.Context.Parameters["INSTALLDIR"], "MyComponentLibrary.dll");
    	}
    }

    protected override string TabName
    {
    	get { return "My Company Name"; }
    }

    protected override bool UninstallRemovesTab
    {
        get { return true; }
    }

    public override Install(IDictionary stateSaver)
    {
      // Perform check to make sure that VS.NET isnt running
      // This will allow us to be certain that our tab shows up properly.
      while (this.IsVisualStudioRunning)
      {
        "One or more instances of Visual Studio .NET are running.\r\n\r\n" +
                                    "To continue, please shutdown all " +
                                    "running instances of VS.NET,\r\n and click 'Retry'.",
        "MattBerther.Com Controls", MessageBoxButtons.RetryCancel, MessageBoxIcon.Warning);
        if (dr == DialogResult.Cancel)
        {
    	    throw new InstallException("Unable to continue.");
        }
      }

      base.Install(stateSaver);
    }
}
```

I do hope that people find this useful, and can use it to provide a thorough installation process for their control libraries.

If you encounter any issues, please let me know.

[1]:http://github.com/mattberther/vs-toolbox-installer
[2]:http://weblogs.asp.net/savanness/archive/2003/04/24/6012.aspx
