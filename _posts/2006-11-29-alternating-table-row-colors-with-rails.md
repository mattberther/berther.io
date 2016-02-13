---
title: Alternating table row colors with Rails
disqus_identifier: 2006-11-alternating-table-row-colors-with-rails
comments: true
---

I was looking for a way to alternate table row colors with Ruby on Rails and stumbled across this gem. All you have to do is use the [cycle method on the TextHelper][1].

``` erb
<%- for item in @items do -%>
  <tr class="<%= cycle("even", "odd") %>">
    ... use item ...
  </tr>
<%- end -%>
```

and in the css:

``` css
.even
{
    background: #efefef;
}

.odd
{
    background: #a5a5a5;
}
```

The love affair with Ruby on Rails continues... :)

[1]:http://www.rubyonrails.org/api/classes/ActionView/Helpers/TextHelper.html#M000518
