---
title: Sometimes the problem is in your tests
disqus_identifier: 2009-02-sometimes-the-problem-is-in-your-tests
comments: true
---

I was TDDing a new website that I've been working on last night and got caught in the interesting predicament where the tests failed, but the production code worked. For the life of me, I could not figure out why my test was failing. It turns out, I missed a tiny little piece of documentation on how [shoulda][1] works.

By the way, before we get into this, if you are writing Ruby code and writing tests (you are, arent you?), do yourself a favor and check out the [shoulda][1] library. Excellent work from the great folks at thoughtbot.

``` ruby
context "with valid attributes" do
  setup do
    @user = Factory.create(:user)
    @updated_attributes = Factory.attributes_for(:user)

    put :update, :id => @user.id, :user => @updated_attributes
  end

  should_not_change "User.count"
  should_respond_with :success
  should_redirect_to 'root_url'
end
```

For quite some time, every test was passing with the exception of `should_not_change "User.count"`. After consulting the documentation and source code for shoulda, I realized what should_not_change was actually doing.

The should_not_change macro was evaluating the User.count statement *PRIOR* to the setup method executing and stored the result in a variable. Then when the test executes, it evaluated the User.count statement again. Since the Factory.create call in the setup method created a new instance in the database, of course, User.count would change.

To get around this particular example, I ended up having to create a nested context to make the test pass. I dont necessarily like this, but it does get the test to pass and gives me an opportunity to change it if someone has a better solution.

``` ruby
context "updating User information" do
  setup do
    @user = Factory.create(:user)
    @updated_attributes = Factory.attributes_for(:user)
  end

  context "with valid attributes" do
    setup { put :update, :id => @user.id, :user => @updated_attributes }

    should_not_change "User.count"
    should_respond_with :success
    should_redirect_to 'root_url'
  end
end
```

Indeed, sometimes the problem lies in your tests.

[1]: http://thoughtbot.com/projects/shoulda/
