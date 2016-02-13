---
title: MovableType and Trackbacks
disqus_identifier: 2003-05-movabletype-and-trackbacks
comments: true
---

For some reason, MovableType does not auto-rebuild an individual entry when a trackback request comes in. I was finding this frustrating, because the latest information was not always available.

I found a post from Phil Ringalda that details how to modify Trackback.pm so that the entry does get rebuilt when it receives a ping.

Ultimately, it is a very easy update (see below), however, you may still want to make a backup copy of the file prior to modifying it.

Look for the following line in lib/MT/App/Trackback.pm (located at line 199 for MT 2.63):

``` perl
$app->rebuild_indexes( Blog => $blog )
        or return $app->_response(Error =>
            $app->translate("Rebuild failed: [_1]", $app->errstr));
```

and add this line directly below it:

``` perl
if ($tb->entry_id) {
      $app->rebuild_entry( Entry => $entry, BuildDependencies => 0 )
          or return $app->_response(Error =>
            $app->translate("Archive rebuild failed: [_1]", $app->errstr));
    }
```

Im hoping that they add this patch into the main MT development, so that this change doesnt need to happen every time I update.
