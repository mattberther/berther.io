---
title: A flexible plugin loader
disqus_identifier: 2005-07-a-flexible-plugin-loader
comments: true
---

Ever added plugin capabilities to your application? Are you tired of writing the same discovery and loading code over and over? I am too, and came up with this fun little class:

``` csharp
class PluginLoader
{
    public static ConstructorInfo[] FindPlugins(Type pluginType)
    {
        ArrayList list = new ArrayList();

        foreach (string file in Directory.GetFiles(Environment.CurrentDirectory, "*.dll"))
        {
            try
            {
                FileInfo fileInfo = new FileInfo(file);
                string assemblyPath = fileInfo.Name.Replace(fileInfo.Extension, "");
                Assembly asm = AppDomain.CurrentDomain.Load(assemblyPath);

                foreach (Type t in asm.GetExportedTypes())
                {
                    if (pluginType.IsAssignableFrom(t))
                    {
                        ConstructorInfo ctor = t.GetConstructor(Type.EmptyTypes);
                        if (ctor != null)
                        {
                            list.Add(ctor);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Trace.WriteLine("Exception encountered loading plugin: " + e.ToString());
                // this is deliberately ignored, as any error in loading the assembly should just involve
                // continuing on
            }
        }

        return (ConstructorInfo[])list.ToArray(typeof(ConstructorInfo));
    }
}
```

Wherever you want to get a list of available plugins, use `PluginLoader.FindPlugins(typeof(YourPluginType));`. The method returns an array of ConstructorInfo objects so you will be responsible for instantiating the objects yourself. This is the heavy part of the reflection though, so its only done once and you can instantiate when you need the plugin.

One thing I would probably like to do is to get the discovery mechanism happening in a secondary appdomain. This will help by keeping assemblies unloaded until they are actually used by the application.
