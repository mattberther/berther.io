---
title: Creating a Service Layer with an STA COM Component
disqus_identifier: 2007-03-creating-a-service-layer-with-an-sta-com-component
comments: true
---

When you interop with a COM component, you may need to use the AspCompat attribute if the component has to run on a thread initialized into a single threaded apartment (STA). The question comes up: how do we know if the component needs to run in an STA?

K. Scott Allen (of odetocode.com) has [provided a technique][1] which can be used to determine whether you need to provide this attribute or not. Essentially, we need to dig around the HKCR section of the registry and find the component's CLSID entry. Once you find that, you will find an InprocServer32 key, which holds the ThreadingModel value. If the ThreadingModel value is set to Apartment, you need to use the AspCompat attribute.

Now, if you're designing service layers, and the service happens to use a COM component, how do you add an AspCompat attribute to a web service (.asmx)? In short, you will need to create a new HttpHandler to process requests for the web service. The new handler will inherit from System.Web.UI.Page and will have access to initializing the request using the AspCompat subsystem.

The class looks like this:

``` csharp
public class AspCompatWebServiceHandler : Page, IHttpAsyncHandler, IRequireSessionState
{
     public IAsyncResult BeginProcessRequest(HttpContext context, AsyncCallback callback, object extraData)
     {
         return AspCompatBeginProcessRequest(context, callback, extraData);
     }

     public void EndProcessRequest(IAsyncResult result)
     {
         AspCompatEndProcessRequest(result);
     }

     protected override void OnInit(EventArgs e)
     {
         WebServiceHandlerFactory factory = new WebServiceHandlerFactory();
         IHttpHandler handler = factory.GetHandler(this.Context, this.Context.Request.HttpMethod, this.Context,Request.FilePath, this.Context.Request.PhysicalPath);
         handler.ProcessRequest(this.Context);
         this.Context.ApplicationInstance.CompleteRequest();
     }
}
```

After adding this class to your project, you'll need to register the handler in the web.config file using something like:

``` xml
<system.web>
     <httpHandlers>
         <add verb="*" path="ServicePath.asmx" type="MyNamespace.AspCompatWebServiceHandler, MyAssembly" />
     </httpHandlers>
</system.web>
```

If you're seeing funky issues when using a COM component (in a service layer or not), you will want to investigate whether the threading model is becoming an issue. The difference in implementing this handler has made a night/day difference in our application's performance and memory usage.

This is certainly one of the things that makes the ASP.NET framework great... the ability to drop in new functionality if you have a need to.

[1]:http://odetocode.com/Blogs/scott/archive/2006/09/20/6846.aspx
