---
title: Dealing with magic constants in ASP.NET
disqus_identifier: 2004-12-dealing-with-magic-constants-in-aspnet
comments: true
---

David has posted a great little tip about [parsing page parameters][1] using ASP.NET. This is a very basic example of the [Pull Up Method][2] refactoring. The important thing to take away from this example is how David has managed to eliminate code duplication using this refactoring.

David is sharing some of his favorite ASP.NET tips over on his blog, so make sure you stay tuned [over there][3]. Going along with that, Id like to share one of mine.

Sometimes the [last configuration section handler I'll ever need][4] is just plain overkill. Sometimes, its easier to just throw a couple items in the appSettings element and be done with it.

``` xml
<configuration>
    <appSettings>
        <add key="myApp.ConnectionString" value="myConnectionString" />
    </appSettings>
</configuration>
```

Add `ConfigurationSettings.AppSettings["myApp.ConnectionString"]` wherever you need access to the connection string, and you're off. Or are you?

One thing that I'm sure everyone agrees is bad is using magic number constants. Equally evil, though not as oft mentioned, are magic string constants.

Given the above example, what happens when you change the name of myApp.ConnectionString to connectionString? You have to manually (or using your favorite grep tool), go through and identify each place that this constant is used. Talk about an accident waiting to happen.

How about a static Configuration class to wrap these calls for you?

``` csharp
class Configuration
{
  public static string ConnectionString
  {
    get
    {
	    return ConfigurationSettings.AppSettings["myApp.ConnectionString"];
    }
  }
}
```

Now, throughout your code, you reference the connection string with `Configuration.ConnectionString`, and should you want to change the name of your setting, you are only changing it in one spot (the Configuration class).

A very handy technique, and one that I adapt slightly to deal with query string parameters as well. How often have you seen a method riddled with lines like: `Request.QueryString["foo"]`

Every page that I work on that has query string input, gets a protected get accessor for that item:

``` csharp
protected string Foo
{
  get { return Request.QueryString["foo"]; }
}
```

Again, the same principle applies here. If I change the name of the querystring parameter, I only change it once, instead of relying on a find/replace to do it correctly.

As we come full circle here, we can combine this technique with David's to get something like:

``` csharp
class MyPageBase : System.Web.UI.Page
{
  protected string ParseRequiredParam(string paramName)
  {
    string value = Request.Params[paramName];
    if (value == null || value.Length == 0)
	    throw new ArgumentNullException(paramName, "Parameter is required.");

    return value;
  }
}

class MyPage : MyPageBase
{
  protected string Foo
  {
    get { return ParseRequiredParam("foo"); }
  }
}
```

At this point, we now have access to all of our query string parameters. The benefits:

* These will be validated for null and length on access, rather than when the page loads.
* We've also done a [Self Encapsulate Field][5] refactoring on David's original code base, and we no longer have the module level variables.
* We've declared the accessor as protected, so our markup file (*.as?x) can also access the variable if needed.

Not bad benefits for a bit of defensive coding...

[1]:http://www.elegantcode.com/dottextweb/archive/2004/12/03/364.aspx
[2]:http://www.refactoring.com/catalog/pullUpMethod.html
[3]:http://www.elegantcode.com/
[4]:/2003/04/05/the-last-configuration-section-handler-ill-ever-need/
[5]:http://www.refactoring.com/catalog/selfEncapsulateField.html
