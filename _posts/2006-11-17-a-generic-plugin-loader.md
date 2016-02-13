---
title: A generic plugin loader
disqus_identifier: 2006-11-a-generic-plugin-loader
comments: true
---

I dont know how many times I end up writing code that iterates over a set of .dll files and looks for classes that implement a given interface.

I think that just now, I wrote this for the last time... Check this out. I'm kinda proud of it. :)

``` csharp
class PluginLoader
{
    public virtual IList<T> LoadPlugins<T>() where T: class
    {
        IList<T> plugins = new List<T>();
        string[] assemblies = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory, "*.dll");

        foreach (string assembly in assemblies)
        {
            try
            {
                Assembly asm = Assembly.LoadFrom(assembly);
                foreach (Type type in asm.GetTypes())
                {
                    if (typeof (T).IsAssignableFrom(type) && !type.IsAbstract)
                    {
                        T plugin = Activator.CreateInstance(type) as T;
                        if (plugin != null)
                        {
                            plugins.Add(plugin);
                        }
                    }
                }
            }
            catch (Exception)
            {
                // A failure to load a plugin should not throw an exception
            }
        }
        return plugins;
    }
}
```

How do you use this? Pretty simple, actually...

``` csharp
PluginLoader loader = new PluginLoader();
IList<MyPluginType> plugins = loader.LoadPlugins<MyPluginType>();
```

I love writing code again... It's been too long. :)
