---
title: Validating HABTM relationships with Rails 3.x
disqus_identifier: 2012-09-validating-habtm-relationships-with-rails-3x
comments: true
---

There comes a time as you build up a rails application that you end up using the has_and_belongs_to_many (HABTM) macro. This macro is an easy way to create a many-to-many relationship between two of your ActiveRecord models.

In some cases you may want to validate that association. However, the traditional methods for validating rails models do not work.

The unit tests below described how I wanted the relationship to function.

``` ruby
class ProjectTest < ActiveSupport::TestCase
  setup do
    @project = Project.new()
  end

  test "may have many developers" do
    4.times { @project.developers << FactoryGirl.create(:developer) }
    assert @project.save
  end

  test "must have at least one developer" do
    @project.save

    assert_equal 1, @project.errors.count
    assert_not_nil @project.errors[:developers]
  end
end
```

In my case, I was hoping to validate that each project had at least one developer associated to it. Initially, I coded my models to make the first test pass.

``` ruby
class Developer < ActiveRecord::Base
end

class Project < ActiveRecord::Base
  has_and_belongs_to_many :developers
end
```

To make the second test pass, I tried to implement a custom active record validator.

``` ruby
class Project < ActiveRecord::Base
  has_and_belongs_to_many :developers

  validate :minimum_number_of_developers

private
  def minimum_number_of_developers
    errors.add(:developers, "must have at least on developer") if developers.count < 1
  end
end
```

This, however, does NOT work with HABTM relationships. The way that these relationships work is that the associated property is not available until after the record is saved.

To get around this, we can validate as part of the after_save callback. Validating here and returning false from the callback will rollback the entire transaction.

``` ruby
class Project < ActiveRecord::Base
  has_and_belongs_to_many :developers

  after_save :validate_minimum_number_of_developers

private
  def validate_minimum_number_of_developers
    if developers.count < 1
      errors.add(:developers, "must have at least on developer")
      return false
    end
  end
end
```

The test passes with the code above.
