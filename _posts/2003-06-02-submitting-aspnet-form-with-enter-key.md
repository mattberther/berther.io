---
title: Submitting ASP.NET form with ENTER key
disqus_identifier: 2003-06-submitting-aspnet-form-with-enter-key
comments: true
---

For the last few hours, I've been trying to figure out why my event handler is not being hooked up when I hit the ENTER key to submit my ASP.NET form.

As it turns out, this is a bug with ASP.NET. If you're not aware of this, the work around is to insert an invisible *HTML* textbox (an asp:TextBox wont work).

Add this line somewhere on the page:

``` html
<input type="text" style="display:none"/>
```

and all will work as expected.
