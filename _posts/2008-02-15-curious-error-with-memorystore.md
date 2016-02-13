---
title: "Curious error with :memory_store"
disqus_identifier: 2008-02-curious-error-with-memorystore
comments: true
---

For the longest time I had been stumbling on errors when trying to log in to my Rails site in development mode. Production worked flawlessly, but for whatever reason, development did not. Isnt that a different thing?

Anyways, the problem was that any of the custom methods I had on my model classes were raising `NoMethodError` when I was trying to invoke them. The strange part was that everything worked well in script/console, and also worked in the application when I changed the method to return a hard instance, rather than one from session. After some time, I remembered that I had set `config.action_controller.session_store = :memory_store` in config/environments/development.rb. For whatever reason, :memory_store did not like storing ActiveRecord derived objects. Removing this line and sticking with :active_record_store defined in environment.rb corrected the problem.

It's probably best to mimic the production environment as close as possible anyway.
