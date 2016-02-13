---
title: Avoiding Failure
disqus_identifier: 2005-01-avoiding-failure
comments: true
---

Yesterday, the UPS truck delivered my recent purchase of [Code Complete, Second Edition][1].

Having never read the original Code Complete and having heard so much about it, I could hardly wait to open the box and immediately started skimming through some of the sections. Yesterday evening, I started at page 1 and am working my way through it. I'm now about 20% into the book and am thoroughly impressed with it.

This book is filled with many "why didnt I think of that" items, including one of the best things Ive heard in a while. In the chapter that talks about building your designs (Chapter 5, if you have the book), the author mentions a heuristic called 'Avoid Failure'.

The idea is that design failures could be avoided if you consider the ways that the design might fail, rather than just copy the attributes of other successful designs.

This is a very intriguing idea, and one that can be taken outside of the realm of building design. A place that I saw an immediate benefit by thinking about avoiding failure is in testing (unit testing or quality testing).

For example, if I have a simple unit test that does this:

``` csharp
class MyMath
{
    public static int Divide(int dividend, int divisor)
    {
        return divident / divisor;
    }
}

[TestFixture]
class MyMathFixture
{
    [Test]
    public void TestDivide()
    {
        int expected = 6 / 2;
        int value = MyMath.Divide(6, 2);
        Assert.AreEqual(expected, value);
    }
}
```

Our test passes perfectly. However, what happens when we think about avoiding failure? Is there another test hiding in there? What if we pass 0 as the divisor?

The same idea can be used when testing a web page. Let's say that we have a simple data entry form that takes a persons birthdate and saves it into the database.

A common testing scenario would be to enter the following information into the corresponding fields on the web page:

Name: John Doe  
Birth Date: 01/02/73

Once this is done, look at the data in the database. Does it match? Yes! It must work... right?

Maybe! Now, if we think about avoiding failure, we may ask ourselves what happens if I type the persons name into the birth date field and the birth date into the name field.

These are trivial examples, but one can see how you might get a lot better test coverage when thinking about considering the way an application could fail, rather than the way it should work.

[1]:http://www.amazon.com/exec/obidos/ASIN/0735619670/mattbertherco-20
