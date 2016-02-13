---
title: Rails applications and 500 errors
disqus_identifier: 2008-03-rails-applications-and-500-errors
comments: true
---

The default scaffolding generated for a model has the capability of throwing a number of exceptions, resulting in a 500 level response status being sent to the client. The largest cause of these exceptions is the default behavior of ActiveRecord::Base.find. If find can't locate a record that matches the user-supplied identified, then the method throws an ActiveRecord::RecordException. Take a look at the default code generated for a controller utilizing a User model.

``` ruby
def show
  @user = User.find(params[:id])
end
```

Fairly straightforward, and without looking at any edge cases, it's very clear, clean and concise code. As you probably expected, Rails created something that lets you easily work around this. The dynamic finder methods do not throw exceptions, rather they return nil if a record is not found. If you haven't learned about the dynamic finder methods, you should really [learn more about them][1]. By rewriting the generated scaffold code slightly, we are able to present a friendly message to the end user letting them know that a record was not found.

``` ruby
def show
  @user = User.find_by_id(params[:id])
  render(:file => 'public/404.html', :layout => true, :status => 404) and return unless @user
end
```

As you can see, the render method has the capability of setting the layout, so you can have a nice consistent look and feel across your 404 page, as well as the status code which signifies to the browser that the resource was not found.

This new code is validated by these rspec tests:

``` ruby
describe "Given a request to show an invalid user id" do
  setup do
    User.stub!(:find_by_id)
    get :show, :id => "invalid"
  end

  it "should not assign a user"
    assigns[:user].should == nil
  end

  it "should return a status of 404" do
    response.headers["Status"].should == "404 Not Found"
  end

  it "should render a 404 file" do
    response.should render_template("public/404.html")
  end
end
```

This little technique will certainly help keep the size of the production log file down as well as present a nice interface to your users should a request for an invalid record id come in.

[1]:http://railscasts.com/episodes/2
