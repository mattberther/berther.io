---
title: Cygwin - unable to remap to same address as parent
disqus_identifier: 2011-11-cygwin
comments: true
---

I find the windows command prompt somewhat limiting and have never really been able to make the leap to Powershell. Personally, I like to use a Cygwin shell for command line work. I am comfortable in a unix shell with previous Linux and Mac experience. I'm not an expert by any means, but I can get by. 

Recently, I installed the Cygwin shell on my 64bit Windows 7 system. After installing the developer tools and trying to compile ruby 1.9.2, I found that I had a tremendous amount of problems building. Id see numerous errors that stated:

``` console
unable to remap file to same address as parent ruby ### fork: child XXX - died waiting for dll
```
  
The most commonly referenced [solution][1] was to rebase by doing the following:

1. Start -> Run
2. cmd.exe
3. cd c:\path\to\cygwin\bin\
4. ash.exe
5. ./bin/rebaseall
6. Reboot

However, this did not work for me. I found a [message on the cygwin mailing list][2] stating that the gems may not add information to the proper paths and that we must create the list manually.

To do this, first from your cygwin shell do:

``` console
find /lib/ruby/gems -name '*.so' > /tmp/ruby.gems.local.so.lst
```
  
Then, follow steps the steps above, replacing step five with:

``` console
./bin/rebaseall -T /tmp/ruby.gems.local.so.lst
```
  
Since performing this, I have not seen any more of the remap file errors. Your mileage may vary though.

[1]:http://www.garethhunt.com/2008/02/11/cygwin-died-waiting-for-dll-loading/
[2]:http://cygwin.com/ml/cygwin/2011-04/msg00075.html
