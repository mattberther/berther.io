---
title: Automatically closing MT comments from crontab
disqus_identifier: 2003-05-automatically-closing-mt-comments-from-crontab
comments: true
---

I have been looking around the net for something to automatically close my comments on my MovableType blog after a predetermined amount of time. Nobody really cares about or follows comments on a 3 month old post.

I found a great PHP script by Kevin Schumacher that accomplishes this.

After verifying PHP installation with my hosting provider, it was discovered that for me to use this script, I would need to place the script in a publicly accessible directory and use lynx to access the script from crontab.

I didnt really care for this type of solution and thus have created a perl script using Kevin's ideas, which can be run directly from crontab.

Unzip the file, chmod 755, edit the variables at the top to customize it for your specific installation, and add it to the crontab... Off you go.

[Download script][1]

[1]:/uploads/2003/05/closecomments.zip
