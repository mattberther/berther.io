---
title: Random Images in Rails
disqus_identifier: 2007-11-random-images-in-rails
comments: true
---

A requirement for a client application that I just recently finished was to display groups of client logos on the screen. The logos themselves would be stored on the filesystem of the web server. What I needed was a way to get a random image to my view in such a way that images would not be duplicated. Having the same logo on the screen twice would not have been ok. This is what I came up with.

``` ruby
def random_logo
  @image_files = %w( .jpg .gif .png )
  @files ||= Dir.entries(
    "#{RAILS_ROOT}/public/images/logos").delete_if { |x|
      !@image_files.index(x[-4,4])
    }

  file = @files[rand(@files.length)];
  @files.delete file

  return "/images/logos/#{file}"
end
```

The code in the view looks like this:

``` erb
<%= image_tag random_logo %>
```

The trickery here is initializing the @files variable. If it has not been initialized, it becomes an array of all of the files that match the specified file types (in the @image_files variable). @files is stored as an instance variable solely for the purpose of removing already used logos from the array. This way, we will not duplicate logos on the same page. We pick a random item from the array, remove it from the array and then return a path to it.

I'm sure there's better ways to get this done, but I was kind of pleased with this little bit of code.
