---
title: Databinding is the devil
disqus_identifier: 2003-06-databinding-is-the-devil
comments: true
---

So, I've completely rewritten a project that i'm working on... The reason, you ask? Data binding is the devil...

I was greatly fascinated by its promises of being able to have a data entry UI without writing any code. Wow! This is cool. No more need to track dirty state. No need to write a bunch of code to get the values out of controls. Life is good!

Then I went to implement it... At first blush, everything seemed to work really well. Then the sporadic bugs started to appear. A control value was being pushed here, context was lost there, etc...

There are a lot of things to getting custom controls to work with databinding. The biggest one is that they require an OnValidating event to be raised up. This is just ridiculous. If I have a composite control with 5 textboxes on it and a combobox, I have to hook up to the validating event on each of these, and then call my custom control's OnValidating method.

Hrmmm... Let's look at this... Isn't the control dirty as soon as the user changes the contents of that control? Why then is it required to hook up the Validating event? What this says is that a control's value cant be updated to the dataset until after you've tabbed off the control. This may not be so bad, you think, until you start having to write code like this:

``` csharp
private void toolbar_ButtonClick(object sender, ToolBarButtonClickEventArgs e)
{
    toolbar.Focus();
    //
}
```

This is required, since clicking on a toolbar button does not give it focus. Since I had a save button on my toolbar, every time I clicked save, I was running into the last edited value was not being persisted to the underlying data store.

A few other gripes that I have:


* Why would the framework allow a call to CurrencyManager.AddNew to silently error when you've bound to a DateTimePicker or CheckBox that allows null values? (FYI: The work around is to set a default value on your column, via dataset annotations or editing of the generated code file.)
* Why can't you set the SelectedIndex property of a databound combobox to -1? I have tried variations of this, such as SelectedValue, to no avail.
* What exactly is CurrencyManager for? Everything I expected this control to do, it wouldn't. I had attempted to bypass SelectedIndexChanged on the combobox, in lieu of the PositionChanged event on the CurrencyManager. My goal was to provide a method to completely clear out the values of the user controls.
* Why isn't data binding documented better in the MSDN files? The only thing that I've been able to discover in there is some very rudimentary examples, but nothing that even remotely resembles any real world example.

I should note that some of my frustrations may be because I'm not completely familiar with how the data binding architecture works. Although, I feel that I have learned all I want to know about it for now.

All in all, I went back to the old tried and true method for my application. The application is significantly quicker, and no more complaints from the client. Life really is good.

Maybe now I can have some time to relax and pay some more attention to this blog.
