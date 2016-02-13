---
title: Simian and CruiseControl.NET
disqus_identifier: 2006-03-simian-and-cruisecontrolnet
comments: true
---

I've been using [Simian][1] for quite a while to analyze code and help me find areas that could use refactoring. However, only recently  have I introduced Simian into my continuous integration process here at home. I had quite a time getting builds to work after doing this.

The easiest way to get Simian into CC.NET is to set up an exec task in your ccnet.config file's task section, as follows:

``` xml
<project>
    <tasks>
        <exec>
            <executable>c:\tools\simian\bin\simian-2.2.8.exe</executable>
            <buildArgs>-recurse=*.cs -formatter=xml:build\log\simian.xml</buildArgs>
        </exec>
    </tasks>
</project>
```

Id noticed that quite often builds would fail for no apparent reason. The CC.NET log looked clean. Finally, after reviewing one of my successful builds I noticed the simian section had an area that said 'failOnDuplication=true'.

Assuming that this was my problem, I looked into it a little further. Seems that simian is by default set up to return 1 on duplications, which triggers a failure in both nant and cc.net.

The easiest way to get around this is to pass another argument in your build args section:

`-recurse=*.cs -formatter=xml:build\log\simian.xml -failOnDuplication`

Problem solved! :)

I understand the reasons for having simian fail on duplication, however, I disagree with this being the default. I hope that this will change in a future build.

[1]:http://www.redhillconsulting.com.au/products/simian/
