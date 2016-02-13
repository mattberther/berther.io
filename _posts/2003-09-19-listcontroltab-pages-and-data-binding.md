---
title: ListControl/Tab Pages and data binding
disqus_identifier: 2003-09-listcontroltab-pages-and-data-binding
comments: true
---

I've been helping a user on [codeproject.com][1] to try and get my [autocomplete combo box][2] code running in tab pages for him (using data binding).

He was setting SelectedIndex = -1 (to flag the fields as unmodified) on both controls in his form's OnLoad. We were noticing that the first tab page worked fine, however, when you place the control on the second tab page, it would reset SelectedIndex to 0.

According to [this article][3] at MSDN, this is expected behaviour, as the TabControl fires ListControl.OnBindingContextChanged when the tab page is switched.

Using .NET Reflector, I examined what happens in that method and realized that the data connection gets reset.

Fixing this problem was as simple as overriding OnBindingContextChanged to do one of the following two things:

``` csharp
class TabPageComboBox : MattBerther.Controls.AutoCompleteComboBox
{
    protected override void OnBindingContextChanged(EventArgs e)
    {
        // Do nothing
    }
}
```

or

``` csharp
class TabPageComboBox : MattBerther.Controls.AutoCompleteComboBox
{
    protected override void OnBindingContextChanged(EventArgs e)
    {
        if (this.SelectedIndex != -1)
        {
            base.OnBindingContextChanged(e);
        }
    }
}
```

Hopefully this solution can help someone else out, as Im now sure that this was the problem that I had been fighting for quite some time when I finally decided to bag data binding.

[1]:http://www.codeproject.com
[2]:/2003/04/15/an-auto-complete-combo-box-implementation/
[3]:http://support.microsoft.com/default.aspx?scid=kb%3Ben-us%3B820633
