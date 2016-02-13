---
title: A useful Session object wrapper
disqus_identifier: 2004-07-a-useful-session-object-wrapper
comments: true
---

There are always two things I do when creating a new ASP.NET project. The first is to create a base class for all of my pages to inherit. This is fairly straightforward, and makes quite a bit of sense in that you can centralize your error handling (overriding OnError), among other things.

The second thing that I do is add the following SessionManager class:

``` csharp
using System.Web;

[Serializable]
public class SessionManager
{
    private const string SESSION_MANAGER = "SESSION_MANAGER";

    private SessionManager()
    {
    }

    public static SessionManager Instance
    {
        get
        {
            HttpContext context = HttpContext.Current;
            SessionManager manager =
                context.Session[SESSION_MANAGER] as SessionManager;

            if (manager == null)
            {
                manager = new SessionManager();
                context.Session[SESSION_MANAGER] = manager;
            }

            return manager;
        }
    }
}
```

Now, whenever I feel I need to add something to the Session state, I simply add a property get/set or field to this class.

The great thing about this method is that it is an easy way to remove yourself from the "Magic Constant" syndrome, where you have to remember the exact name (and case) of the variables you've stored in Session. Session variable access is now provided via strongly typed mechanism.

Now that I have this class, I typically add a protected get accessor to my base class so that derived pages can reference it with SessionManager.SomeVariable instead of SessionManager.Instance.SomeVariable. This is purely aesthetic though, you may want to do this differently.

Lastly, I want to mention that this idea is not mine, however, it's been so long since I saw the original implementation that I forget where it came from. If you are or know the author, please drop me a line, so that I can make sure to give proper credit.
