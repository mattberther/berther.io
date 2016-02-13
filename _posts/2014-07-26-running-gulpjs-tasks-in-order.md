---
title: Running gulpjs tasks in order
disqus_identifier: 2014-07-running-gulpjs-tasks-in-order
comments: true
---

When I did the redesign of this site, I wanted to also do some things that had been on my mind for a while, including combining and minifying my javascript and css resources. By doing so, I hoped that pages would load even faster than they already did.

As I looked at how best to do this, I saw that there were several tools available to do this. One evening, I was part of a Twitter conversation between [Scott Hanselman][2] and [Jason Denizac][3]. During this conversation, I learned of a couple of tools called [Grunt](http://gruntjs.com/) and [GulpJS](gulpjs.com). These two tools are part of an ecosystem of tools called client-side task runners that run on the nodejs platform.

At the time of this writing, GulpJS seems to be the new kid on the block. Its primary advantage is a much terser syntax and a stream-based processing model. Based on this, it was the one I chose for the build system for this site. There are many sites out there that describe exactly how to get Gulp and this article will not dive into those.

Due to the asynchronous processing of the gulp file, some resources would complete before others. This sometimes caused confusion and unexpected output. For example, the clean task might take longer to run than the compliation tasks. As a result, that task might incorrectly delete items after compilation.

There is a way to run gulpjs tasks in order -- using a plugin called [run-sequence][1]. You install the run-sequence plugin in the same way that you install any other gulp plugin: `npm install run-sequence --save-dev`.

Once you install the plugin, you can define a task that has several task steps. Within this task, you can use the run-sequence plugin to define which tasks need to wait on others before completing. You can pass two kinds of parameters to the plugin, either a single task name or an array of several task names. 

When passing a single task name that task must complete before the next task(s) begin. When passing several task names as an array, all the tasks in that array will run in parallel. However, all the tasks in the array must complete before the next task starts. This allows the developer to be specific with task dependencies.

For an example, I will show an abbreviated version of the gulpfile.js used for this site below.

``` javascript
var gulp = require('gulp');
var runSequence = require('run-sequence');

// several task definitions removed for brevity

gulp.task('default', function(callback) {
  runSequence('clean',
    ['lint', 'less', 'scripts', 'vendor'],
    'watch',
    callback);
});
```

In the 'default' gulp task defined above, the clean task will run. After it completes, the lint, less, scripts, and vendor tasks all run in parallel. When they have *all* finished, the watch task runs. 

[1]:https://github.com/OverZealous/run-sequence
[2]:http://www.hanselman.com/
[3]:http://jden.us/
