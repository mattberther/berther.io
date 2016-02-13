---
title: Hiding an email address from spam harvesters
disqus_identifier: 2009-01-hiding-an-email-address-from-spam-harvesters
comments: true
---

Using a little css trickery, you can completely hide your email address from spam harvesters. The drawback to this approach is that it will only work on sites that read left-to-right as it uses CSS to reverse the direction of text.

Add this class somewhere in your CSS file.

``` css
span.reverse {
  unicode-bidi: bidi-override;
  direction: rtl;
}
```

At the point that you are ready to present the email address, code it in your HTML, but just key it in backwards. For example:

``` html
<span class="reverse">moc.rehtrebttam@retsambew</span>
```

The CSS above will then override the reading direction and present the text to the user in the correct order.

Pretty clever technique.
