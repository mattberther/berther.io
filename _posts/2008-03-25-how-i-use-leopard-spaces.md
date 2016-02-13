---
title: How I use Leopard Spaces
disqus_identifier: 2008-03-how-i-use-leopard-spaces
comments: true
---

OSX 10.5 (Leopard) introduced one feature that has fundamentally enhanced my productivity more than any other tool or feature before. Spaces, for those unfamiliar, are virtual desktops for your computer. The key problem with the initial implementation of Spaces was that the desktops were designed to be centered on the application, rather than on tasks, which is my preference.

With the application-centric focus, I am only able to have one instance of the application open and when I click on the icon in the dock, I'm instantly transported to the space containing that application. However, the way I've decided to utilize Spaces (with a task-centric focus), I have a need to have Safari or TextMate open on many different windows.

In Leopard 10.5.2, the doc has some preferences that you can set on the commandline that will not switch spaces when you hit CMD-TAB. Thanks to [Mac OSX Hints][1] for the tip.

``` console
defaults write com.apple.dock workspaces-auto-swoosh -bool NO
killall Dock
```

So, my space layout? I have 2 rows of 3 spaces. Email occupies space 1. Feed reading is occupied by space 2. IM and Twitter activity goes on in space 3. Space 4 is my Parallels VM (with 4gb of RAM on my MBP, I can afford to run a Windows VM all the time). Space 5 is occupied with my development tools. Space 6 is open for other things.

I've mapped my hot corners with Expose as well. Top right shows my spaces, top left shows windows on the space. Bottom left shows my desktop and bottom right shows the screen saver (or locks the computer).

I really enjoy the Spaces feature and highly recommend some variation of this for people to become increasingly productive with OSX.

[1]: http://www.macosxhints.com/article.php?story=2008021122525348
