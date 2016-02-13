---
title: Unit testing methods which call the ConfigurationSettings API
disqus_identifier: 2006-02-unit-testing-methods-which-call-the-configurationsettings-api
comments: true
---

In the project discussed in the previous post, I have a configuration class that can be instantiated directly and populated with configuration information.

Alternatively, I wanted to have the class know how to load itself from items in the app.config file. The easiest way to do this, I thought, would be to have a static Method on the configuration class. The implementation seemed fairly straightforward, but... I needed to figure out a way to test it.

My thoughts were something along the lines of this:

``` csharp
public class ApplicationConfiguration
{
    // numerous property accessors removed for brevity

    public static ApplicationConfiguration Load()
    {
        return (ApplicationConfiguration)ConfigurationSettings.GetConfig("mySectionName");
    }
}
```

I'm subscribing to Michael Feather's [unit testing rules][1], one of which states that a unit test should not touch the file system (which would include a config file). Somehow, I needed a way to hook into the ConfigurationSettings class to return a test object for me.

After doing quite a bit of digging with Reflector, I stumbled upon an static method on the ConfigurationSettings class called SetConfigurationSystem which takes an IConfigurationSystem implementation as a parameter. It seems that the .NET architects thought about the ability to have a pluggable configuration system. Surely I was on my way to getting this under test.

Not so fast... the method is internal. Herein lies my dilemna. If I go with true TDD, I need to have this call under test. However, it seems like there is quite a bit of work involved with actually getting this under test. Im not aware of any mock framework that will allow me to mock a static method, so Id have to do this by hand.

To be true to the effort of working under TDD, I did write a test for it. This is the code I wrote in my test to do this...

``` csharp
[Test]
public void CanLoadConfigurationWithValidSectionName()
{
    SetConfigurationSystem();
    Assert.IsNotNull(ApplicationConfiguration.Load());
    InvalidateConfigurationSystem();
}

private void SetConfigurationSystem()
{
    Type t = typeof(ConfigurationSettings);
    FieldInfo fi = t.GetField("_configSystem", BindingFlags.NonPublic | BindingFlags.Static);
    fi.SetValue(t, null);

    t.InvokeMember("SetConfigurationSystem",
        BindingFlags.InvokeMethod | BindingFlags.Static | BindingFlags.NonPublic, null, t,
        new object[]
            {
                new MockConfigurationSystem()
            });

}

private void InvalidateConfigurationSystem()
{
    Type t = typeof(ConfigurationSettings);
    FieldInfo fi = t.GetField("_configSystem", BindingFlags.NonPublic | BindingFlags.Static);
    fi.SetValue(t, null);
}

class TestConfigurationSystem : IConfigurationSystem
{
    public object GetConfig(string configKey)
    {
        return new ApplicationConfiguration();
    }
}
```

[1]:http://www.artima.com/weblogs/viewpost.jsp?thread=126923
