---
title: Singleton Design Pattern and Inheritance
disqus_identifier: 2004-12-singleton-design-pattern-and-inheritance
comments: true
---

Implementing the singleton pattern when you are using a single class is trivial using C#. The following chunk of code will accomplish that in a thread-safe manner.

``` csharp
class MySingleton
{
    private static MySingleton instance = new MySingleton();
    public static MySingleton Instance { get { return instance; } }
}
```

What happens though when you want to use singletons with inheritance (ie: each subclass needs to be a singleton as well)? This was the best I could come up with.

``` csharp
using System;
using System.Reflection;

abstract class MySingleton
{
  private static MySingleton instance = null;
  private static readonly object padlock = new object();

  public static MySingleton GetInstance()
  {
    lock (padlock)
    {
	    if (instance == null)
		    SetInstance(typeof(ChildSingleton));

	    return instance;
    }
  }

  public static void SetInstance(MySingleton instance)
  {
    lock (padlock)
    {
	    MySingleton.instance = instance;
    }
  }

  public static void SetInstance(Type type)
  {
    if (type.IsSubclassOf(typeof(MySingleton)))
    {
	    MethodInfo register = type.GetMethod("Register", BindingFlags.Public | BindingFlags.Static);
	    if (register == null)
		    throw new InvalidOperationException("Instance must have a static Register method.");

	    register.Invoke(null, null);
    }
  }

  public virtual string Info { get { return this.GetType().FullName; } }
}

class ChildSingleton : MySingleton
{
  private static ChildSingleton instance = new ChildSingleton();

  private ChildSingleton()
  {
  }

  public static void Register()
  {
    MySingleton.SetInstance(instance);
  }
}

class OtherSingleton : MySingleton
{
  private static OtherSingleton instance = new OtherSingleton();
  private OtherSingleton()
  {
  }

  public static void Register()
  {
    MySingleton.SetInstance(instance);
  }
}

class EntryPoint
{
  public static void Main(string[] args)
  {
    MySingleton singleton = MySingleton.GetInstance();
    Console.WriteLine(singleton.Info);

    MySingleton.SetInstance(typeof(OtherSingleton));
    singleton = MySingleton.GetInstance();
    Console.WriteLine(singleton.Info);
  }
}
```

I'm using this pattern for a project that I have going where resource items can be stored in either a database or on the filesystem. While developing, I would prefer to not have to go through the hoops of updating the database everytime I make a small change to a resource item.

So, while developing, I would use the SetInstance method to initialize the singleton instance to a Type that can read from the file system. Once Im done, I change it back to initialize the singleton instance that can read from the database.

The only thing that *kind of* bugs me about this is the dependency of the Register method on the derived singletons, but I dont see any other way to do this. Is there a better way? I'd be glad to hear peoples thoughts on this.
