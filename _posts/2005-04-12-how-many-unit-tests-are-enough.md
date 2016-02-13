---
title: How many unit tests are enough?
disqus_identifier: 2005-04-how-many-unit-tests-are-enough
comments: true
---

This is a question that I think about frequently. When writing unit tests, it can be very easy to come up with a virtually infinite number ways to test code that might cause it to break. A general rule of thumb is that you will have as many lines of code in your unit tests as you do in your project itself (<http://c2.com/cgi/wiki?ProductionCodeVsUnitTestsRatio>). Given this, we need to make sure that we are testing the right things.

The first area to look at that will increase the quality of your unit tests is fairly obvious. Is the result correct? How do you know that the code ran correctly?

The next thing to increase the quality of your unit tests are boundary conditions. Boundary conditions are things that could happen around the edges of the code. Take for example this class:

``` csharp
public class Calculator
{
    public int Divide(int dividend, int divisor)
    {
        return dividend / divisor;
    }
}

public class CalculatorFixture
{
    [Test]
    public void TestDivide()
    {
        Calculator calc = new Calculator();
        int result = calc.Divide(4, 2);

        Assert.AreEqual(2, result);
    }
}
```

At this point, we have a passing test, and we may be tempted to call the method complete and move on to our next piece of functionality. However, if we think about boundary conditions, you may think: What if I pass 0 as the divisor to the Divide method? This will make you think a little bit more about how you expect your interface to work (ie: should this throw the DivideByZeroException from the framework, or would you prefer to wrap this up in your own custom exception?). At this point, you can see another test creeping forward (checking for the correct exception).

The Pragmatic Programmers have a great book ([Pragmatic Unit Testing in C#][1]) that has a few chapters dedicated on what should be tested. Chapter 5 deals specifically with boundary conditions, introducing the CORRECT acronym:

* Conformance - Does the value conform to an expected format?
* Ordering - Is the set of values ordered or unordered as appropriate?
* Range - Is the value within reasonable minimum and maximum values?
* Reference - Does the code reference anything external that isnt under the direct control of the code itself?
* Existence - Does the value exist (ie: is non-null, non-zero, etc)?
* Cardinality - Are there exactly enough values?
* Time - Is everything happening in order? At the right time? In time?

To get back to the original question posed by this article: How many tests are enough? I think the answer to this is that once you have tested everything that could go wrong and you have achieved 100% code coverage by your unit tests you have sufficient unit tests.

When you first start with Test Driven Development, or even creating unit tests for legacy code you may notice that the timeline seems to stretch. This is perfectly normal, and as with anything you'll get better at it the more you do it.

I like to think of taking a little longer to deliver a product to the QA department in hopes that they dont stumble across stupid bugs that shouldnt have gotten past simple developer testing. Imagine how much more effective your QA department could be if they arent performing tasks such as database validation (that could be accomplished by unit tests). Imagine the increased quality your product could have if the QA department was spending more time in integration and user interface testing.

[1]:http://www.amazon.com/exec/obidos/ASIN/0974514020/mattbertherco-20
