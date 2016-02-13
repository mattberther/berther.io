---
title: "Design Patterns: Template Method"
disqus_identifier: 2004-07-design-patterns-template-method
comments: true
---

Let's take a look at how we can refactor an existing chunk of code to take advantage of the Template Method design pattern. This pattern's intent is to provide a skeleton of an algorithm in a method, deferring some steps to subclasses.

Our original chunk of code will come from [Michael Schwarz's post][1] about using IHttpHandlers without IIS settings. Just to be clear, this article intends no disrespect to Mr. Schwarz's post or code quality. He has a perfectly acceptable solution to the problem. I just want to show how design patterns can be used to simplify the solution.

As you look through the code, you can see that the base class exposes a Render event that subclasses need to use to inject their own painting prior to being written to the output stream. Every subclass needs to remember to wire this event up if they wish to use it.

Picking out the template method is fairly simple in this case. Since we want our subclasses to be able to paint onto the graphics object, our base class now defines `protected virtual void Paint(Graphics g)`. We could declare this method as abstract if we wanted our subclasses to be forced to paint something onto the graphics object. However, in our case, a default implementation in the base class is fine. Subclasases can override this to provide additional behaviour, if they require it.

The base class then modifies the ProcessRequest method to use this new Paint method at the point where the event was triggered. The code below is the refactored version of Mr. Schwarz's code:

``` csharp
public class MyHttpHandler : IHttpHandler
{
    protected int Width = 100;
    protected int Height = 100;

    protected virtual void Paint(Graphics g)
    {
    }

    void IHttpHandler.ProcessRequest(HttpContext context)
    {
        using (Bitmap bmp = new Bitmap(Width, Height))
        {
            using (Graphics g = Graphics.FromImage(bmp))
            {
                g.FillRectangle(
                    new SolidBrush(Color.White), 0, 0,
                        bmp.Width, bmp.Height);
                Paint(g); // our template method
                bmp.Save(context.Response.OutputStream,
                    ImageFormat.Jpeg);
            }
        }
    }

    bool IHttpHandler.IsReusable
    {
        get { return false; }
    }
}

public class MyChart : MyHttpHandler
{
    protected override void Paint(Graphics g)
    {
        g.DrawLine(new Pen(Color.Black), 0, 0, 100, 100);
    }
}
```

By using the template method pattern, we have eliminated one step that needed to occur every time the MyHttpHandler class was subclassed, as well as removed two superfluous items from the code (the Render event and the RenderEventHandler delegate).

Granted that design patterns are not always the easiest things to spot, they are very powerful once you do find and use them. For an excellent overview on design pattern implementations in C#, make sure and visit dofactory.com's [software design patterns][2] page. For additional studying, the [GoF book][3] is widely considered the holy grail of design patterns.

[1]:http://weblogs.asp.net/mschwarz/archive/2004/07/09/178709.aspx
[2]:http://www.dofactory.com/patterns/Patterns.aspx
[3]:http://www.amazon.com/exec/obidos/ASIN/0201633612/mattbertherco-20/102-1179687-5029737
