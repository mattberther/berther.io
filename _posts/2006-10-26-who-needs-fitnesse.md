---
title: Who needs Fitnesse?
disqus_identifier: 2006-10-who-needs-fitnesse
comments: true
---

We've been diligently using Fitnesse for the past year or so to document and automate our acceptance tests. For the most part, this has been an inefficient process. Let me clarify a little...

I'm not suggesting that FIT or documenting or automating your acceptance tests is what's causing the inefficiency. After watching people attempt to use this system for the past while, Im convinced that its the wiki itself that's causing the confusions and inefficiencies.

First off, just getting something running on your machine turns into a relatively difficult ordeal. The documentation available for Fitnesse is sparse at best.

Next, is the syntax. All pages in a wiki have to conform to a wiki word syntax. To a person new to wiki in general, this can prove to be very confusing, and I've seen test pages that look something like ThIsShOuLdTeStSoMeThInG. A little less than readable, if you ask me.

Lack of an *easy* integration with CruiseControl is also a drawback. It would be nice if there was a concise way of running all of my FIT tests every time the build executes.

The last thing, the straw that broke the camel's back, if you will is Fitnesse's ability to get out of sync with your source code. Let's say that I want to branch my source code... If I want to have non-failing tests, I need to spool up a new instance of Fitnesse, which can turn into a colossal PITA (see paragraph 3).

So, what would I do to solve this? Well, the first thing to realize is that FIT and Fitnesse are actually two separate things. I think the information out on the web has not been very good at driving this point home. FIT itself is the framework. Fitnesse is just a way to author and execute the tests. Fitnesse decided to use the wiki syntax to accomplish this.

So, knowing this, what we can do is create straight HTML pages, or even Excel spreadsheets, organize them into a folder structure of our choosing, and most of all, commit them right next to our source code. You do have a tests folder under your project in source control, right?

Running the tests at a time of your choosing is straightforward with the FIT runner. This can be launched from a command prompt and takes a folder location as an argument. It then iterates through the entire folder structure looking for and executing test fixtures. This way, the user can launch them whenever needed, and they can also integrate directly into CruiseControl. CruiseControl makes it very easy to tap into a post-build event to launch a command.

Seems to be a much easier way of utilizing FIT to document and run your acceptance tests...
