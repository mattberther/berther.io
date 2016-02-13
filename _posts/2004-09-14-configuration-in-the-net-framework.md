---
title: Configuration in the .NET framework
disqus_identifier: 2004-09-configuration-in-the-net-framework
comments: true
---

A lot of people (me included) use the configuration API in the .NET framework (System.Configuration.ConfigurationSettings.AppSettings) to store configuration settings for their applications.

One thing that I've been doing a lot lately is to create an object that provides strongly typed accessors to the data that I store in the AppSettings.

For example, take the following configuration snippet:

``` xml
<configuration>
    <appSettings>
        <add key="connectionString"
             value="server=.;database=myDatabase;ui=user;pwd=password"/>
    </appSettings>
</configuration>
```

Rather than referencing this throughout my entire code base with `ConfigurationSettings.AppSettings["connectionString"]`, I create an object that provides an accessor to this.

``` csharp
class Configuration
{
    public static string ConnectionString
    {
        get { return ConfigurationSettings.AppSettings["connectionString"]; }
    }
}
```

The benefits of this are three-fold:

* Intellisense support for your configuration options.
* "Magic Words" are removed from the code base. This allows you to catch errors at compile time, instead of runtime. For example: lets say that you called `ConfigurationSettings.AppSettings["connectString"]` in one spot in your code. Using the object above would have made that a compile error.
* Decoupling of your configuration mechanism from the rest of the code base. The rest of your code simply references this Configuration object; you are free to change the implementation of the Configuration object without affecting the rest of the code.

The same idea can also be applied to custom configuration sections. Just add a method or property to your configuration object that calls `ConfigurationSettings.GetConfig("yourSection")`.

This is a very neat technique, I think. I hope that you find it useful as well.
