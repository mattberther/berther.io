---
title: Generating URLs with ActionMailer
disqus_identifier: 2008-04-generating-urls-with-actionmailer
comments: true
---

ActionMailer is a very handy class for sending emails from your rails application. However, the problem that typically arises is the sending of links to your site via rails using the url_for method. Acording to the [API documentation][1], this is because the mailer instance does not have any context about the incoming request. The API documentation recommends passing the host to the url_for parameter, like this:

``` ruby
url_for(:host => "www.myproductionsite.com",
        :controller => :home,
        :action => :index)
```

However, when using multiple url_for calls in a model, this can lead to a violation of DRY. Therefore, the typical resolution to this has been to add some declarations to your class, like this:

``` ruby
class Notification < ActionMailer::Base
  default_url_options[:host] = "www.myproductionsite.com"
end
```

I dont really care for this approach, as it locks my model into operating under the assumptions of a particular environment. I am unable to verify the links in my development or test environments without some string manipulation. A little effort led me to this approach, which so far seems to be much better. Instead of declaring the default_url_options in the ActionMailer model, I'm including them in config/environments/*.rb in this way.

``` ruby
# development.rb and test.rb
class ActionMailer::Base
  default_url_options[:host] = "localhost"
  default_url_options[:port] = 3000
end

# production.rb
class ActionMailer::Base
  default_url_options[:host] = "www.myproductionsite.com"
end
```

I am taking advantage of the environments file to give me the benefits of custom url options based on the environment that I am currently executing in. This is precisely what these files were designed for.

[1]: http://api.rubyonrails.org/classes/ActionMailer/Base.html
