---
title: Default Constructors
disqus_identifier: 2004-05-default-constructors
comments: true
---

I stumbled across an interesting thing this morning with C# and default constructors.

Take the following code:

``` csharp
using System;

class Vehicle
{
  public Vehicle()
  {
    Console.WriteLine("New Vehicle");
  }
}

class Car : Vehicle
{
  public Car()
  {
    Console.WriteLine("New Car");
  }
}

class EntryPoint
{
  public static void Main(string[] args)
  {
    Car car = new Car();
  }
}
```

My question is why would the Vehicle default constructor be called even though Ive created a default constructor for Car that does *not* call base? Even more interesting is that when I change Car's signature to take a parameter, then the code doesnt even compile.
