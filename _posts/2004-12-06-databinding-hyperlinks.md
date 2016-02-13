---
title: DataBinding HyperLinks
disqus_identifier: 2004-12-databinding-hyperlinks
comments: true
---

Sometimes, it may be desirable for you to create dynamic HyperLinks in your markup files. For whatever reason, you may not want to create the link for the hyperlink in code behind. Maybe you want to tweak it later without recompiling.

However, if you just try to put `<% %>` tags into your NavigateURL property, you'll notice that it takes that text literally, instead of parsing it prior to calling ResolveUrl.

There is a way around this though, using DataBinder and a little known naming container called Page. Most of the times the syntax you'll see for DataBinder.Eval looks something like `DataBinder.Eval(Container.DataItem, "SomeProperty")`. This works great when you're using a DataList, DataGrid or Repeater.

To solve our problem though we're going to use this syntax:

``` html
<asp:HyperLink id="link" runat="server"
  NavigateUrl='<%# DataBinder.Eval(Page, "SomeProperty", "newpage.aspx?prop={0}") %>'>Click Me
</asp:HyperLink>
```

Now, the only thing that we have to do in our codebehind is set the control up to use data binding. In this case, it's as simple as adding a line that says `link.DataBind();`. Make sure that your code-behind also has a property named the same as the second parameter to the DataBinder.Eval method and you should be ready to go.

It's also worth mentioned that you can still use the ~ operator in your format expression (ie: "~/newpage.aspx?prop={0}").
