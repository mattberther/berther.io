---
title: An auto complete combo box implementation
disqus_identifier: 2003-04-an-auto-complete-combo-box-implementation
comments: true
---

Continuing on my previously stated goal of giving back to the development community from which I have received so much, I have submitted another article to [codeproject.com][1].

The [article][2] details an implementation of an auto complete combo box in C#. Chris Maunder provided a starting point with his article about creation of a similar control in MFC. I had the requirements of using completely managed code, hence the creation of this C# version.

An addition that I made to my code was firing of a CancelEventHandler in the case that the LimitToList property is set to true. This allows the developer to perform some functions if the user enters some text that is not consistent with the list of items for the combobox.

``` csharp
using System;
using System.Windows.Forms;
using System.ComponentModel;

namespace MattBerther.Controls
{
    public class AutoCompleteComboBox : System.Windows.Forms.ComboBox
    {
        public event System.ComponentModel.CancelEventHandler NotInList;

        private bool _limitToList = true;
        private bool _inEditMode = false;

        public AutoCompleteComboBox() : base()
        {
        }

        [Category("Behavior")]
        public bool LimitToList
        {
            get { return _limitToList; }
            set { _limitToList = value; }
        }

        protected virtual void OnNotInList(System.ComponentModel.CancelEventArgs e)
        {
            if (NotInList != null)
            {
                NotInList(this, e);
            }
        }

        protected override void OnTextChanged(System.EventArgs e)
        {
            if (_inEditMode)
            {
                string input = Text;
                int index = FindString(input);

                if (index &gt;= 0)
                {
                    _inEditMode = false;
                    SelectedIndex = index;
                    _inEditMode = true;
                    Select(input.Length, Text.Length);
                }
            }

            base.OnTextChanged(e);
        }

        protected override void OnValidating(System.ComponentModel.CancelEventArgs e)
        {
            if (this.LimitToList)
            {
                int pos = this.FindStringExact(this.Text);

                if (pos == -1)
                {
                    OnNotInList(e);
                }
                else
                {
                    this.SelectedIndex = pos;
                }
            }

            base.OnValidating(e);
        }

        protected override void OnKeyDown(System.Windows.Forms.KeyEventArgs e)
        {
            _inEditMode = (e.KeyCode != Keys.Back &amp;&amp; e.KeyCode != Keys.Delete);
            base.OnKeyDown(e);
        }
    }
}
```

[1]:http://www.codeproject.com
[2]:http://www.codeproject.com/cs/combobox/csautocomplete.asp
