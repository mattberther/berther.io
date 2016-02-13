---
title: WISE vs InstallShield
disqus_identifier: 2003-08-wise-vs-installshield
comments: true
---

So, Im the proud owner of InstallShield Express at home, which I use for side projects. All in all, I have been very impressed with this little application. Comparatively speaking, Id say the price is fair for it's functionality. It does everything I need to do.

At work, we require more from our installers (ability to create custom dialogs, particularly), so we decided to purchase WISE there.

A rundown of my gripes with WISE:

* Files are updated every single time you hit Save. I have yet to find a way around this. I've turned Always Scan off, to no avail. On a small project, this is not a very big deal. However, on the current web site Im trying to deploy there are over 500 files, and saving the .wsi file takes approximately 3 minutes. Ridiculous.
* Very poor integration with VS.NET. Compared to InstallShield's integration with the VS.NET solution, WISE is prehistoric. With InstallShield, I can select the Primary Output and the Content Output, drag them to a folder, and be done with it. While WISE offers you the choice of getting the output groups, folder heirarchy is *not* preserved, and all files must then be dragged to the appropriate locations.
* A very clunky IDE. Things are done via pop-up dialogs, rather than integrated into the view, or into the VS.NET properties window.
* Dialog editing is a joke. Addition of a new dialog to the sequence yields several frustrating hours of putting it back together just right. Move Up/Move Down features for dialogs would have been *really* nice.
* When you rename your virtual directory as part of your install, the uninstall will remove the default virtual directory's name, without some workaround (ie: writing the property to the registry, and then doing a system search). IMHO, when you check the box that says 'Remove virtual root on uninstall', it should remove the one that was created.

To WISE's credit, there are a few things that I've seen it do that I havent been able to find in InstallShield. First off, WISE has the capability to do SQL statements right through the IDE. Associate a connection string to a batch of SQL statements, and WISE will execute them as part of your install. This is very nice for creating a database schema from your .msi. While Im sure there's a way to do this with InstallShield, I dont think that it is as straightforward.

The other thing that I cant seem to figure out with InstallShield is how to associate creation of an IIS virtual directory with a feature. This, Im sure, is just an oversight on my part.

We have already invested the money for WISE for Visual Studio .NET 5. However, if I knew then what I know now, I would have pushed a lot harder for InstallShield.
