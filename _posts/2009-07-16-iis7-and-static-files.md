---
title: IIS7 and static files
disqus_identifier: 2009-07-iis7-and-static-files
comments: true
---

So, the other day I was trying to debug a problem with one of our web applications. I had gone through the steps of making the appropriate changes to my IIS configuration for this application, so that it utilized the Classic .NET App Pool and everything seemed to be running properly. That is, until I noticed that some javascript files and some images were not rendering properly.

As I utilized Firebug to try and understand what was going on, I saw that the javascript and image files were being sent with a content-length header of 0 bytes. Curious, what was causing this for some files but not all? I finally realized that the difference was that the files not being sent were static files.

Thoroughly befuddled now, I began to scour the web.config file to see if something had gotten committed that caused this to happen. This was not the case. Ultimately what I found was that Microsoft, in their infinite wisdom, decided that, when picking the default settings for installing IIS7 on Windows 7 RC, people probably did not have static content that they would like to publish on the web, and therefore left the static file handler turned off. Seriously! WTF?! 

Anyways, to turn this on, go to Start | Control Panel | Programs and Features | Turn Windows Features On or Off | Internet Information Services | World Wide Web Services | Common Http Features and check the Static Content box.
