---
title: Providing ActiveRecord validations for non-database models
disqus_identifier: 2008-03-providing-activerecord-validations-for-non-database-models
comments: true
---

The validations provided by the Rails framework are very powerful and provide a very easy, no cost way of validating forms prior to submitting them to the database. You might see the validations in a class this way:

``` ruby
class User < ActiveRecord::Base
  validate_presence_of :name
end
```

If there is not a name entered on the form when creating/updating the user, the save will fail with an error that can be displayed to the user.

I was hoping to leverage this same technique for some other forms that I had in my Rails application. These forms did not have a corresponding model in the database, as they were models that described sending an email. The goal was to provide for some required fields and then check whether or not the form was valid prior to sending the email.

My first pass at this looked like this:

``` ruby
class ContactInformation < ActiveRecord::Base
  attr_accessor :name
  attr_accessor :email_address
  attr_accessor :body

  validates_presence_of :name
  validates_presence_of :email_address
  validates_presence_of :body
end
```

and in the controller:

``` ruby
def send_mail
  @contact_info = ContactInformation.new(params[:email])
  Notification::deliver_contact_form(@contact_info) if @contact_info.valid?
  # error checking omitted for brevity
end
```

This technique did not work, since ActiveRecord makes a database call to define the accessors when `valid?` is called. I needed something a little different, so I looked to Google. I found a solution [here][1] that almost worked for me. What didnt work for me was that in the first piece of code, the behavior was overwritten for *all* ActiveRecord::Base, meaning that the rest of my application would not have database access with ActiveRecord. The second solution on the page seemed way more complicated than I felt that it needed to be. After all, the first solution worked. Using the first technique, I just needed to find a way to limit scope.

A little Ruby metaprogramming led me to this, which I think is an excellent solution to this problem (which I put in $RAILS_APP/lib/active_form.rb).

``` ruby
module ActiveForm
  def self.included(base)
    base.class_eval do
      alias_method :save, :valid?
      def self.columns() @columns ||= []; end

      def self.column(name, sql_type = nil, defaults = nil, null = true)
        columns << ActiveRecord::ConnectionAdapters::Column.new(name.to_s, default, sql_type, null)
      end
    end
  end
end
```

Essentially, what we're doing is using Module.included and Module.class_eval methods to execute code whenever the ActiveForm module is included in another class or model. When the class is evaluated, we alias the save method to the valid method and add a method that allows are model to register columns. This method simply mocks out an ActiveRecord column (without connecting to the database), which basically fools ActiveRecord into thinking there actually is a database table.

The model class is modified slightly from the example above. In addition to including the ActiveForm module, which provides us this functionality, the attr_accessor methods are changed to the column method described above. The model now looks like this:

    class ContactInformation < ActiveRecord::Base
      include ActiveForm

      column :name
      column :email_address
      column :body

      validates_presence_of :name
      validates_presence_of :email_address
      validates_presence_of :body
    end

The controller code works as I initially had written it. And, I get all the joys of the ActiveRecord validations without having a database table for information I dont want to save in the database.

[1]: http://discuss.joyent.com/viewtopic.php?pid=87154
