---
title: "Code: TextRotator"
disqus_identifier: 2003-12-code-textrotator
comments: true
---

Recently, I had a need for a label to rotate through text, showing each item for a specific amount of time. Surprisingly enough, this was not very hard to create.

I'm posting the code here in hopes that someone else might find it useful.

``` csharp
using System;

using System.ComponentModel;
using System.Windows.Forms;

namespace MattBerther.UserInterface
{
    public class TextRotator : Label
    {
      private Timer timer;
      private string[] items;
      private int currentIndex;

      public TextRotator()
      {
          this.items = new string[0];
          this.timer = new Timer();
          this.timer.Interval = 2500;
          this.currentIndex = -1;
      }

      public int Interval
      {
          get { return this.timer.Interval; }
          set { this.timer.Interval = value; }
      }

      [DesignerSerializationVisibility(DesignerSerializationVisibility.Visible)]
      public string[] Items
      {
          get { return this.items; }
          set { this.items = value; }
      }

      public void Start()
      {
          this.timer.Enabled = true;
          this.timer.Tick += new EventHandler(timer_Tick);
      }

      public void Stop()
      {
          this.timer.Enabled = false;
          this.timer.Tick -= new EventHandler(timer_Tick);
      }

      private void timer_Tick(object sender, EventArgs e)
      {
          if (currentIndex < items.Length - 1)
          {
              currentIndex++;
          }
          else
          {
        currentIndex = 0;
          }

          this.Text = this.items[currentIndex];
          this.Invalidate();
      }
    }
}
```

The code should be fairly self-explanatory, however, if you need some help getting this to work, please feel free to drop me a line.
