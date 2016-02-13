---
title: Digital Ocean, Dokku, and SSL/TLS
disqus_identifier: 2014-08-13-digital-ocean-dokku-and-ssltls
comments: true
---

### Background
Heroku powered this website for the past several years. I had no problems with the platform. Deployments were reliable and fast. However, when the time came to add SSL support to the site, Heroku became cost-prohibitive for the volume of traffic this site generates. Protecting the privacy of my readers led me to explore new ways to host this site.

### Requirements
I had a small set of requirements from a hosting platform. It needs to support SSL/TLS, it needs to be fast, and it needs to be inexpensive. I required SSL/TLS support because I wanted to to my part to secure the privacy of visitors. This site runs on a small, [Sinatra](https://sinatrarb.com)-based application. While speed was important, I think that most any host wouldve been able to meet the speed requirement. Last, it needed to be inexpensive -- this site is a hobby for me and I wanted to limit my costs to less than $10 per month.

After doing some exploring and research, I found Digital Ocean ([referral link](https://www.digitalocean.com/?refcode=bf3672992ae5)). Digital Ocean allowed me to configure a 512mb/1cpu instance with 20gb of ssd storage for $5.00/month ($0.007/hour). As this is a full VPS instance, I had the capability of installing whatever I wanted on it (including my SSL certificate). One of the nice things about Digital Ocean is that you can quickly bring up many different applications on your droplet. One of the applications you can install is [Dokku](https://github.com/progrium/dokku), which advertises itself as a mini-Heroku powered by Docker written in less than 100 lines of BASH script.

### Setup
The setup of Dokku and DigitalOcean is straightforward. There is a page on the DigitalOcean site that describes exactly [what you need to do](https://www.digitalocean.com/community/tutorials/how-to-use-the-digitalocean-dokku-application) to set up the infrastructure. After I installed the Dokku application on the DigitialOcean droplet, I needed to set up a remote to the website's git repository. Because I want to deploy to a naked domain (ie: berther.io vs www.berther.io), I needed to name my dokku application the full domain. 

``` console
$ git remote add dokku dokku@berther.io:berther.io
```

Now, whenever I want to publish this website, I push to that new remote with 

``` console
$ git push dokku master
```

The last remaining piece was to add SSL support. I ordered a wildcard certificate from DNSimple ([referral link](https://dnsimple.com/r/075fa436681f4a)). After I received the certificate, I copied the key and the certificate to my DigitalOcean droplet and copied them into my application's tls folder. In this case, that was `~/dokku/berther.io/tls`. Once the files were in place, I redeployed the app. When I redeployed the app, Dokku detected the certificate and set up nginx to accept traffic on the HTTPS (443) port.

### Wrapping Up
At the end of all this, I have my own mini-Heroku with full SSL support for $5/month. This made it easy to secure my little corner of the interwebs. It also makes it easy for you to do -- so what are you waiting for?

