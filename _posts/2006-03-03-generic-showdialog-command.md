---
title: Generic ShowDialog Command
disqus_identifier: 2006-03-generic-showdialog-command
comments: true
---

Recently, Ive been working on a WinForms application, built on top of the .NET 2.0 framework. Ive been able to dabble with generics in the past, but only recently am starting to realize how powerful they can be in creating a loosely coupled system.

Take for example the task of newing up a Form and showing a dialog. How many times do we write this type of code:

``` csharp
private void menuItem_Clicked(object sender, EventArgs e)
{
    using (MyDialog dlg = new MyDialog())
    {
        dlg.ShowDialog();
    }
}
```

Recently, Ive explored putting a wrapper around the menu/toolbar portions of this application, which utilize the [Command pattern][1] to enable reuse of functionality between toolbars and menu components. As part of that, I came up with this little gem:

``` csharp
public interface ICommand
{
    void Execute();
}

public class ShowDialogCommand<T> : ICommand where T : System.Windows.Forms.Form, new()
{
    private readonly IWin32Window owner;

    public ShowDialogCommand()
    {
    }

    public ShowDialogCommand(IWin32Window owner)
    {
        this.owner = owner;
    }

    public void Execute()
    {
        using (T form = new T())
        {
            if (owner != null)
                form.ShowDialog(owner);
            else
                form.ShowDialog();
        }
    }
}
```

So, now in my main form, I now able to do something like this:

``` csharp
ICommand aboutCommand = new ShowDialogCommand<AboutBox>();
menuManager.AddMenu("Help", "About", aboutCommand);
toolbarManager.AddButton(Images.About, aboutCommand);
```

[1]:http://www.dofactory.com/Patterns/PatternCommand.aspx
