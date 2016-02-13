---
title: Testing Helper Modules with Rails 2.2
disqus_identifier: 2009-01-testing-helper-modules-with-rails-22
comments: true
---

I recently found myself in a situation where I wanted to make sure that the current year is always displayed in the copyright statement at the bottom of a Rails application. At first glance, this is easy enough. All that a person needs to do is add the following to their application.html.erb:

``` erb
    Copyright &copy; 2007-<%= Date.today.year.to_s %>
```

However, as we start to implement this, it becomes apparent that this is not very test driven. I sought to find a way to implement and verify this functionality with a breaking test first.

Since view tests can often be very brittle, I really wanted to implement this in my ApplicationHelper module, so that I could hopefully test it easier, but also reuse to functionality in other areas.

Testing Rails helpers has been hard historically, but as I investigated how I might test this functionality in the ApplicationHelper module, I discovered the ActionView::TestCase base class. This class provided all the hook up that I needed to call methods on my helpers. Armed with this, I set out to write my test:

``` ruby
class ApplicationHelperTest < ActionView::TestCase
    def test_copyright_includes_current_year
      actual_copyright = copyright_text()
      assert(actual_copyright.include?(Date.today.year.to_s), "Copyright must include current year.")
    end
end
```

This fails pretty quickly, since it cant find ActionView::TestCase. The easiest way to resolve this is to add `require 'action_view/test_case'` to your test_helper.rb. When we run the test again, it fails again, since the copyright_text method does not exist, so we flip back over to the ApplicationHelper module and implement the method.

``` ruby
def copyright_text
    "Copyright &copy; 2007-#{Date.today.year}, Company Name. All Rights Reserved."
end
```

Voila. Our tests now pass. The last step is to add a call to this helper method in the view:

``` erb
    <%= copyright_text %>
```

We may take this a step further and also implement additional checks around the copyright statement, which can be easily done with the assert_match method. This was not needed in my particular case though.
