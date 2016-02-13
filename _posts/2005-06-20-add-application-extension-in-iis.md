---
title: Add Application Extension in IIS
disqus_identifier: 2005-06-add-application-extension-in-iis
comments: true
---

Earlier tonight, I was trying to setup a new file extension for a web application using IIS. The idea was simple enough. Default Website | Home Directory | Configuration | Application Configuration.

I tried clicking the Add button to add an extension, but when I did the OK button was always disabled. No matter what, I could not get it to enable.

This is one of the [sillier workarounds][1] I've seen in a while. After selecting the executable, you need to click on the textbox itself and the path will fully expand, enabling the OK button so you can save the mapping.

[1]:http://support.microsoft.com/?id=317948
