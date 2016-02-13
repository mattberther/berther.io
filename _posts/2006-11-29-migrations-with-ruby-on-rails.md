---
title: Migrations with Ruby on Rails
disqus_identifier: 2006-11-migrations-with-ruby-on-rails
comments: true
---

I've looked through a number of books and websites in the period of time that I've been becoming more familiar with the stroke of genius that is Ruby on Rails. I've noticed that the majority of the books and websites seem to glance over what I think is probably the single coolest feature of Rails.

Migrations are used as a database agnostic representation of your information schema. You can write your database schema *once* in Ruby code. Using rake's migrate task, you can then have the ruby code translated to MySql, PostgreSQL, or SQLite.

The simplest way to help you understand the power of migrations, I think is to just show you.

The first thing we will want to do is run the script that generates the migration. This should look vaguely familiar to those that have done much with RoR.

``` console
script/generate migration MigrationName
```

For example, let's say I want to add a user. I would go ahead and run

``` console
script/generate migration AddUsersTable
```

This will then generate a ruby file in the folder db/migrate, which takes the format of VERSION_your_migration_name.rb. We'll talk a little more about VERSION later.

If we look at the generated migration file, we'll see something like:

``` ruby
class AddUsersTable < ActiveRecord::Migration
  def self.up
  end

  def self.down
  end
end
```

This new class describes our migration. When we migrate to a new version, the self.up method is used, and when we rollback to a previous version, self.down is used.

Let's fill this out with some code:

``` ruby
class AddUsersTable < ActionRecord::Migration
  def self.up
    create_table :users do |table|
      table.column :name, :string
      table.column :login, :string, :null => false
      table.column :password, :string, :null => false, :limit => 32
    end
  end

  def self.down
    drop_table :users
  end
end
```

What's happening should be fairly apparent. We're able to define every database change in an abstract fashion, and leave it up to the connection adapters to generate the SQL necessary for each platform (MySQL, SQL Server, Oracle, etc).

What types of changes can we make with migrations?

* Add a new table
* Remove a table
* Add columns to existing tables
* Remove/rename columns

Once all the migrations are defined, we can then use rake's migrate task to update the database. `rake migrate` will migrate your database to the current version. `rake migrate VERSION=x` will migrate your database to the specified version. You can completely rollback all changes to the database by using `rake migrate VERSION=0`

I hope I've been able to give you a good introduction to migrations with ruby on rails. If you're not using them yet, you should certainly start. :)
