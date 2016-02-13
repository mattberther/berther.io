---
title: Pushing large git repos with SSH
disqus_identifier: 2013-12-pushing-large-git-repos-with-ssh
comments: true
---

For various reasons, we have a **MASSIVE** (14gb) git repository that we work with. We have a clone of this repository out in the cloud behind an SSH server. Recently, when I would attempt to push the repository, I would end up with failures while compressing the objects.

``` console
$ git push aws master
Counting objects: 4456610, done.
Read from remote host my.gitserver: Connection reset by peer
fatal: The remote end hung up unexpectedly
Compressing objects: 100% (1984267/1984267), done.
fatal: sha1 file '<stdout>' write error: Invalid argument
error: failed to push some refs to 'git@my.gitserver:repo.git'
```

On a hunch, I thought that the connection to the SSH server was timing out. I didnt know why the SSH connection would be opened before it was needed. However, the message seemed to indicate that some connection was being dropped by the server. To keep the SSH session alive so that the object compression could complete, I needed to update my ~/.ssh/config file and add an entry for my git remote.

``` console
Host my.gitserver
  ServerAliveInterval 60
```

When no data has been received from the server, the setting specified in ServerAliveInterval will determine the number of seconds after which a null packet will be sent to the server. The default setting is 0 which means that no keep alive packets are sent. This setting can be combined with ServerAliveCountMax which is the maximum number of ServerAlive messages that will be sent without response before the connection is terminated. The default value for ServerAliveCountMax is 3, which is good enough for what I need.
