---
title: A Factory Pattern, part II
disqus_identifier: 2004-09-a-factory-pattern-part-ii
comments: true
---

Jay Bazuzi jots down the start of a great idea for a [factory pattern][1] that popped into his head. He mentioned that he didnt know what it's good for.

I'll agree with him... by itself, it really isnt good for anything, as the factory is very tightly coupled to the class being returned. However, if we modify his implementation slightly, and introduce an abstract base factory class, the idea starts to make a lot more sense...

``` csharp
abstract class LetterFactory
{
    private static Hashtable factories = new Hashtable();

    public static void AddFactory(string id, LetterFactory factory)
    {
        factories.Add(id, factory);
    }

    public static Letter CreateLetter(String id)
    {
        if (!factories.ContainsKey(id))
        {
            string type = String.Format("{0}.{1}", this.GetType().Namespace, id);
            Type t = Type.GetType(type, true);
            Activator.CreateInstance(t);
        }

        if (!factories.ContainsKey(id))
        {
            throw new ApplicationException("An error occurred creating the factory.");
        }

        return ((LetterFactory)factories[id]).Create();
    }

    protected abstract Letter Create();
}

abstract class Letter
{
    public abstract void Display();
}

class A : Letter
{
    static
    {
        LetterFactory.AddFactory("A", new Factory());
    }

    private A()
    {
    }

    public void Display()
    {
        Console.WriteLine("A");
    }

    private class Factory : LetterFactory
    {
        protected Letter Create()
        {
            return new A();
        }
    }
}

class Program
{
    public static void Main(string[] args)
    {
        Letter l = LetterFactory.CreateLetter("A");
        l.Display();
    }
}
```

In this implementation, a nested factory class is derived from the base factory, and the abstract method is used to return the specific instance. Here, we are very close to what Jay was doing. However, the difference is in the static constructor, where we register our class with the factory.

We could even go a little farther, and try and load classes dynamically using reflection in the CreateLetter method, so that we arent dependant on using the static constructor.

Jay has really gotten me to think about nested classes and they can truly be useful in a lot of situations, including this. Make sure you dont overlook them.

[1]:http://weblogs.asp.net/jaybaz_ms/archive/2004/09/01/224277.aspx
