---
title: Removing duplicate messages from Outlook
disqus_identifier: 2012-09-removing-duplicate-messages-from-outlook
comments: true
---

I recently learned that Outlook for Mac had been uploading multiple copies of the same message to the Exchange server. At final count, I had approximately 280,000 email messages sitting in my "Archive" folder on the server. As you can imagine, this caused tremendous download times for resynchronizing my folders.

I looked for tools that could purge the duplicates for me, but had a tough time getting most of them to work on Microsoft Outlook 2010. I set out to try and solve this problem by creating a simple C# app that would iterate through my archive folder and identify and remove duplicate items.

I chose to parse the messages in two different ways to make sure that I was able to remove as many duplicates as possible. The first scan removed every message that had a duplicate [message id][1]. The second scan removed every message that had the same sender email, subject, and sent time.

This technique worked remarkably well. My archive folder now has less than 70,000 messages in it, which means that approximately 75% of the messages in that folder were deleted as duplicates.

I've made my source code available at [github][2] for anyone that is interested in using and/or forking the project.

Please keep in mind that there are no warranties with the code. It worked well for me; your mileage may vary.

[1]:http://en.wikipedia.org/wiki/Message-ID
[2]:https://github.com/mattberther/duplicate_email_remover
