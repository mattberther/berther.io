---
title: Exporting a JSON Resume with gulp
disqus_identifier: 2016-02-13-exporting-a-jsonresume-with-gulp
comments: true
---

Ive received questions from readers wondering about the résumé link on my page. I created the résumé using [JSON Resume](http://jsonresume.org) with the hope that it would make it easier to keep it up-to-date. I also love the idea of an open standard for résumés. So far, I have been very happy with the project and I am very grateful to the awesome team behind JSON Resume.

However, re-publishing the résumé became a manual step that I would sometimes forget when I rebuilt this site. This site is powered by [Jekyll](https://jekyllrb.com) and [Gulp](http://gulpjs.com) helps me with some of the other asset related things.

I looked for an existing gulp plugin that would allow me to create HTML from my JSON Resume file. Since nothing existed, I did what anyone who had a few hours to kill would do... I made my own.

## Introducing gulp-resume
The usage of this plugin is what you would expect. Make sure you `npm install --save-dev gulp-resume` and then add the following to your `Gulpfile.js`:

```js
var resume = require('gulp-resume');
var rename = require('gulp-rename');

gulp.task('resume', function() {
  return gulp.src('resume.json')
    .pipe(resume({
      format: 'html',
      theme: 'elegant'
    }))
    .pipe(rename('resume.html'))
    .pipe(gulp.dest('.'));
});
```

## Download links
[gulp-resume on GitHub](https://github.com/mattberther/gulp-resume) |
[gulp-resume on npm](https://www.npmjs.com/package/gulp-resume)
