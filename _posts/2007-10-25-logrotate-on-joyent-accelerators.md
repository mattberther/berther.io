---
title: LogRotate on Joyent Accelerators
disqus_identifier: 2007-10-logrotate-on-joyent-accelerators
comments: true
---

Recently, I finished rolling out a new client site on a Joyent Accelerator. The site uses Rails and one thing thats both positive and negative is the amount of information that gets logged. Granted, when RAILS_ENV is production, the amount of data that gets logged is much less than when RAILS_ENV is development. However, even when set to production, there is a significant amount of data which gets logged. The good part of this is that when something goes wrong, it's very easy to pinpoint the problem. The drawback is that these log files can chew up disk space when not managed properly. Enter the logrotate command...

From the man pages:

> logrotate is designed to ease administration of systems that generate large numbers of log files.  It allows automatic rotation, compression, removal, and mailing of log files.  Each log file may be handled daily, weekly, monthly, or when it grows too large.

The easiest way to get logrotate set up on your Joyent Accelerator is to create a logrotate.conf file in your home folder. This config file would look like this:

``` console
superbia:~ mattb$ cat logrotate.conf
/path/to/rails/site/log/*.log {
	daily
	missingok
	olddir old
	rotate 28
	copytruncate
	compress
	compresscmd /usr/bin/gzip
}
```

The important components of this config file are:

* **daily**: This line tells logrotate that we want to rotate files on a daily basis
* **copytruncate**: This command tells logrotate that after copying the files, the original log should be truncated. This avoids us having to kill the Mongrels after copying the log files.
* **compress**: In order to actually save some space with the logs, we want to compress the log files.
* **compresscmd**: This is the command that we use to compress the logs. With a Joyent Accelerator, it is necessary to specify /usr/bin/gzip, otherwise you will encounter some strange errors.

Once the conf file is ready, we can test to make sure that everything is working. Execute this command (you can pass -v if you would like verbose information).

``` console
superbia:~ mattb$ logrotate -f -s ~/var/log/logrotate.status ~/logrotate.conf
```

Once the command has completed, you should be able to go into your rails folder and see that your logs have been cleaned up.

The last step will be adding this to your crontab so that it executes on a daily basis.

``` console
0	0	*	*	*	logrotate -s /path/to/logrotate.status /path/to/logrotate.conf
```

Thank you to the fine folks at [Joyent][1] for helping me work through getting this running. If you're looking for some [great hosting][1], you wont do much better than those guys.

[1]: http://www.joyent.com
