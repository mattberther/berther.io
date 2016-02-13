---
title: WebResource.axd and clustering issues
disqus_identifier: 2007-01-webresourceaxd-and-clustering-issues
comments: true
---

Earlier today, we tried deploying an application to our clustered test environment. The application had gone through a fairly rigorous amount of testing and had passed with flying colors.

The strangest thing happened though, once we rolled to our clustered test environment... Funny how that works, isnt it?

Eventually, we were able to troubleshoot the error down to a CryptographicException that was occuring within WebResource.axd. If you're not aware, the WebResource.axd is an ASP.NET IHttpHandler implementation that is able to extract embedded files from a resource assembly (javascript files, for example) and return them to the client. 

Turns out that this was an issue documented at Microsoft. A little bit of googling turned up [the fix][1]. 

Basically, what was happening was that both machines had their `<machineKey>` elements set to AutoGenerate. This was causing the cryptographic hash that was being used for the querystring to be invalid when the request came in to the other server.

There is also an article available on MSDN that has a little console application that you can use to generate the machineKey elements.

Pretty simple fix, for a problem that took up a lot of our day today. I'm posting this to hopefully help someone else struggling with the same issue.

[1]:http://connect.microsoft.com/VisualStudio/feedback/ViewFeedback.aspx?FeedbackID=105039
