---
title: Testing MVP with Rhino.Mocks
disqus_identifier: 2006-03-testing-mvp-with-rhinomocks
comments: true
---

I've been working on a project recently where I've decided to use [Model View Presenter][1] (MVP). The biggest benefit to implementing using MVP is that you end up decoupling your views from your presenters since all communication from the view to the presenter happens via events.

Since all your views are defined as interfaces, this can turn out to be an absolute bear to unit test. To raise an event, you actually have to have a concrete implementation that fires the event.

``` csharp
public interface IView
{
    event EventHandler ItemSelected;
    void SetItem(object o);
}

[Test]
public void TestItemSelected()
{
    TestableView view = new TestableView();
    Presenter subject = new Presenter(view);
    view.FireItemSelected();

    Assert.IsTrue(view.ItemSet);
}

private class TestableView : IView
{
    public event EventHandler ItemSelected;
    public bool ItemSet = false;

    public void SetItem(object o)
    {
        ItemSet = true;
    }

    public void FireItemSelected()
    {
        ItemSelected(this, EventArgs.Empty);
    }
}
```

Pretty straightforward, but what a colossal PITA. Not only do we have to implement a TestableView to fire the event which triggers everything in the presenter, but also we have to put a property on that implementation so we can verify that the presenter actually did what was expected.

Earlier today, a coworker pointed me at a fantastic class that utilizes [Rhino.Mocks][2] to make this *much* easier. Take a look at this gem by Geert Baeyaert.

``` csharp
using System;
using Rhino.Mocks;

public interface IEvent<TEventArgs>
{
    void Raise(object sender, TEventArgs args);
}

public static class LastEvent
{
    public static IEvent<TEventArgs> Get<TEventArgs>() where TEventArgs : EventArgs
    {
        return new Event<EventHandler<TEventArgs>, TEventArgs>();
    }

    public static IEvent<TEventArgs> Get<TEventHandler, TEventArgs>() where TEventArgs : EventArgs
    {
        return new Event<TEventHandler, TEventArgs>();
    }

    private class Event<TEventHandler, TEventArgs> : IEvent<TEventArgs> where TEventArgs : EventArgs
    {
        public Event()
        {
            if (!typeof (Delegate).IsAssignableFrom(typeof (TEventHandler)))
            {
                throw new
                    Exception("TEventHandler should be a delegate type");
            }

            LastCall.Callback((Predicate<TEventHandler>)
                              delegate(TEventHandler handler)
                                  {
                                      // First check if the handler is of type EventHandler<TEventArgs>
                                      EventHandler<TEventArgs> newHandler = handler as EventHandler<TEventArgs>;
                                      if (newHandler == null)
                                      {
                                          // It's not an EventHandler<TEventArgs>, so we wrap a new delegate around it that is of type EventHandler<TEventArgs>
                                          newHandler = delegate(object sender, TEventArgs e)
                                                           {
                                                               // In this new delegate, we dynamically invoke the original delegate.

                                                               ((Delegate) (object) handler).DynamicInvoke(
                                                                   new object[] {sender, e});
                                                           };
                                      }

                                      handlers += newHandler;
                                      return true;
                                  });
        }

        private EventHandler<TEventArgs> handlers;

        public void Raise(object sender, TEventArgs eventArgs)
        {
            EventHandler<TEventArgs> temp = handlers;
            if (temp != null) temp(sender, eventArgs);
        }
    }
}
```

Now the test described above looks more like this:

``` csharp
[Test]
public void TestItemSelected()
{
    using (MockRepository mocks = new MockRepository())
    {
        IView view = mocks.CreateMock();
        view.ItemSelected += null;
        IEvent handler = LastEvent.Get();
        view.SetItem(null);
        LastCall.IgnoreArguments();
        mocks.ReplayAll();

        handler.Raise(this, EventArgs.Empty);
        mocks.VerifyAll();
    }
}
```

This utilizes the Rhino.Mocks framework and the generic capability of .NET 2.0 allowing me to fire off the event without creating a subclass to do so. I also dont need to create the subclass to check that the presenter did what it was supposed to, because I was able to set up an expectation for view.SetItem to be called.

I love tools that make my life easier, and Im quickly seeing that Rhino.Mocks is just one of those things. Great work, Ayende... Now, can we get LastEvent incorporated into the core Rhino.Mocks project? :)

[1]:http://www.martinfowler.com/eaaDev/ModelViewPresenter.html
[2]:http://www.ayende.com/projects/rhino-mocks.aspx
