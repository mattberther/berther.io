---
title: Session State and Internet Explorer
disqus_identifier: 2004-09-session-state-and-internet-explorer
comments: true
---

I think we've finally uncovered the root cause of an issue that has been bugging us (no pun intended) for a long time.

In a nutshell, the problem was that sometimes, but not always, the session state from one running copy of Internet Explorer would bleed over into another.

What was finally determined was that as long as you're sharing the same process (instance on the processes list in your Task Manager), you'll also be sharing sessions.

So, if you're in IE and you press CTRL-N, you get a new window within the same process (no extra iexplore.exe in your Task Manager) and thus will share session state.

However, when you double click a shortcut (or the .exe itself) or create an instance via ShellExecute or CreateProcess, you'll get a new window with a separate process (a new iexplore.exe in your Task Manager) and thus you will not share session state.

Now, the question comes up... What happens when you do window.open via javascript? The answer is that the new window gets launched in the same process space as the original window, and therefore, you *will* end up sharing session information.
