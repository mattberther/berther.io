---
title: NCover as a TDD tool
disqus_identifier: 2006-02-ncover-as-a-tdd-tool
comments: true
---

During a recent project, I made a very committed effort to implement this project using strict TDD practices. I ended up with a simpler design than originally expected based on those tests, which makes me think that the process worked very well. I let the tests fuel the design.

After I completed, as an experiment, I thought Id run the unit tests through [NCover][1] which would show me the code coverage I had. If I had done true TDD, I should have 100% code coverage. What was surprising to me was that even though I had paid a lot of attention to TDD, I saw that I had about 10% of my code not being hit by the unit tests.

What I noticed was that I was automatically doing things like parameter validation without thinking about it, and therefore not writing an appropriate test for it.

For example:

``` csharp
[Test]
public void TestOutput()
{
    TextWriter writer = new StringWriter();
    MyClass klass = new MyClass();
    klass.Output(writer);

    Assert.IsValid("expectedString", writer.ToString());
}

public class MyClass
{
    public void Output(TextWriter writer)
    {
        if (writer == null)
        {
            throw new ArgumentNullException("writer");
        }

        writer.Write("expectedString");
    }
}
```

While we all know that we need to check the parameter before using it, I ended up automatically doing it, instead of implementing a test that verifies it. What I should have done was added another test *before* I added the parameter checking:

``` csharp
[Test]
[ExpectedException(typeof(ArgumentNullException))]
public void TestOutputWithNullWriter()
{
    MyClass klass = new MyClass();
    klass.Output(null);
}
```

Thanks to NCover, I now find that I now have almost 100% code coverage from my tests. This is an invaluable tool for the novice TDD'er and Im sure that even the most experienced can benefit from its analysis.

[1]:http://www.ncover.org
