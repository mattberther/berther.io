---
title: Business Layer Deployment
disqus_identifier: 2004-09-business-layer-deployment
comments: true
---

One of the things that I've been thinking about quite a bit lately is what type of deployment model best fits into an n-tier architecture.

There are obviously several ways we can deploy a business layer for an application.

We could just go 1 tier and intersperse our business logic with our data layer. This is *clearly* the wrong solution for 99% of projects. The only time that I could even begin to see a justification for something like this is a quick prototype. If this prototype makes it to production (as most do), then this needs to be refactored into one of the other designs.

We could develop our business objects and related data access code in the same assembly as our main project. Ideally, this would probably be in a separate namespace, such as MyProject.Data.

Lastly, we could develop an assembly that contains all of our business objects and data access code that our main project needs and then reference that assembly from the main project.

Typically, I have developed business layers using the third model that I've discussed. The argument for this is that the business objects are reusable by another project. Fair enough... in theory. In practice, I've usually worked on fairly standalone products, so reuse of business objects and data access classes doesnt happen that much.

So, here's my conundrum... 

When creating an application from the ground up, is there any advantage to externalizing your business layer? Is there a disadvantage to factoring it out of your project at a later point in time if you need it?
