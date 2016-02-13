---
title: Implementing method_missing
disqus_identifier: 2009-02-implementing-methodmissing
comments: true
---

Earlier, I was working on creating a script that would iterate a set of folders and execute a chunk of code against that file when it was found. The script itself is easy enough to write with straight ruby. For example:

``` ruby
Dir.glob("./**/*").each do |f|
  # your ruby code here
end
```

However, as much as we tend to do this during our daily life, I was hoping to hide this behind an api that some less technical users may be able to use. To promote reuse, I created a class that would provide this functionality.

``` ruby
class FileWalker
  def root_path=(path)
    @root_path = path
  end

  def each_file_of_type(type, &block)
    Dir.glob("#{@root_path}/**/#{type}").each do |f|
      yield f
    end
  end
end
```

The users of this API utilized it in a manner which you would expect (coming from a statically-typed language):

``` ruby
walker = FileWalker.new
walker.root_path = "."
walker.each_file_of_type("*.rb") do |file|
  # your ruby code here
end
```

While this covered the functional requirements of what I was hoping to do, I really did not like the way this reads. One, the user of the API was expected to implement the wildcard for the type. Two, did I say that I didnt like the way it reads? What I was really hoping for was an API that worked like this:

``` ruby
FileWalker.dir "." do
  each_rb_file do |f|
    # your ruby code here
  end
end
```

The first thing you'll notice is that I remove the file specification from the call with the each_rb_file method. However, I certainly do not want to corrupt the FileWalker class with dozens of methods to iterate different file types. Having to add a new method every time I want to iterate a different file type would most certainly violate the open/closed principle.

As I thought about the best way to accomplish both the API I desired and the long-term maintenance, I decided to take advantage of a great method on ruby's Object class called method_missing. method_missing is a method that gets called every time a method on the receiver does not exist. The method gets passed three arguments, the name of the method, any arguments to the method, and a block to execute.

Using a little regexp magic, I am able to intercept calls to each_rb_file and delegate them to the earlier each_file_of_type method (which is now private). Take a look:

``` ruby
class FileWalker
  def initialize(path)
    @root_path = path
  end

  def self.dir(path, &block)
    walker = new(path)
    walker.instance_eval(&block) if block_given?
  end

  def method_missing(method, *args, &block)
    if method.to_s =~ /^each_(.+)_file/
      each_file_of_type "*.#{Regexp.last_match[1]}", &block
    end
  end

private
  def each_file_of_type(type, &block)
    Dir.glob("#{@root_path}/**/#{type}").each do |f|
      yield f
    end
  end
end
```

So, as you can see with a little method_missing mojo, we now have access to any number of methods that allow us to retrieve all files of a particular extension. The above script and class will work with any sort of file extension. Calling each_exe_file, each_xml_file, or each_py_file will all function the same way, without adding any new code. The advantage here, as mentioned earlier, are that 1) we get to provide a *readable* API to our consumers, and 2) we conform to the open/closed principle by not having to modify already written and tested code to implement a new extension.

If you've not looked much at method_missing and ruby, I encourage you to discover it more. I've only touched the surface with its capabilities. Others have gone much further, including implementing an entire XML dsl utilizing this method.

Perhaps in a subsequent post I'll dive into how I'd go about implementing this... til then.
