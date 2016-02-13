---
title: Problems running cucumber with nokogiri
disqus_identifier: 2009-09-problems-running-cucumber-with-nokogiri
comments: true
---

I installed cucumber last night and began trying to get some of the scenarios to work. One thing that kept plaguing me was the error message that kept coming up about using an old version of libxml2:

> HI. You're using libxml2 version 2.6.16 which is over 4 years old and has plenty of bugs. We suggest that for maximum HTML/XML parsing pleasure, you upgrade your version of libxml2 and re-install nokogiri. If you like using libxml2 version 2.6.16, but don't like this warning, please define the constant I_KNOW_I_AM_USING_AN_OLD_AND_BUGGY_VERSION_OF_LIBXML2 before requiring nokogiri.

It turns out that this was relatively simply to correct on OSX Leopard by executing the following commands:

``` console
sudo gem uninstall nokogiri
curl -O ftp://xmlsoft.org/libxml2/libxml2-2.7.3.tar.gz
tar -zxvf libxml2-2.7.3.tar.gz
cd libxml2-2.7.3
./configure
make
sudo make install
sudo gem install nokogiri -- --with-xml2-include=/usr/local/include/libxml2 --with-xml2-lib=/usr/local/lib
```

Although I did not see any problems from using the old version, I did get frustrated by receiving the error all the time. Problem solved.
