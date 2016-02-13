---
title: "Cappin' that Stat: Solaris edition"
disqus_identifier: 2008-04-cappin-that-stat-solaris-edition
comments: true
---

Some time ago, I saw a [post on err the blog][1] that detailed how to use Capistrano to inject your site's google analytics javascript at deploy time. The major advantage to this is that you dont run up your site stats while developing your site. While developing, it's empty, and when you run a cap deploy, it places the javascript right before the closing body tag. Brilliance, if you ask me ... until you try the posted after_symlink task on a Solaris box.

Solaris's version of sed does not support the -i (in-place) option. You could create a nasty script that does all the intermediate saving for you, but I chose to go a different route ... perl.

Perl has some options that can be passed to it which allow it to function on sed scripts. If you are deploying your Rails application to a Solaris environment, you can use this Capistrano task instead:

``` ruby
task :after_symlink, :roles => :app do
  stats = < <-JS
  <script src="http://www.google-analytics.com/urchin.js" type="text/javascript" charset="utf-8">

  <script type="text/javascript" charset="utf-8">
    _uacct = "YOUR-TRACKING-CODE";
    urchinTracker();
  </script>
  JS

  layout = "#{current_path}/app/views/layouts/application.rhtml"
  run "perl -pi -e 's??#{stats}?' #{layout}"
end
```

My stats should hopefully be a bit more relevant with this little gem.

[1]: http://errtheblog.com/posts/59-cappin-that-stat
