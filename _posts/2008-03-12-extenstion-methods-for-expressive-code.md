---
title: Extenstion methods for expressive code
disqus_identifier: 2008-03-extenstion-methods-for-expressive-code
comments: true
---

One of my main likes of the Ruby language is that it very clearly allows you to express programmer intent. I don't want to get into the argument of whether or not Ruby is more beautiful than another language. Suffice it to say that it is just as easy to create ugly code in Ruby as it is in any other language. However, the tendency is towards very clearly expressing intent. This is what constitutes beautiful code to me.

For example: I would much prefer to read this code

``` ruby
def main
  20.times { puts "Hello, world!" }
end
```

In my opinion, it is very clear what this code does. Contrast that with the following c# code:

``` csharp
public static void Main(string[] args)
{
  for (int i = 0; i < 20; i++) {
    Console.WriteLine("Hello, world!");
  }
}
```

Not only is the latter more verbose, it also puts the responsibility of the iteration into the hands of the client.

C# 3.0 introduced the concept of extension methods which promise to allow you to create more expressive code and abstract away some client complexities. To test how this might work, I set out to create a C# version of the Ruby code above. This is what I came up with:

``` csharp
class Program
{
  static void Main(string[] args)
  {
    20.times(delegate { Console.WriteLine("Hello, world!"); });
  }

  static class Extensions
  {
    public static void times(this int number, Action a)
    {
	    for (int i = 0; i < number; i++)
	    {
		    a();
	    }
    }
  }
}
```

Much to my surprise, this not only compiled, but actually worked. Also, I got intellisense after the . on 20. These techniques really give C# developers the power to express the intent of their programs. Isnt this what beautiful code is really all about?
