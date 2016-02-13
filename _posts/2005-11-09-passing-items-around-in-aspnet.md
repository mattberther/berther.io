---
title: Passing Items around in ASP.NET
disqus_identifier: 2005-11-passing-items-around-in-aspnet
comments: true
---

Wow, something as simple as keeping an item around between requests has proven to be an incredibly tedious task in ASP.NET.

The initial implementation had this identifier stored in Session state. This however, proved to not work as well as we needed it to, because we needed the item to be available even after the session expired.

Next thought was that we could have a base class that registers a hidden field with this identifier and when the page loads, it reads the identifier and reconstitutes the object needed from this id. This worked great until...

Plain anchor (a href) tags. Plain anchor tags obviously dont submit a form to the server, and therefore, my identifier was no longer available.

Seems to be that the only way to keep this identifier persistent across requests *and* sessions is to add the item to *every* querystring and then also register the hidden field (for pages that postback).

What a colossal pain in the ass! The thought of thinking that I could break my entire app if I forget to generate a URL without this identifer in it makes me cringe.

Has anyone done something similar to this before and how have you solved it?
