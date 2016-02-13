---
title: Custom Configuration Sections in Beta 2
disqus_identifier: 2005-06-custom-configuration-sections-in-beta-2
comments: true
---

I spent a little time this afternoon delving into Whidbey Beta 2, after finally surfacing from other priorities at work.

One of the things that I've been really interested in is the [Provider pattern][1], and so I decided to start understanding a little more how this pattern works in Whidbey. I've used this pattern quite a bit in .NET 1.1, however, the nice thing about 2.0 is that a lot of the base classes are already there for you.

As I was investigating further, there was one thing that really caught my eye. This was the new Configuration mechanism which you can use to create your own custom configuration sections. You know have the option to do this all declaratively (by deriving ConfigurationSection), instead of manually parsing the XML like you did with 1.1.

As I was looking through some of the pre-built ConfigurationSections, in my mind, there was one that was conspicuously missing considering the emphasis of the Provider pattern in .NET 2.0 and that was a Provider section.

What I hoped for was a class that would allow me to declare a section that looked something like this:

``` xml
<sectionName defaultProvider="">
    <providers>
        <add name=""
            type="" />
    </providers>
</sectionName>
```

Unfortunately, I did not find one, so I wrote one out. This also helped me to understand the new configuration mechanism, and saves me from having to re-implement the same logic for any other providers I may author in the future.

``` csharp
public class ProviderSection : ConfigurationSection
{
    private readonly ConfigurationProperty defaultProvider = new ConfigurationProperty("defaultProvider", typeof(string), null);
    private readonly ConfigurationProperty providers = new ConfigurationProperty("providers", typeof(ProviderSettingsCollection), null);
    private ConfigurationPropertyCollection properties = new ConfigurationPropertyCollection();

    public ProviderSection()
    {
        properties.Add(providers);
        properties.Add(defaultProvider);
    }

    [StringValidator(MinLength = 1)]
    [ConfigurationProperty("defaultProvider")]
    public string DefaultProvider
    {
        get { return (string)base[defaultProvider]; }
        set { base[defaultProvider] = value; }
    }

    [ConfigurationProperty("providers")]
    public ProviderSettingsCollection Providers
    {
        get { return (ProviderSettingsCollection)base[providers]; }
    }

    protected override ConfigurationPropertyCollection Properties
    {
        get { return properties; }
    }
}
```

Immediately, you should notice the two attributes on the DefaultProvider property. The ConfigurationProperty attribute denotes which attribute should be used for loading the property, and the StringValidator attribute insures that the attribute is at least one character long. How *cool* is this? To write something like this in 1.1 would have taken easily 3 times as much code.

[1]:http://msdn.microsoft.com/library/en-us/dnaspnet/html/asp02182004.asp
