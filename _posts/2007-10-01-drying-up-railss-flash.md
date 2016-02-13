---
title: DRYing up Rails's Flash
disqus_identifier: 2007-10-drying-up-railss-flash
comments: true
---

When working with a Ruby on Rails application, one of the first things that I lot of people start working with is flash. There are certain conventions that are used to pass specific messages from the controllers to the views. Most often, these messages take the form of notices, warnings, or errors.

This type of thing is very often duplicated in applications and layouts. One of the things that people should always be looking for is violations of the DRY (Don't Repeat Yourself) principle.

I've found a clever little helper method along with some CSS that does exactly that. DRYs up my flash display logic in my views.

This is the helper method, which I've placed in my application_helper module:

``` ruby
def render_flash_messages
  html = ""
  ["notice", "warning", "error"].each do |type|
    unless flash[type.intern].nil?
	    html << content_tag("div", flash[type.intern].to_s,
		    :id => type, :class => "flash")
    end
  end

  content_tag("div", html, :id => "flash")
end
```

This helper outputs the following chunk of HTML wherever it's called:

```` html
<div id="flash">
  <div class="flash" id="notice">Contents of flash[:notice]</div>
  <div class="flash" id="warning">Contents of flash[:warning]</div>
  <div class="flash" id="error">Contents of flash[:error]</div>
</div>
```

As you can see, the helper outputs class and id attributes so that the messages can be easily styled with CSS.

``` css
.flash {
  padding: 5px 10px;
  margin-bottom: 20px;
  text-align: center;
}
#notice {
  background: #ccffcc;
  border: 1px solid #68cd68;
  font-size: 13px;
  margin-bottom: 20px;
  padding: 5px 10px;
}
#error {
  background: #cc0000;
  border: 1px solid #cc9999;
  color: #ffffff;
  font-size: 13px;
  margin-bottom: 20px;
  padding: 5px 10px;
}
```

Now, that you've written all this code (once), you are able to put in this line of code in your views at any point that you would like to have your flash messages displayed.

``` erb
<%= render_flash_messages %>
```

Constant refactoring to remove duplication leads to much less code to maintain and many fewer bugs in your code. You should always look for this duplication and find ways to eliminate it.
