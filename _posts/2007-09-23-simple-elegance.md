---
title: Simple Elegance
disqus_identifier: 2007-09-simple-elegance
comments: true
---

Recently, I've started rekindling my love affair with the Ruby language. One of my favorite idioms is `||=`. How many times do you find yourself writing something like:

``` csharp
if (someVariable != null)
{
  // some other code
}
```

Ruby makes this much shorter and more elegant:

``` ruby
someVariable ||= // some other code
```

The code on the other side of the equals sign does not get executed unless the variable on the left is null.

I've used this syntax in a current Rails project to define caching and also to provide default values to request parameters that may not have been passed.

``` ruby
# caching example
# The code below evaluates whether an instance variable
# named action_regex is nil, and if it is, it initializes
# it to a new Regexp
@action_regex ||= Regexp.new(action)

# params example
# this works exactly as above. If the page_size parameter
# is not passed, it defaults to 20. In this particular case,
# we are then calling the to_i method to convert it to an
# integer to be assigned to the page_size variable
page_size = (params[:page_size] ||= "20").to_i
```
