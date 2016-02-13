---
title: IronRuby and RSpec
disqus_identifier: 2008-03-ironruby-and-rspec
comments: true
---

For some time, I've wanted to learn more about RSpec and how it can be used to express desired behavior in your story tests as well as your unit tests. At the SDWest conference today, I took a session presented by [Dave Astels][1] which started with a high-level overview of RSpec. As Dave was really one of the instigators of RSpec, I really felt like I was getting it from the source.

Something that struck me about this session is that it seems that developers should be spending much more time writing tests around interactions and behaviors than tests around expectations and state. Tests that simply assert on a return value seem to be very brittle and do little to express the intent of the code that is under test. However, writing tests to specify the desired behavior of the code seems to have much more benefit, since the developer focuses on the result of the behavior instead of the implementation. Rather than focusing on on testing your code to make sure that it functions correctly, this is much more about defining what it means for your code to function correctly. As Robert Martin puts it, "Specification, not Verification".

I had a side conversation with Dave about his thoughts on how IronRuby might support the RSpec framework for testing C# code. He mentioned that a stated goal for the IronRuby project was to run Ruby on Rails, and he felt that if that goal was met, then RSpec should certainly run on it. As it turns out, the IronRuby folks have already done some [significant work][2] to make this happen, but they are not quite there yet. I can only say that this is one project I'll be keeping a careful eye on. Being able to describe my C# code using the elegance of Ruby would be simply amazing.

Ruby code (especially an RSpec example) is just dead sexy to read. I mean, is there *any* doubt as to what the following code is testing:

``` ruby
describe "A bowling game"
  before(:each) do
    @game = BowlingGame.new
  end

  it "should score 300 on a perfect game" do
    12.times { @game.roll(10) }
    @game.score.should == 300
  end
end
```

By the way, the above is a snippet of my implementation of Robert Martin's Bowling Kata. I was excited enough by the RSpec discussion to try implementing this on my own. Very nice framework. Very nice.

[1]: http://www.daveastels.com/
[2]: http://rubydoes.net/2008/02/21/testing-net-with-ironrubys-mini_rspecrb/
