---
title: "Refactoring: Explained"
disqus_identifier: 2006-01-refactoring-explained
comments: true
---

Yesterday, at work, we had a very lively discussion about refactoring. I took a few things away from that discussion and thought I would address these in this particular entry.

First, I believe there is a fundamental misunderstanding of the definition of refactoring. Refactoring, as defined by Martin Fowler in his book is "a disciplined technique for restructuring an existing body of code, altering its internal structure without changing its external behavior". Refactoring can be used as both a verb and as a noun. When used as a noun, refactoring is a small behavior preserving transformation. Grouping several of these transformations defines the verb of refactoring.

That said, by looking again at the definition, it is important to realize that you do not "refactor" a UI, in the same way that you do not "refactor" a word document. The key part of the definition is "altering its internal structure without changing its external behavior". When you work with UI changes, you are redesigning an interface, not refactoring it.

Another point that I took away from our discussion was the lack of understanding how small a refactoring actually is. Its important to note that coming to a loosely coupled, highly cohesive solution is the result of an iterative process of going through these very small transformations, which will lead you to the ultimate goal.

The key blocker to getting legacy code under test is breaking dependencies, so lets look at how we can accomplish this with a small series of refactorings. Let's say we have a simple class that uses HttpSessionState extensively. Our goal is to get this class under test.

The legacy code that we are looking at is defined like this:

``` csharp
public class MyPage
{
    public void Method1()
    {
        HttpContext.Current.Session["key"] = "value1";
    }

    public void Method2()
    {
        string s = HttpContext.Current.Session["key2"];
        // do something with s
    }

    public void Method3()
    {
        string s = HttpContext.Current.Session["key"];
        // do something with s
    }
}
```

We can see here that we have a little bit of code duplication. It may not be completely obvious where the duplication lies right now. However, after applying one simple refactoring, called ExtractMethod, to this code we can see how we've eliminated duplication.

``` csharp
public class MyPage
{
    public void Method1()
    {
        AddToSession("key", "value1");
    }

    public void Method2()
    {
        string s = RetrieveFromSession("key2");
        // do something with s
    }

    public void Method3()
    {
        string s = RetrieveFromSession("key");
        // do something with s
    }

    public string RetrieveFromSession(string key)
    {
        return HttpContext.Current.Session[key];
    }

    public void AddToSession(string key, string value)
    {
        HttpContext.Current.Session[key] = value;
    }
}
```

This simple extract method refactoring actually accomplished a great deal for this code. Primarily, we have now encapsulated our Session store behind some methods. If we want to change how this class works with Session, we are now only changing it in one method, rather than throughout the entire class. So, as we can see by performing one very small behavior preserving transformation to the code, we've increased its maintainability.

Lets move on to the next step to getting this code under test. As most anyone who has tried to get an HttpContext in an NUnit test can attest to, this is virtually impossible. Sure, I know there are numerous hacks available on how to accomplish this, however, our goal is two fold. First, to get it under test, and second to break dependencies.

So, how do you break this dependency? Let's look at another refactoring called ExtractClass. Extract class is a small step that involves taking a method or group of methods and placing them into a new class.

Consider this:

``` csharp
public class SessionStore
{
    public string RetrieveFromSession(string key)
    {
        return HttpContext.Current.Session[key];
    }

    public void AddToSession(string key, string value)
    {
        HttpContext.Current.Session[key] = value;
    }
}

public class MyPage
{
    private SessionStore sessionStore = new SessionStore();

    public void Method1()
    {
        sessionStore.AddToSession("key");
    }

    public void Method2()
    {
        string s = sessionStore.RetrieveFromSession("key2");
        // do something with s
    }

    public void Method3()
    {
        string s = sessionStore.RetrieveFromSession("key");
        // do something with s
    }
}
```

All we've done in this example is move the RetrieveFromSession method into a new class called SessionStore. By doing this, we've encapsulated the Session store behind a class, so now it is not only available to the MyPage class, but the same store is available to the rest of the application as well.

Now, lets get this under test. To get this under test, we perform one more small behavior transforming step called Extract Interface. The Extract Interface refactoring is exactly what it says; create a new interface from a certain group of methods. This is where the magic happens to get this under test.

``` csharp
public interface ISessionStore
{
    string RetrieveFromSession(string key);
    void AddToSession(string key, string value);
}

public class SessionStore : ISessionStore
{
    public string RetrieveFromSession(string key)
    {
        return HttpContext.Current.Session[key];
    }

    public void AddToSession(string key, string value)
    {
        HttpContext.Current.Session[key] = value;
    }
}

public class MyPage
{
    private ISessionStore sessionStore = new SessionStore();

    public void Method1()
    {
        sessionStore.AddToSession("key", "value1");
    }

    public void Method2()
    {
        string s = sessionStore.RetrieveFromSession("key2");
        // do something with s
    }

    public void Method3()
    {
        string s = sessionStore.RetrieveFromSession("key");
        // do something with s
    }
}
```

We now have an interface that defines the behavior or contract that we expect from our SessionStore implementations. Doing this in conjunction with dependency injection allows us to very easily stub out a session store for use in our test project.

``` csharp
public class MyPage
{
    private ISessionStore sessionStore;

    public MyPage(ISessionStore sessionStore)
    {
        this.sessionStore = sessionStore;
    }

    // rest of code omitted for brevity
}

class StubSessionStore : ISessionStore
{
    private StringDictionary dict = new StringDictionary();

    public string RetrieveFromSession(string key)
    {
        return dict[key];
    }

    public void AddToSession(string key, string value)
    {
        dict[key] = value;
    }
}

[TestFixture]
class MyPageFixture
{
    [Test]
    public void TestMethod1()
    {
        ISessionStore sessionStore = new StubSessionStore();
        MyPage page = new MyPage(sessionStore);
        page.Method1();

        Assert.AreEqual("value1", sessionStore.RetrieveFromSession("key");
    }
}
```

Wow! What just happened?

This has now accomplished both of our goals. We are now able to bring the MyPage class under test, because we have broken the MyPage's dependency on the HttpContext.Session store. The MyPage class takes an implementation of ISessionStore in its constructor and communicates with the session store via that interface, so no longer are we limited to using the options provided by ASP.NET. We also no longer have the dependency on the HttpContext in our test method, since we are providing our own implementation of ISessionStore to the class under test.

There are still more things that we could do with this particular piece of code. Primarily, since I think we all agree that string literals are a bad thing, we could go through and follow the same process to bring the literals into the ISessionStore interface so that we can access them as strongly typed members of the interface. This means that if we mistype it, the error will be caught at compile time as opposed to runtime.

As you can see, the refactoring of this application consisted of many small steps, which led us to the final outcome. It is very strongly recommended that you go through these smaller steps, as going from the first piece of code to the last when working with legacy code is bound to introduce errors. By performing the small steps, you are able to verify that no behavior was altered after each step. If something goes wrong, its much easier to roll back that single step as opposed to rolling back a whole gaggle of changes.

I hope that after reading this you have a better understanding of refactoring, if you're new to it. If you've got a bit of experience with this, I hope that you find this worthy of sending to colleagues that may be new to the concept and are struggling with how to effectively use refactorings as part of their daily work.
