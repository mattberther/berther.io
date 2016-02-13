---
title: My first XAML application
disqus_identifier: 2004-04-my-first-xaml-application
comments: true
---

Typically, when I first start to work with a new language or development technology, I try and stay away from the ubiquitous "Hello World" example. The first application that I created using Longhorn 4051 and XAML is no different. 

One year ago yesterday, I posted my first article to CodeProject.Com, which was entitled "[An introduction to web services: Daily Dilbert][1]", which was something that I was working through when I was trying to familiarize myself with web services.

Now, one year later, here I am trying to familiarize myself with XAML. What better way, I thought, than attempting to create a simple desktop application that retrieves the daily Dilbert image.

[![dailydilbert screenshot][3]][2]

I'll warn you that this is really nothing spectacular. The code that retrieves the Dilbert image is embedded directly into the UI layer.

You can download the code that I created for doing this here ([zip][4]). You can build the code by doing 'MSBuild dailydilbert.proj' from the command line. I've also included a compiled version in the bin folder so that you can run it right away.

Perhaps, as I continue to familiarize myself with Avalon and Indigo, Ill add some things that will be of more interest, such as implementing the webservice using the Indigo framework and adding transparency sliders. Working it into the Longhorn sidebar would be pretty cool too, although I think Ill be waiting for a new build of Longhorn where the sidebar is a little more stable.

Enjoy, and please feel free to drop a comment with any feedback you may have.

[1]:http://www.codeproject.com/soap/dilbertservice.asp
[2]:/uploads/2004/04/dailydilbert-longhorn.png
[3]:/uploads/2004/04/dailydilbert-longhorn-thumbnail.png
[4]:/uploads/2004/04/longhorn-dailydilbert.zip
