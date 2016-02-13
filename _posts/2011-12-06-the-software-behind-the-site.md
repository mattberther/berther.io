---
title: The Software Behind the Site
disqus_identifier: 2011-12-the-software-behind-the-site
comments: true
---

Several times over the past months, I've received questions about the software and setup that I use to run the mattberther.com blog and related pages. Since the site recently underwent a dramatic change in tooling, I want to detail what I chose and why.

Before the change, the site was powered by wordpress. I had my own rackspace virtual server that I was using to host the apache and mysql server servers required by wordpress. Wordpress is not a bad piece of software, but what I realized is that it tries very hard to be all things to all people. 

Enter the blog engine Im using now: [toto][1] 

Toto's philosophy is akin to mine: use the best tool for the job. Toto's website states that "everything that can be done better with another tool should be". To that end, toto doesn't use complicated web frameworks. It doesn't use a database. There's no built-in commenting support. If you want comments, you'll use [disqus][2]. It also relies on git for version control. When you combine toto with a Heroku account, you also use git to deploy the site. Its designed to be used with a proxy cache for high availability and fast response times. 

Migrating the posts from the mysql database to the text files proved to be relatively straightforward, using a simple ruby script to iterate over the rows and format a text file that matched toto's expectations. Importing the comments into the disqus platform was equally straightforward using their JSON API.

I much prefer the simplicity of this new setup. The entire blog engine weighs in at about 300 lines of code. If running a blog without putting your hands on the metal and being able to control every nuance of your blog platform appeals to you, then certainly take a look at the toto/heroku combination. If not, then I believe that wordpress is a fine solution. 

[1]:http://cloudhead.io/toto
[2]:http://disqus.com
