---
title: Refactoring away external loops
disqus_identifier: 2005-01-refactoring-away-external-loops
comments: true
---

Via [Peter Provost][1], I found Brian Button's fantastic "TDD Deep Dive" series, which is a great introduction to TDD and refactoring.

In part 4 of this series, Brian talks about one of the most [interesting refactorings][2] Ive seen in a long time. The whole idea of refactoring is to improve the design of existing code, and removing duplications.

One of the most duplicated blocks of code is a loop over a collection. Not only is it duplicated, but it is also breaking the rules of encapsulation, since exposing the enumerator like that allows potential misuse by clients.

The idea is that you place a method on the collection that does the iteration, and create a delegate that gets called inside that method. For example:

``` csharp
public class PersonCollection
{
    public delegate void IteratorAction(Person person);

    public void Iterate(IteratorAction action)
    {
        foreach (Person person in persons)
        {
            action(person);
        }
    }

    // other collection methods such as Add and Remove
}
```

The client code then looks something like:

``` csharp
public class EntryPoint
{
    public static void Main(string[] args)
    {
        PersonCollection coll = new PersonCollection();
        coll.Add("Matt");
        coll.Add("Fred");
        coll.Add("Bob");

        coll.Iterate(new PersonCollection.IteratorAction(SayHello));
    }

    private static void SayHello(Person person)
    {
        Console.WriteLine("Hello, {0}", person.Name);
    }
}
```

This refactoring is pure genius, and one that I am definitely going to look for and apply when I can.

[1]:http://www.peterprovost.org/archive/2005/01/16/2568.aspx
[2]:http://dotnetjunkies.com/WebLog/oneagilecoder/archive/2004/11/25/33603.aspx
