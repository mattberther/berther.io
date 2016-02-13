---
title: The beauty of the Chain of Responsibility pattern
disqus_identifier: 2007-04-the-beauty-of-the-chain-of-responsibility-pattern
comments: true
---

As mentioned in a previous post, I've been starting to do more and more work with Castle Project's MonoRail. Most recently, I did some maintenance on a project that I did with a much earlier version of MonoRail.

This project had a base controller that looked something like this:

``` csharp
[Layout("HtmlPage")]
[Rescue("Error")]
public class AbstractPageController : SmartDispatcherController
{
    protected override bool PerformRescue(MethodInfo method, Exception ex)
    {
        ILog log = LogManager.GetLog(this.GetType());
        log.Error(ex);
        return base.PerformRescue(method, ex);
    }
}
```

Some people may look at this and wonder why exception handling is part of the Controller implementation, clearly violating the Single Responsibility Principle. Hammett and the other folks working on Castle must have thought the same thing. When I upgraded to the latest trunk version of MonoRail, I saw that this code failed to compile.

I looked at the support site for MonoRail and found that they had instead implemented an exception handling extension for MonoRail which would do exactly what I was previously doing in the controller.

Hooking this up was very simple and provided for a much more elegant exception handling. Check this out:

In the web.config, I registered an extension and provided the configuration for the ExceptionChainingExtension:

``` xml
<monoRail>
    <!-- other config omitted for brevity -->
    <extensions>
      <extension type="Castle.MonoRail.Framework.Extensions.ExceptionChaining.ExceptionChainingExtension, Castle.MonoRail.Framework" />
    </extensions>

    <exception>
      <exceptionHandler type="LoggingExceptionHandler, MyAssembly" />
    </exception>

    <!-- since I'm planning on logging exceptions, I'll register a log implementation -->
    <services>
      <service id="Custom" type="Castle.Services.Logging.Log4netIntegration.Log4netFactory, Castle.Services.Logging.Log4netIntegration" interface="Castle.Core.Logging.ILoggerFactory, Castle.Core" />
    </services>
</monoRail>
```

Then, I created the LoggingExceptionHandler class, which looks like this:

``` csharp
public class LoggingExceptionHandler : AbstractExceptionHandler
{
	public override void Process(IRailsEngineContext context)
	{
		ILoggerFactory factory = (ILoggerFactory)context.GetService(typeof (ILoggerFactory));
		ILogger logger = factory.Create(context.CurrentController.GetType());

		logger.Error(BuildStandardMessage(context));
		InvokeNext(context);
	}
}
```

This is fairly straightforward. The only thing that you might wonder about is the InvokeNext call. If you wire up more exceptions in the configuration file (exceptionHandler nodes under the exception element), then this call delegates to the next handler in line.

Let me illustrate this point a little better...

Part of the update of the application involved adding SecurityPermissions to some of the methods on the controllers, and what happens is that every time a method is activated without appropriate permissions, a SecurityException is thrown. This is turn was handled by the LoggingExceptionHandler, which would then log it out to the logger. This was clearly not desired behaviour.

I could have solved this two ways... first, I could have added an if statement in the LoggingExceptionHandler and stop execution if it was a SecurityException. This is a violation of the single responsibility principle. The LoggingExceptionHandler should log an exception, period. Nothing else.

So, the other way to handle this is with an ExceptionFilter... which is just another item in the ExceptionChainingExtension.

In my web.config, I modified the exception node to look like this:

``` xml
<exception>
  <exceptionHandler type="ExceptionFilter, MyAssembly">
    <exclude type="System.Security.SecurityException, mscorlib" />
  </exceptionHandler>
  <exceptionHandler type="LoggingExceptionHandler, MyAssembly" />
</exception>
```

and implemented an ExceptionFilter class, which looks like this:

``` csharp
public class ExceptionFilter : AbstractExceptionHandler, IConfigurableHandler
{
	private List<Type> excludedTypes = new List<Type>();

	public void Configure(XmlNode exceptionHandlerNode)
	{
		XmlNodeList excludeNodes = exceptionHandlerNode.SelectNodes("exclude");
		foreach (XmlNode excludeNode in excludeNodes)
		{
			string excludedType = excludeNode.Attributes["type"].Value;
			excludedTypes.Add(Type.GetType(excludedType));
		}
	}

	public override void Process(IRailsEngineContext context)
	{
		Exception ex = context.LastException is TargetInvocationException
						? context.LastException.InnerException
						: context.LastException;
		if (!excludedTypes.Contains(ex.GetType()))
		{
			InvokeNext(context);
		}
	}
}
```

What happens here is that any time an exception occurs, the first node in the exception handler chain is hit. This happens to be this ExceptionFilter class. It reads which exceptions should not go further down the chain from the configuration section. If the exception is not in the list of excluded types, it invokes the next item in the chain.

This type of programming (creating loosely coupled, highly cohesive objects) makes writing and extending code a breeze. Instead of changing existing tested code to filter the exceptions, I'm able to add new code. I think we can all agree that writing new code is better than mucking with existing code.
