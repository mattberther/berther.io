---
title: Uploading files to a database using Rails
disqus_identifier: 2007-10-uploading-files-to-a-database-using-rails
comments: true
---

Not long ago, I needed a way for users to upload files and store them in a database. The platform for the application was Ruby on Rails, and I wanted to share my experience here.

The first thing we want to do is generate the table for the attachments:

``` console
script/generate model Attachment
      exists  app/models/
      exists  test/unit/
      exists  test/fixtures/
      create  app/models/attachment.rb
      create  test/unit/attachment_test.rb
      create  test/fixtures/attachments.yml
      create  db/migrate
      create  db/migrate/001_create_attachments.rb
```

This line does a number of things for us, including generating the model class, an associated unit test and fixture, as well as a migration class. The next thing we want to do is fill out the migration class so that we can create the database table. In our case, we will need a filename, content_type and attachment column.

``` ruby
class CreateAttachments < ActiveRecord::Migration
  def self.up
    create_table :attachments do |t|
	    t.column :filename, :string
	    t.column :content_type, :string
	    t.column :data, :binary
    end
  end

  def self.down
    drop_table :attachments
  end
end
```

Let's now run this migration to create the table in our database:

``` console
rake db:migrate
(in /Users/mattb/Projects/Attachments)
== CreateAttachments: migrating ===============================================
-- create_table(:attachments)
   -> 0.0218s
== CreateAttachments: migrated (0.0220s) ======================================
```

The next thing that we'll need to do is to create a controller to process the submitted attachment.

``` console
script/generate controller Attachments show create
      exists  app/controllers/
      exists  app/helpers/
      create  app/views/attachments
      exists  test/functional/
      create  app/controllers/attachments_controller.rb
      create  test/functional/attachments_controller_test.rb
      create  app/helpers/attachments_helper.rb
      create  app/views/attachments/show.rhtml
      create  app/views/attachments/create.rhtml
```

``` ruby
class AttachmentsController < ApplicationController
  def show
    @attachment = Attachment.find(params[:id])
    send_data @attachment.data, :filename => @attachment.filename, :type => @attachment.content_type
  end

    def create
    return if params[:attachment].blank?

    @attachment = Attachment.new
    @attachment.uploaded_file = params[:attachment]

    if @attachment.save
	    flash[:notice] = "Thank you for your submission..."
	    redirect_to :action => "index"
    else
	    flash[:error] = "There was a problem submitting your attachment."
	    render :action => "new"
    end
  end
end
```

The relevant snippet of the view code that utilizes this is in new.rhtml:

``` erb
<% form_tag 'create', :multipart => true do %>
  <%= file_field_tag 'attachment' %>
  <%= submit_tag "Send Attachment" %>
<% end %>
```

The important parts of the view are the multipart declaration; without this, your file will not be submitted. Also, we take advantage of the file_field_tag helper method to output the file browser.

If we run the application now and try to upload a file, we will be presented with an error, because the uploaded_file method does not exist on the Attachment model. Let's complete our model.

``` ruby
class Attachment < ActiveRecord::Base
  def uploaded_file=(incoming_file)
    self.filename = incoming_file.original_filename
    self.content_type = incoming_file.content_type
    self.data = incoming_file.read
  end

  def filename=(new_filename)
    write_attribute("filename", sanitize_filename(new_filename))
  end

  private
  def sanitize_filename(filename)
    #get only the filename, not the whole path (from IE)
    just_filename = File.basename(filename)
    #replace all non-alphanumeric, underscore or periods with underscores
    just_filename.gsub(/[^\w\.\-]/, '_')
  end
end
```

The meat of this model is the uploaded_file method, which the controller calls, passing the uploaded file. This method is responsible for mapping the incoming file to the attributes expected by our database schema. Additionally, we're sanitizing the filename, so that we are not only getting just the filename, but we're also cleaning up any extra characters and replacing them with underscores.

I'll leave it as an exercise for the reader to associate the attachment with a given user. The "magic" of Rails makes this really straightforward.
