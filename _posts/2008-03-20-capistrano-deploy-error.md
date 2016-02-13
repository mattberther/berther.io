---
title: Capistrano Deploy Error
disqus_identifier: 2008-03-capistrano-deploy-error
comments: true
---

I was running a deployment using Capistrano earlier and came across a strange error. The error said:

``` console
Errno::ENOENT: No such file or directory - /tmp/501/SSHKeychain.socket
```

This was a puzzling error, but I think I finally traced it back to an installation of SSHKeyChain (which I ended up uninstalling). To fix the error, I ran the following command, after which Capistrano started to work again.

``` console
unset SSH_AUTH_SOCK
```

This resolved the problem on my MacBook Pro, running Leopard and Capistrano 2.2.
