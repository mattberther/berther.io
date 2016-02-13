---
title: How to write unmaintainable code
disqus_identifier: 2004-04-how-to-write-unmaintainable-code
comments: true
---

I stumbled across this [gem][1] the other day. Hopefully, you'll find it as funny as I did.

Some of my favorites:

* Rigidly follow the guidelines about no goto, no early returns, and no labelled breaks especially when you can increase the if/else nesting depth by at least 5 levels.</li>
* Make sure that every method does a little bit more (or less) than its name suggests. As a simple example, a method named isValid(x) should as a side effect convert x to binary and store the result in a database.
* Pepper the code with comments like /* add 1 to i */ however, never document wooly stuff like the overall purpose of the package or method.
* You don't need great skill to write unmaintainable code. Just leap in and start coding. Keep in mind that management still measures productivity in lines of code even if you have to delete most of it later.

[1]:http://mindprod.com/unmain.html
