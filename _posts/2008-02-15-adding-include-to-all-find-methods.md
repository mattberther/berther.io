---
title: Adding :include to all find methods
disqus_identifier: 2008-02-adding-include-to-all-find-methods
comments: true
---

A project that I have been working on has been making heavy use of joined ActiveRecord models with the belongs_to method. By default, the find method performs a lazy load of the related objects. However, if you use the joined data quite often, it can be very beneficial to include the data in as part of your find clause. For example:

``` ruby
def index
  Model.find(:all, :include => :other_model)
end
```

It's quite possible that the :include option can be sprinkled in many places throughout your code. So, in the interesting of DRYing up this code, I set out to figure out a way to include the :include option on all my finds. I think I found a very elegant solution, that takes advantage of Ruby's alias capabilities, which let you map a method to a method of a different name. Without any further ado, here's the code:

``` ruby
class Model < ActiveRecord::Base
  class << self
    alias find_without_includes find

    def find_with_includes(*args)
	    options = { :include => :other_model }
	    if args.last.is_a? Hash
		    options.update(args.pop)
	    end

	    self.find_without_includes(*args.push(options))
    end

    alias find find_with_includes
  end

  # rest of your model class
end
```

Aliasing is proving to be a very valuable tool to allow for extending functionality. I look forward to exploring this further.
