---
title: Creating ISO images from a folder in OSX
disqus_identifier: 2008-12-creating-iso-images-from-a-folder-in-osx
comments: true
---

Yet one other thing I love about OSX is that .iso is a first-class citizen. I'm able to mount/burn iso files without installing any other software (yes, I'm looking at you Windows).

Recently, I had a group of files and folders that I have been transporting around. I had been looking for a way to group these into an ISO so 1) they'd be easier to transport and 2) I could burn them to a CD easier. What I did not know was that with the hdiutil terminal app, I am also able to create an ISO of a folder in OSX without any additional tools.

The syntax is pretty simple:

``` console
hdiutil makehybrid -o ~/Desktop/image.iso ~/path/to/folder/to/be/converted -iso -joliet
```

Mission accomplished.
