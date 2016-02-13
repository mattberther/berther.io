---
title: ASP.NET pluggable module implementation
disqus_identifier: 2004-10-aspnet-pluggable-module-implementation
comments: true
---

For an ASP.NET project that I've been working on for quite a while, we wanted to have a pluggable module type of page architecture. We would have one main page (default.aspx) which would have a panel control which could get different controls loaded into it.

The way that we originally implemented this was to have a base control that all of our ASCX files would derive from. As detailed in a [previous post][1], creating base classes is something I always do when creating a new project.

``` csharp
public class ControlBase : Control
{
    public SessionManager SessionManager
    {
        return SessionManager.Instance;
    }
}
```

Now, in our original implementation, we added all the modules to the web.config file.

``` xml
<modules>
    <add key="myModule" value="~/path/to/myModule.ascx" />
</modules>
```

Modules were then loaded in the main page class like this:

``` csharp
protected override void OnInit(EventArgs e)
{
    base.OnInit();

    Hashtable modules = ConfigurationSettings.GetConfig("modules");
    ControlBase ctl = Page.LoadControl((string)modules[Request.QueryString["module"]]);
    myContainerPanel.Controls.Add(ctl);
}
```

The more I worked with this and added new controls into our framework, the more disgruntled I became with it. It always seemed like there was more to adding a new control that really should be there. I also had tied a dependency to using ASCX files for my controls, which I didnt really care for either. There are some wierd cases where you may want to have code completely render a control.

Because of this, I started to think about ways that I could improve this idea. Design patterns to the rescue...

The idea would be that a class would be responsible for creating the control, rather than the OnInit method of the page. This led to the realization that I would have some common interface to key and create a control.

``` csharp
public interface IControlFactory
{
    string Name { get; }
    ControlBase CreateControl();
}
```

Now, my derived controls have a code structure that looks something like this:

``` csharp
public class MyControl : ControlBase
{
    class Factory : IControlFactory
    {
        public Name { get { return "MyControl"; } }
        public ControlBase CreateControl()
        {
            Page page = (Page)HttpContext.Current.Handler;
            return (ControlBase)page.LoadControl("~/path/to/myControl.ascx");

            // note that this works with ascx files, but we could just as easily
            // do return new MyControl(); if our control is completely rendered with code.
        }
    }

    // rest of MyControl class goes here
}
```

The missing component now is a class that tracks these IControlFactory implementations and returns the appropriate instance based on a passed in key. Introducing the WebControlFactory class...

``` csharp
class WebControlFactory
{
    private static Hashtable factories;

    private WebControlFactory()
    {
    }

    public static void Register()
    {
        factories = new Hashtable();
        foreach(string file in Directory.GetFiles(HttpContext.Current.Server.MapPath("~/bin"), "*.dll"))
        {
            try
            {
                FileInfo fileInfo = new FileInfo(file);
                string assemblyPath = fileInfo.Name.Replace(fileInfo.Extension, "");
                Assembly asm = AppDomain.CurrentDomain.Load(assemblyPath);

                foreach(Type t in asm.GetTypes())
                {
                    if(!t.IsInterface &amp;&amp; !t.IsAbstract &amp;&amp; typeof(IControlFactory).IsAssignableFrom(t))
                    {
                        try
                        {
                            IControlFactory controlFactory = (IControlFactory)Activator.CreateInstance(t);
                            factories.Add(controlFactory.Name, controlFactory);
                        }
                        catch (Exception e)
                        {
                            Trace.WriteLine("Exception encountered loading type '" + t.FullName +  "': " + e.ToString());
                            // this is deliberately ignored, as any error in loading the type should just involve
                            // continuing on
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Trace.WriteLine("Exception encountered loading control: " + e.ToString());
                // this is deliberately ignored, as any error in loading the assembly should just involve
                // continuing on
            }
        }
    }

    public static ControlBase CreateWebControl(string name)
    {
        if (factories.ContainsKey(name))
        {
            IControlFactory factory = (IControlFactory)factories[name];
            return factory.CreateControl();
        }

        throw new InvalidOperationException("No factory registered to handle '" + name + "' controls.");
    }
}
```

Now, the final steps to implement this new method would be to add a call to WebControlFactory.Register() to the Application_Start method in Global.asax. The register method is responsible for scanning any assemblies in the bin folder, scanning their types for IControlFactory implementations, and adding them to a hashtable if they do.

The second thing to do here is to modify our OnInit method to take advantage of this new class:

``` csharp
protected override void OnInit(EventArgs e)
{
    base.OnInit();

    ControlBase ctl = WebControlFactory.CreateWebControl(Request.QueryString["module"]);
    myContainerPanel.Controls.Add(ctl);
}
```

This has solved my problems with the original implementation. I no longer am limited to ascx files for controls, and I also dont have to jump through the hoops of adding new modules to the web.config file. Using this object model, I am able to create web controls in a separate assembly, drop them in the bin folder and go.

I understand that this technique will be obsoleted by VS.NET 2005 and master pages, but for now, I think this is an elegant technique and I hope you find some value from it...

[1]:/2004/07/12/a-useful-session-object-wrapper/
