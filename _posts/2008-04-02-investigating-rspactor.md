---
title: Investigating RSpactor
disqus_identifier: 2008-04-investigating-rspactor
comments: true
---

[RSpactor][1] is a command line tool for OSX Leopard that does basically the same thing as autotest, which is to re-run your specs any time one of your application files changes.

The reason that it only works on Leopard is the same thing that makes it better than autotest at this point. It uses the filesystem events (FSEvent on Leopard) exposed by RubyCocoa. This makes it much, much faster than using the file notification system used by autotest. It's saved my MBP fan from spinning up when I go through a development session. Additionally, Growl support is built in so you have very nice notifications available for when your tests pass or fail.

Since I rebuilt the version of Ruby that was included with Leopard, I ended up having to manually install the RubyCocoa libraries. Thankfully though, this was [relatively straightforward][2] as well. If you're running a stock Leopard install, you wont need to do anything other than:

``` console
sudo gem install rspactor
cd /path/to/your/app && rspactor
```

If you're using autotest currently and are on OSX Leopard, do yourself a favor and check this tool out.

[1]: http://rubyphunk.com/2008/3/11/hello-world-introducing-rspactor "rubyphunk  - Hello world: Introducing RSpactor"
[2]: http://rubyphunk.com/2008/3/18/getting-rubycocoa-on-your-mac "rubyphunk  - Getting RubyCocoa on your Mac"
