---
title: Need an SSL certificate to develop with?
disqus_identifier: 2004-11-need-an-ssl-certificate-to-develop-with
comments: true
---

There may be times when you encounter an issue that only manifests itself in an SSL environment. We just had one of these recently. When this happens, it helps to have a certificate that you can install on your development machine. Once you have that certificate installed, you can debug your application through an SSL layer.

As I said, we had one of these issues recently. I didnt have easy access to a certificate server to create a new certificate and therefore had to look for other options.

The first option I found was installing Perl and OpenSSL and creating the certificate that way. Uh. No. I dont have anything against Perl, but that seemed way too much work.

After digging a little bit more, I found the [IIS 6.0 Resource Kit][1]. Even though it's titled the IIS 6.0 resource kit, there are some tools in this kit that do work with Windows XP. The tool from this kit that I was after was called SelfSSL. Simply stated, this tool creates and installs a certificate to the local IIS server. 

All I needed to do was type SelfSSL.exe from the installed directory. This is significantly easier than the Perl/OpenSSL option, with the same results.

[1]:http://www.microsoft.com/downloads/details.aspx?FamilyID=56fc92ee-a71a-4c73-b628-ade629c89499&amp;displaylang=en
