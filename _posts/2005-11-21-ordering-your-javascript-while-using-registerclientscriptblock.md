---
title: Ordering your javascript while using RegisterClientScriptBlock
disqus_identifier: 2005-11-ordering-your-javascript-while-using-registerclientscriptblock
comments: true
---

Earlier today I stumbled across an interesting issue while using Page.RegisterClientScriptBlock to register some javascript to be output to the browser. The order of output was very important, because one of the scripts depended on a previous script being registered.

Everything worked great, except for one page. It seems like it's always that way, doesnt it? No matter what I did, this javascript would be output in a different order than I registered them.

After digging into this for quite some time, I finally decided to break open Reflector. By the way, have I ever told you that this is the coolest tool ever? After investigating the Page class (specifically RegisterClientScriptBlock), I quickly saw what the problem was.

RegisterClientScriptBlock calls a private method called RegisterScriptBlock, which takes an IDictionary as a parameter. If the IDictionary is null, RegisterScriptBlock initializes it to a new HybridDictionary. HybridDictionary starts as a ListDictionary, which is an IDictionary implemented using a singly linked list. However, once HybridDictionary gets to be over 9 elements, it switches over to a Hashtable.

Where this is going is that once you switch to a Hashtable, you lose all the ordering benefits of ListDictionary. Clearly this is whats causing my problem. :)

My application has a common base class, so it seemed logical to override some methods to achieve the desired functionality. The easiest solution would have been to override RegisterScriptBlock in a Page derived class to use a ListDictionary, but alas, RegisterScriptBlock is private. No luck there...

This is what I came up with...

``` csharp
public class MyBasePage : System.Web.UI.Page
{
    private IDictionary scriptBlocks = new ListDictionary();

    public override void RegisterClientScriptBlock(string key, string script)
    {
        if (!scriptBlocks.Contains(key))
        {
            scriptBlocks.Add(key, script);
        }
    }

    public override void Render(System.Web.UI.HtmlTextWriter writer)
    {
        StringBuilder sb = new StringBuilder();

        foreach (string scriptBlock in scriptBlocks.Values)
        {
            sb.Append(scriptBlock);
            sb.Append("\r\n");
        }

        base.RegisterClientScriptBlock("completeScript", sb.ToString());
        base.Render(writer);
    }
}
```

It should be fairly apparent what this code does. I really like this approach, because none of the calling code has to change to fix this issue. All 3rd party components will work with this implementation, since all calls are still to RegisterClientScriptBlock.

One thing about this that still needs to be addressed though is the IsClientScriptBlockRegistered method. Microsoft, for some inexplicable reason, has decided to make RegisterClientScriptBlock virtual allowing you to override its implementation (like we have done by providing a new storage mechanism). However, it did not make IsClientScriptBlockRegistered virtual. So, while we have a new data store for our script blocks, a call to IsClientScriptBlockRegistered will return false.

To fix this, you can do this...

``` csharp
public new bool IsClientScriptBlockRegistered(string key)
{
    return scriptBlocks.Contains(key);
}
```

Im not sure I like this, because this means that the new method is available only when the object is cast to the type the method is specified in.
