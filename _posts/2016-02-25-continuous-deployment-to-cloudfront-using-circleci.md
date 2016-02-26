---
title: Continuous Deployment to CloudFront Using circleci
disqus_identifier: 2016-02-25-continuous-deployment-to-cloudfront-using-circleci
comments: true
---

Historically, I used a dynamic publishing engine to host this site. The engine would reside on a server that I was responsible for maintaining -- both security patches and uptime. Recently though, I made the switch to using the [AWS CloudFront](https://aws.amazon.com/cloudfront/) platform to make this site available on the Internet. Key benefits from this approach include:

* **Edge locations around the world.** When someone requests a file from this site, the request is automatically routed to a copy of the file at a data center nearest the visitor, which results in faster download times.
* **Availability.** When [https://matt.berther.io](https://mattberther.io) goes down, a massive team of people from AWS are working on correcting the problem.
* **Cost.** I pay only for the S3 storage and CloudFront bandwidth I use. Last month, my spend to provide this site's content in data centers around the world was a whopping $0.64.

As I made the transition, I created this site using Jekyll and host the repository on [github](https://github.com/mattberther/berther.io). I wanted to make sure that when I update the github repository that changes are automatically pushed out so visitors receive the most up-to-date version of the site. To do this, I leverage [circleci](https://circleci.com) which is a continuous integration platform that follows my github repository and performs actions when changes are pushed.

This post describes the steps I took to configure circleci to send my changes out to CloudFront. 

1. Install and configure the s3_website gem
2. Follow your github project with circleci
3. Configure the test and deployment commands
4. Push your project to github

#### Install and Configure the s3_website gem
The `s3_website` gem is available on [github](https://github.com/laurilehmijoki/s3_website). Add it to your project's Gemfile with `gem 's3_website'`. The documentation page for the gem is pretty comprehensive and describes the various configuration options. At minimum, you'll need to perform the following steps:

* Run `s3_website cfg create` to generate the `s3_website.yml` file
* Modify the `s3_website.yml` file to suit your configuration
* Run `s3_website cfg apply` to configure your S3 bucket to function as a website

At minimum, your configuration file will need to have the following elements to support a CloudFront distribution. 

``` yaml
s3_id: <%= ENV['S3_ACCESS_KEY'] %>
s3_secret: <%= ENV['S3_SECRET_KEY'] %>
s3_bucket: <%= ENV['S3_BUCKET'] %>

cloudfront_distribution_id: <%= ENV['AWS_CLOUDFRONT_ID'] %>
```

Note that you can use ERB in your yaml file, so _please_ make sure you're using environment variables to store sensitive information. You'll want to make sure that these items don't end up available in your github repository. For a more comprehensive configuration, you can view [the file this site uses](https://github.com/mattberther/berther.io/blob/master/s3_website.yml).

#### Follow the github project with circleci
To have circleci listen for changes to your github repository, login to your circleci account and select 'Add Projects' from the left sidebar. Select the GitHub account and then the repository you're interested in following. This should start the project building. However, before the build succeeds, we'll need to configure the test and deployment commands.

#### Configure the test and deployment commands
Within your circleci project, select settings and `Test Commands`. In the post-test commands section, type `bundle exec jekyll build`. This tells the circleci environment to build your jekyll site.

Via the website, you can configure deployments using Heroku or AWS CodeDeploy. However, since we'll be deploying to S3 and CloudFront, we need to configure a custom deployment to use the s3_website gem we configured earlier. To tell circleci to use this command, create a `circle.yml` file in the root of your github project with the following contents.

``` yaml
deployment:
  aws:
    branch: master
    commands:
      - bundle exec s3_website push
```

#### Push your project to github
Using your preferred technique, push your repository to github. In under a couple minutes from pushing the changes to github, your changes are live on the interwebs.
