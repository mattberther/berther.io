---
title: ! '"Gitting" TFS out of your way'
disqus_identifier: 2011-11-gitting-tfs-out-of-your-way
comments: true
---

More and more, I have developed a passion for the Git source control system. I love how Git stays out of my way, until I need to use it. Git offers a very easy way to test things out, whilst utilizing the benefits of source control. In the traditional, connected model of source control, experimentation proves to be somewhat difficult because you don't want to corrupt your main development line. Branching and merging with most other systems is a nightmare at best. With Git, branches are very cheap and merging is virtually painless. 

I use Git for side projects as well as a few of the open source projects I am a part of. However, during the day, my organization uses Microsoft's Team Foundation Server for source control. I find that in a connected source control model, I am constantly waiting on TFS to catch up. Either it's out too lunch, or it needs to download and checkout a file before I can edit it. Experimentation is tough, for the reasons I mentioned earlier. Surely, there has to be something better, while still keeping TFS in the organization.

Enter Git-TFS... Git-tfs is a two-way bridge between Git and TFS created by [Matt Burke][1]. It allows me to clone a TFS repository and use Git for source control (without the hassles of being tied to a TFS server). This means: 1) no more waiting on TFS, 2) no more locked files, 3) no more requiring network connectivity to work on a project. At a time that I believe a development effort is ready to be committed to the main line, I use git-tfs to push my changes to the TFS server so that the rest of the team can get them.

Sound interesting? Here's how to get started:

First step's first. You need to have a Git installation on your machine. I use [msysGit][2] 1.7.6 preview 20110708, but this should work with newer versions as well. I just used the default installation options, specifically, I chose to use the Git Bash only when prompted about how to use Git from the command line. I chose this option because it did not otherwise modify my system.

Once you have a Git installation, you need to install the git-tfs plugin, which is available on github at [https://github.com/spraints/git-tfs][3]. Installing the plugin is pretty straightforward. You can choose to either download or build it yourself. I went with the download option and extracted the zip file to c:\git-tfs. Once the files are in place, git has to know how to find them. The easiest way to do this is to add c:\git-tfs to your path (Advanced System Settings | Environment Variables). 

At this point, you are ready to clone a TFS repository using git-tfs. You can do this one of two ways:

``` console
git tfs clone http://tfs:8080/ $/TeamProject/folder
```

or 

``` console
git tfs quick-clone http://tfs:8080/ $/TeamProject/folder
```

At this point, you are ready to open your project. If you're using Visual Studio (which you likely are), you may still have the TFS source control bindings in place. There's several ways to handle this. You could 1) disconnect your network cable while starting the project, 2) update all of the projects to remove the source control bindings, or 3) install [GoOffline][4].

Option one is obviously less than desirable. Option two is reasonable, however, we are assuming that others on the team continue to use TFS and need to have the bindings in place. That leaves the GoOffline solution. GoOffline is a free Visual Studio add-in that adds a Go Offline button to the Source Control menu. When the solution is in offline mode, any file renames or moves happen without communicating with the TFS server. Perfect!

I prefer to work in feature branches (sometimes also referred to as topic branches). Again, branches are cheap in Git and this allows me the ability to experiment while enjoying the comforts of source control and not forcing experimental changes on my team. My typical workflow with git-tfs looks something like this:

``` console
# create and checkout a new branch for feature
git checkout -b feature_name

# write tests and code

# commit my changes with a meaningful commit message
git commit -am "meaningful commit message"

# repeat the code/commit process until the feature is complete

# when ready to commit the changes to the TFS repository, first sync any newer changes from the master

# switch to the master branch
git checkout master

# pull new changes from the TFS server
git tfs pull

# switch back to the feature branch
git checkout feature_name

# import the changes from the master branch onto our feature branch
git rebase master 

# last but not least, push to TFS
# optionally, add --build-default-comment which will create a default commit message
git tfs checkintool 
```

The checkintool command brings up the TFS commit dialog which allows you to associate checkins with work items and modify the commit message. Importantly, the push to TFS is done as a single commit, so regardless of how many times you commit to your git repository, the change pushed to TFS reflects only the final result and not the journey it took to get there.

I have only been using this workflow for a little while now, but for now, I am *very* happy with it. Your mileage may vary. Please let me know in the comments if you're using this and how it's working for you.

[1]:http://mattonrails.wordpress.com
[2]:http://code.google.com/p/msysgit/
[3]:https://github.com/spraints/git-tfs
[4]:http://visualstudiogallery.msdn.microsoft.com/425f09d8-d070-4ab1-84c1-68fa326190f4?SRC=Home
