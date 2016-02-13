---
title: Implementing an ASP.NET Validator
disqus_identifier: 2004-01-implementing-an-aspnet-validator
comments: true
---

For a project that I am working on, we are allowing users to enter a URI into ASP.NET TextBox controls. As I was implementing this, I thought that this would be a wonderful idea for a control.

I have written a thorough article that talks about the steps I went through to get this control ready for use, including supporting selected Uri schemes. Towards the end of the article, you will find a link to download this component for your own use if you so desire.

With ASP.NET, we were introduced to validators. In the most simplistic explanation, validators are used to verify that the information in a given control matches the values you are expecting.

All ASP.NET validators are derived from the abstract BaseValidator class, which provides a single abstract method (EvaluateIsValid) that we will need to implement.

ASP.NET includes several built-in controls, including:

* RequiredFieldValidator -- Makes the associated input control a required field.
* CustomValidator -- Performs user-defined validation on an input control.
* RegularExpressionValidator -- Validates whether the value of an associated input control matches the pattern specified by a regular expression.
* CompareValidator -- Compares the value entered by the user into an input control with the value entered into another input control or a constant value.
* RangeValidator -- Checks whether the value of an input control is within a specified range of values.

These validators are very well documented in the MSDN library, and I will not go into the details of these here.

For this article, we will walk through the process of creating a simple validator to verify that a value entered into a TextBox control is a valid Uri.

The process of accomplishing this is fairly basic. By deriving from the BaseValidator class, we inherit all of the functionality of the ASP.NET validators, and we simply need to provide our own implementation to determine whether or not the input is valid.

To do this, we will declare our class like this:

``` csharp
public class UriValidator : BaseValidator
{
    protected override bool EvaluateIsValid()
    {
        TextBox textbox = FindControl(this.ControlToValidate) as TextBox;

        if (textbox != null)
        {
            try
            {
                Uri uri = new Uri(textbox.Text);
                return true;
            }
            catch (UriFormatException)
            {
                return false;
            }
        }

        return false;
    }
}
```

What we are doing here is finding the TextBox control that we want to validate, and then attempt to assign the Text property to a new Uri instance. If the Text property is not a valid Uri, then this throws a UriFormatException, which in  turn causes our validator to return false.

Next, the BaseValidator class offers a virtual method called ControlPropertiesValid, which will allow us to validate that the ControlToValidate matches a specific type. In our case, we only want to validate TextBox controls, so we will add the following method to our UriValidator class.

``` csharp
protected override bool ControlPropertiesValid()
{
    Control ctrl = FindControl(this.ControlToValidate) as TextBox;
    return ctrl != null;
}
```

At this point, we have a fully functional validator, which will support any type of Uri that is submitted. However, we may run across the case where we want to limit the scheme of the Uri. To accomplish this, let's create a new enum, which will correspond to the available Uri schemes.

The code will look something like this:

``` csharp
[
Flags(),
Serializable()
]
public enum UriScheme
{
    File = 0x0001,
    Ftp = 0x0002,
    Gopher = 0x0004,
    Http = 0x0008,
    Https = 0x0010,
    Mailto = 0x0020,
    News = 0x0040,
    Nntp = 0x0080,
    All = UriScheme.File | UriScheme.Ftp |
        UriScheme.Gopher | UriScheme.Http | UriScheme.Https |
        UriScheme.Mailto | UriScheme.News | UriScheme.Nntp
}
```

Notice that we have marked our enum with the FlagsAttribute. This is necessary so that we can assign a bitwise mask of values. For example: UriScheme.Http | UriScheme.Https to only allow the Http and Https schemes to validate.

Now that we have our enum set up, we will want to create a property that we can access via code or designer to set the Uri schemes that we wish to accept.

Let's add this property accessor to our UriValidator class:

``` csharp
[
Category("Behavior"),
Description("Gets or sets a value indicating which Uri schemes will be accepted."),
DefaultValue("All")
]
public string AcceptedSchemes
{
    get
    {
        object savedState = this.ViewState["AcceptedSchemes"];
        if (savedState != null)
        {
            return ((UriScheme)savedState).ToString();
        }
        return UriScheme.All.ToString();
    }
    set
    {
        this.ViewState["AcceptedSchemes"] = (UriScheme)Enum.Parse(
            typeof(UriScheme), value, false);
    }
}
```

