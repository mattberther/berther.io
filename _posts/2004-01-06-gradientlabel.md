---
title: GradientLabel
disqus_identifier: 2004-01-gradientlabel
comments: true
---

For a project that I'm working on, I wanted to display a dialog that had different header text. I found a really cool way to make this header stand out.

Introducing the GradientLabel...

``` csharp
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

public class GradientLabel : Label
{
  public class Colors
  {
    public readonly Color Start;
    public readonly Color Finish;

    public Colors(Color start, Color finish)
    {
	    this.Start = start;
	    this.Finish = finish;
    }
  }

  private readonly Colors colors;

  public GradientLabel()
  {
    this.colors = new Colors(SystemColors.Control, SystemColors.Window);
  }

  public GradientLabel(Colors colors)
  {
    this.colors = colors;
  }

  protected override void OnPaintBackground(PaintEventArgs pevent)
  {
    Rectangle paintRect = new Rectangle(0, 0, Width, Height);

    using (Brush b = new LinearGradientBrush(paintRect,
	    colors.Start, colors.Finish, LinearGradientMode.Horizontal))
    {
	    pevent.Graphics.FillRectangle(b, paintRect);
    }
  }
}
```
