---
title: Popup Tester Web Control
disqus_identifier: 2005-03-popup-tester-web-control
comments: true
---

A realization that I came to in the recent past was the lack of usability around a lot of web applications. Take for example Outlook Web Access (OWA). A fundamental piece of this appplication is the ability to use popups. For the past 6 months or so, I have not been able to use our OWA installation, because everytime I clicked on Reply, the window just went away.

It finally dawned on me last week that the reason why this was happening was because of FireFox's popup blocker. Why then, would OWA not tell me that I need to disable my popup blocker to let the application function properly?

With that, I've made a control that will make it easy for anyone to add tests for popup blockers to their ASP.NET applications. The PopupTester control is derived from Panel, which means that it is a container control to which you can simply add whatever other controls you want to display if a popup blocker is found.

Using this control is as easy as 1, 2, 3:

1. Add a reference to MattBerther.Web.PopupTester.dll from your ASP.NET application
2. Register the control on your aspx page with `<%@ Register TagPrefix="mbw" Namespace="MattBerther.Web.UI.WebControls" Assembly="MattBerther.Web.PopupTester" %>`
3. Add an instance to your aspx page with `<mbw:PopupTester id="popupTester" runat="server">Popups are being blocked</mbw>`

Again, you are free to place whatever content you like inside the PopupTester control. The control will render with a style of display:none, unless a popup blocker is found. If one is found, it renders with display:block. This control should work with Netscape, Internet Explorer and FireFox.

If you're using popups in an ASP.NET application, you owe it to your users to give this control a shot. There is no cost, so what do you have to lose?

**Update**: This project is now available on [github][1].

[1]:http://github.com/mattberther/popup-tester
