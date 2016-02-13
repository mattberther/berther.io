---
title: My first MonoRail ViewComponent
disqus_identifier: 2007-03-my-first-monorail-viewcomponent
comments: true
---

For those of you who have not heard of or are using MonoRail yet, go take a look at the [project website][1], or even better, go listen to Scott Hanselman's [podcast with the boys from Eleutian Technologies][2] where they discuss MonoRail and the advantages it provides. I'm going to stop short of this turning into another ASP.NET WebForms sucks post. :)

What I do want to do is provide what I think is a useful ViewComponent. Honestly, the first one I wrote, but one that I find myself using quite a bit. It's fairly simple in it's functionality and what it provides. Essentially, it's just a Log In / Log Out toggle.

I found myself writing something like this over and over, and decided it would be best to write it once more as a component, and then just to reuse this component wherever I need the functionality in the future.

The use of the view is fairly straightforward in that you just declare the component, and then specify two sections. The first is what should be displayed when you need to log in, and the other is what should be displayed when you can log out.

For example:

``` html
<span class="menuitem">
#blockcomponent(LoginComponent)
  #login
    $HtmlHelper.LinkTo("Log In", "Login", "Index")
  #end
  #logout
    $HtmlHelper.LinkTo("Log Out", "Login", "Logout")
  #end
#end
</span>
```

The component code is straightforward enough:

``` csharp
public class LoginComponent : ViewComponent
{
    private bool isLoggedIn;

    public override void Initialize()
    {
        base.Initialize();

        if (!Context.HasSection("login"))
        {
            throw new RailsException("LoginComponent: Must have a login section defined");
        }

        if (!Context.HasSection("logout"))
        {
            throw new RailsException("LoginComponent: Must have a logout section defined");
        }

        isLoggedIn = RailsContext.CurrentUser.Identity.IsAuthenticated;
    }

    public override void Render()
    {
        if (isLoggedIn)
        {
            Context.RenderSection("logout");
        }
        else
        {
            Context.RenderSection("login");
        }
    }


    public override bool SupportsSection(string name)
    {
        return name == "login" || name == "logout";
    }
}
```

[1]:http://www.castleproject.org/monorail
[2]:http://www.hanselminutes.com/default.aspx?showID=71
