---
title: ThreadExceptionDialog
disqus_identifier: 2006-06-threadexceptiondialog
comments: true
---

For quite some time I've been looking for a way to get a nice exception dialog worked into several applications that I've developed. I saw that the .NET framework had a real nice one that did not bombarded the user with tons of useless information (such as a stack trace) although it was available if needed.

Unbeknownst to me until late Friday afternoon, this dialog is actually a class in the .NET framework. It's called [ThreadExceptionDialog] and in its constructor takes an exception.

I've hooked this up into my application like this:

``` csharp
public static void Main(string[] args)
{
    Application.ThreadException += new ThreadExceptionEventHandler(Application_ThreadException);
    Application.Run(new Form1());
}

public static void Application_ThreadException(object sender, ThreadExceptionEventArgs e)
{
    using (ThreadExceptionDialog dlg = new ThreadExceptionDialog(ex))
    {
        dlg.ShowDialog();
    }
}
```

[1]:http://msdn2.microsoft.com/en-us/library/system.windows.forms.threadexceptiondialog.aspx
