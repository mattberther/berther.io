---
title: Tracking hours using SCRUM
disqus_identifier: 2007-02-tracking-hours-using-scrum
comments: true
---

It has occurred to me recently that business folks in an agile development shop are very anxious to put hours to tasks. Business folks need this data to estimate completion of a certain feature set. However, the data for this comes from the development team. I certainly see why the business needs to have this, but I would propose that what is being asked for is different than what is actually needed.

The business requires hours, however, the developers themselves probably do not care one iota about them. The developers will typically only care about whether or not a task was completed. Having developers track time for agile projects is a major violation of the [Development Abstraction Layer][1].

Therefore, I'd like to remind people what the business people are actually asking for... and that is a team's velocity. This velocity can be measured using whatever economy that team feels comfortable with (acorns, golf balls, story points, tasks, etc). A team will be outputting a certain velocity during the course of its iterations and hours can always be determined from that velocity. 

For example, let's say a team of 5 does 42 "golf balls" during the course of a 2 week iteration. There are 80 developer hours in 2 weeks (a 40 hour week multiplied by 2). 5 developers multiplied by 80 developer hours totals 400 work hours over the iteration. 42 "golf balls" into 400 work hours means that 1 "golf ball" translates into 9.52 hours. Wow! That was easy, and the development team did not need to get into the minutiae.

Will this technique be completely accurate right away? Of course not, as with any sort of estimation, practice needs to be had to make them accurate. Likely, you'll encounter some wild swings as the velocity stabilizes, probably over the course of 3 or 4 iterations. 

Please dont confuse hours for velocity... Let the developers focus on what they should be focusing on, which is developing high quality software, and not tracking hours. The people that are interested in obtaining hours can do so from the velocity and economy that the development team has chosen.

[1]:http://www.joelonsoftware.com/articles/DevelopmentAbstraction.html
