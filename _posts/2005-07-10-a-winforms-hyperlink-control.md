---
title: A WinForms HyperLink control
disqus_identifier: 2005-07-a-winforms-hyperlink-control
comments: true
---

For a little project Im working on, I wanted to simulate a HyperLink control on a webform. I came up with the following control, which you may find useful.

Of course, there can be additional properties added to control your MouseOver and MouseOut colors, but Ill leave that as an excercise to the reader. The control as it sits covers my needs. :)

``` csharp
public class HyperLink : System.Windows.Forms.Label
{
    private string navigateUrl;

    public HyperLink()
    {
        this.Cursor = Cursors.Hand;
        this.ForeColor = Color.Blue;
    }

    public override string Text
    {
        get { return base.Text; }
        set
        {
            base.Text = value;
            Size = new Size(PreferredWidth, PreferredHeight);
        }
    }

    public virtual string NavigateUrl
    {
        get { return navigateUrl; }
        set { navigateUrl = value; }
    }

    protected override void OnMouseEnter(EventArgs e)
    {
        this.ForeColor = Color.Red;
        base.OnMouseEnter (e);
    }

    protected override void OnMouseLeave(EventArgs e)
    {
        this.ForeColor = Color.Blue;
        base.OnMouseLeave(e);
    }

    protected override void OnMouseDown(MouseEventArgs e)
    {
        if (e.Button == MouseButtons.Left &amp;&amp; e.Clicks == 1)
        {
            System.Diagnostics.Process.Start(navigateUrl);
        }

        base.OnMouseDown (e);
    }
}
```
