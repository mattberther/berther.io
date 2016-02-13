---
title: Date Validation in ASP.NET
disqus_identifier: 2005-01-date-validation-in-aspnet
comments: true
---

Ever have the need for a user to enter a date into a textbox, but not sure how to validate that they actually did?

``` html
<asp:CompareValidator id="dateValidator" runat="server"
  Type="Date" Operator="DataTypeCheck" ControlToValidate="dateTextbox"
  ErrorMessage="Please enter a valid date.">
</asp:CompareValidator>
```

This beats the heck out of writing my own code to do this, and surely this is better tested as well. ;)
