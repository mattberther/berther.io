---
title: Modifying your web.config file via an installer
disqus_identifier: 2004-01-modifying-your-webconfig-file-via-an-installer
comments: true
---

When installing a web application, it is often necessary for items in the web.config file to be modified at runtime (eg: database connection strings).

Of course, you could include documentation on how to do this, but wouldnt it be nice if you could do this through your install program.

Parameters can be set as properties through the installer that you are using. When you create a class that inherits System.Configuration.Install.Installer, you gain access to a Context property.

This Context property has a Parameters StringDictionary on it which contains all the property values.

The following code snippet shows an implementation of an installer that can modify a web.config file. If you use this in your code, you'll need to make sure and add the `RunInstaller(true)` attribute to the class.

``` csharp
public class WebConfigInstaller : Installer
{
    protected string WebConfigFilename
    {
        get
        {
            return Path.Combine(
                this.Context.Parameters["INSTALLDIR"], "Web.config");
        }
    }

    public override Install(IDictionary stateSaver)
    {
        base.Install(stateSaver);

        XmlDocument doc = new XmlDocument();
        doc.Load(this.WebConfigFilename);

        // At this point, you can modify your web.config
        // via the objects in the System.Xml namespace.

        doc.Save(this.WebConfigFilename);
    }

    public override Uninstall(IDictionary savedState)
    {
        if (File.Exists(this.WebConfigFilename))
        {
            File.Delete(this.WebConfigFilename);
        }
    }
}
```

Feedback always welcome...
