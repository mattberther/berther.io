---
title: Ruby strings and is_int?
disqus_identifier: 2008-04-ruby-strings-and-isint
comments: true
---

Lately, I've found myself needing to do some parameter checking to ensure that appropriate data makes it back to my models when doing finds. Using the will_paginate plugin allows me to very easily do paging on my model data. I simply have to provide the page to the options hash.

``` ruby
class Model < ActionRecord::Base
  def self.search(parameter, page)
    paginate :per_page => 10, :page => page,
             :conditions => ['model.parameter = ?', parameter]
  end
end
```

The problem here is that some people are trying to pass in URLs as the page parameter, causing exceptions to be raised. I've installed Jamis Buck's [ExceptionNotifier plugin][1] and this is informing me via email of every exception encountered in the application. On a side note, I cannot recommend this plugin enough if you want to see where your application is being used incorrectly. I've found numerous edge cases with this plugin and urge every Rails installation to take advantage of it.

I wrote a spec for what I was after that looked like this:

``` ruby
describe Model do
  it "should convert the page number to one if an integer is not passed" do
    Model.should_receive(:paginate).with(hash_including(:page => "1"))
    Model.search("parameter", "some_invalid_page_number")
  end
end
```

Of course this test failed, so I set out to make it pass. What I really needed in this case was a way to reset the page parameter to an integer value if it was not an integer. I scoured the Ruby and Rails documentation but did not find anything built in to the framework.

Having seemingly no other option but to monkey-patch the string class, I ended up with this:

``` ruby
class String
  def is_int?
    self =~ /^[-+]?[0-9]*$/
  end
end
```

and the first line of the search method in my model looks like this:

``` ruby
page = "1" if not page.is_int?
```

My specification passed, but surely there's a better way. I really do not want to monkey patch classes if I dont need to.

[1]: http://agilewebdevelopment.com/plugins/exception_notifier "Plugins - Exception Notifier - Agile Web Development"
