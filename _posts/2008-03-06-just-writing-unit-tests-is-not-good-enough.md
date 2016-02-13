---
title: Just writing unit tests is not good enough
disqus_identifier: 2008-03-just-writing-unit-tests-is-not-good-enough
comments: true
---

I've been absorbed in some of the testing sessions, specifically RSpec, while down here at SDWest. What has become crystal clear to me over the past few days is that simply writing unit tests is not good enough. Even with the best of intentions things come up. Schedules get crunched and tests won't get written. They *might* get picked up later, but chances are that they usually wont. The only way to ensure that the tests are written is to absolutely write the test **before** writing the production code.

The most prevalent argument that I hear about not writing code test first is that IntelliSense is not present because the class or method does not exist. With the tools available in IDEs and plugins today, this should not be an issue. All the Java IDEs support a "generate method" or "generate class" function. VS2005 supports this with the Resharper add-in which every developer should have in their toolbox. VS2008 also supports the class/method generation out of the box. What the lack of IntelliSense gives the developer is really one of the best things about writing code test first: the ability to think about how the behavior should be expressed in code. Let me state that again. Rather than retrofitting tests around existing code and testing state on what was written, the developer can spend time describing in advance what the code should look like.

A state-based test, which is a result of test-later development, is very brittle. This leads to another objection commonly heard about writing code test first: when the developer refactors the code, all the unit tests have to change. This is correct when the tests are testing state instead of interactions. However, when approaching the problem with the idea of behavior, rather than testing, this problem seems to go away. Some unit tests may still be modified, but it should not be nearly as prevalent as when testing solely on state. I'll have more an state-based versus interaction based testing in a future post.

Writing the unit test before writing the code also helps evolve a simpler design. When creating a failing test and writing *the simplest code that makes that test pass*, the result is the simplest code possible to perform the intentions of the code. Additionally, YAGNI (You Aint Gonna Need It) is something that needs to be considered strongly. Writing a specification for code prior to writing the code itself will help make sure that the minimal amount of production code is written.

If it is known that a strategy pattern, for example, is needed, should it be put in at that time? NO! The pattern should be introduced as a result of refactoring to make another test pass. It may be five minutes from now, and that's ok. It's really not wasted effort because of the tight nature of the red/green/refactor loop. These iterations should last anywhere between 30 seconds to 2 minutes. Anything longer and too much code is being written between green lights. Unless done properly, there is a good chance that tests become out of sync with the code quickly. There is a very strong discipline and effort level required to create code test-first. This is effort that will yield dividends in the future, when the code does not have to be rewritten because of excess cruft.

A major benefit of writing the code test first is that the developer knows... I mean, really KNOWS, that every piece of code is covered by tests. So, when the developer wants to go in and refactor (or even try a different algorithm), it can be done with confidence that nothing has been broken. As [discussed previously][1], I had learned about RSpec earlier this week and could not wait to try my hand at writing some tests with it after the session was over. I wrote some specifications for a bubble sort algorithm and then code to make those specifications pass. Since C# is the language that pays my bills, my Ruby bubble sort algorithm looked strikingly similar to what I might have written had I written it with C#. However, since I had a battery of unit tests available, I was easily able to try some different things with the production code to make it more Ruby-esque. I was able to do all of this and run my tests afterwards to ensure that everything still functioned as I had intended.

By the way, the code went from this:

``` ruby
class BubbleSorter
  def sort(array)
    size = array.length
    for i in 0..size
      for k in 0..size - i - 2
        if array[k+1] < array[k]
          t = array[k+1]
          array[k+1] = array[k]
          array[k] = t
        end
      end
    end
    array
  end
end
```

to this:

``` ruby
class BubbleSorter
  def sort(array)
    array.each_index do |i|
      array.each_index do |k|
        array[i], array[k] = array[k], array[i] if array[i] < array[k]
      end
    end
    array
  end
end
```

Peace of mind lets a developer really take some risks. The code I originally had worked, however, I was not content with it. It did not feel like it embodied the expressiveness of Ruby at all. With the tests in place, I was able to experiment a bit and ultimately come up with much nicer code because of it.

So, as I said... Writing unit tests is good. However, until the tests precede the code, it's just not good enough. For the best longevity of your code, you must be writing your code test first.

[1]: /2008/03/03/ironruby-and-rspec/
