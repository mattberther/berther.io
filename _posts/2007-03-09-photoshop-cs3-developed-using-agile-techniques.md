---
title: Photoshop CS3 developed using agile techniques
disqus_identifier: 2007-03-photoshop-cs3-developed-using-agile-techniques
comments: true
---

For those unfamiliar, Adobe Photoshop is the de-facto standard in image editors, and the CS3 release is version 10 of this product, which has needed to be re-tooled to provide support for a whole new processor architecture (a universal binary for Mac OSX).

For years the Adobe Photoshop team has been trying to get away from the traditional death march to a more agile development style. For its [CS3][1] release, it made the jump, with the help of VP Dave Story. The result? More weekends off, and a third fewer bugs to fix. Mary Branscombe quizzed co-architect Russell Williams on [how they did it][2].

The intriguing portion of the article for me is how they handle deployments and iterative drops for "demos" (emphasis mine):

> *Did it change the way you put out betas?*

> An *automatic process* builds the program *every night* and runs a set of tests before posting the build on our internal servers for QE to test. We could take almost any of those daily builds and use them for demos.
 
>The public beta was basically just "whatever build is ready on date X". There were only a couple of "we really gotta fix this before we send out the public beta" bugs. With past versions, we couldn't have done a public beta at all that far ahead of release - there would have been far too many bugs.

>We weren't swamped with a pile of bugs from the hundreds of thousands of people who downloaded - it really was in the good shape we thought it was. With *several hundred thousand downloads*, there were *fewer than 25 new bugs found*.

Definitely an interesting read!

[1]:http://labs.adobe.com/technologies/photoshopcs3/
[2]:http://www.regdeveloper.co.uk/2007/03/08/adobe_cs3_development/