We have specified this property as a string so that the user can enter these into the designer property grid as a comma-delimited list of values (ie: Http, Https, Mailto), which still allowing the users to use the  enumeration in code (ie: AcceptedSchemes = UriScheme.Http | UriScheme.Https | UriScheme.Mailto).

We have also specified that this property live in viewstate so that the value will be persisted across postbacks.

Now that we have support for accepted schemes, we will need to modify the EvaluateIsValid method to also validate that a supported scheme is contained in the input value.

To do this, let's slightly modify the method and add a helper method to assist us in validating the scheme.

``` csharp
protected override bool EvaluateIsValid()
{
    TextBox textbox = FindControl(
        this.ControlToValidate) as TextBox;

    if (textbox != null)
    {
        try
        {
            Uri uri = new Uri(textbox.Text);
            return IsValidScheme(uri.Scheme);
        }
        catch (UriFormatException)
        {
            return false;
        }
    }

    return false;
}

private bool IsValidScheme(string scheme)
{
    if (this.AcceptedSchemes.IndexOf("All") != -1)
    {
      return true;
    }

    if (scheme ==  Uri.UriSchemeFile)
    {
  	  return this.AcceptedSchemes.IndexOf("File") != -1;
    }
    else if (scheme == Uri.UriSchemeFtp)
    {
      return this.AcceptedSchemes.IndexOf("Ftp") != -1;
    }
    else if (scheme == Uri.UriSchemeGopher)
    {
      return this.AcceptedSchemes.IndexOf("Gopher") != -1;
    }
    else if (scheme == Uri.UriSchemeHttp)
    {
      return this.AcceptedSchemes.IndexOf("Http") != -1;
    }
    else if (scheme == Uri.UriSchemeHttps)
    {
      return this.AcceptedSchemes.IndexOf("Https") != -1;
    }
    else if (scheme == Uri.UriSchemeMailto)
    {
      return this.AcceptedSchemes.IndexOf("Mailto") != -1;
    }
    else if (scheme == Uri.UriSchemeNews)
    {
      return this.AcceptedSchemes.IndexOf("News") != -1;
    }
    else if (scheme == Uri.UriSchemeNntp)
    {
      return this.AcceptedSchemes.IndexOf("Nntp") != -1;
    }
    else
    {
      return false;
    }
}
```

With this, we have completed our validator and are ready to drop this onto a webform to make sure everything works.

In it's most simplest form, this control can be used like this:

``` html
<html>
    <body>
      <form runat="server" ID="Form1">
   	    <h3>UriValidator</h3>

        <asp :TextBox id="textbox"
            runat="server"></asp>

        <mb:UriValidator id="urlValidator"
            runat="server" AcceptedSchemes="Http, Https"
            ControlToValidate="textbox"
            ErrorMessage="The Uri entered is an incorrect format."/>

        <asp :Button id="button" runat="server"
            Text="Submit"></asp>
	    </form>
    </body>
</html>
```

When you run this project, you can test that this is working by entering http://www.mattberther.com into the textbox. You will see that no validation errors are occurring. However, if you change the textbox value to Foo, you will notice that you get an error, because 'Foo' is not a valid Uri.

Now, one final test to validate that our scheme processing is working. Enter ftp://ftp.microsoft.com into the textbox, and click the button. Again, you will see that it fails, because our accepted schemes do not include ftp. Success!

This code has been documented using the /// documentation syntax. I prefer to use NDoc, which can be found at [SourceForge][1], as my documentation generator.

**Update:** This project is now being hosted at [github][2].

Your feedback is important to me and I am always willing to make improvements. If you found this article useful or have any other thoughts, please let me know.

Lastly, I have also submitted this article to [CodeProject][3], so if you do find it useful, go ahead and jump over there and give me a vote.

[1]:http://ndoc.sourceforge.net
[2]:http://github.com/mattberther/uri-validator
[3]:http://www.codeproject.com/aspnet/UriValidator.asp
