---
title: Cheese Head Award
disqus_identifier: 2006-08-cheese-head-award
comments: true
---

Every single one of us has written cheesy code at one time or the other in our life. Our team, in good-natured fun, has decided to "reward" the person that commits a piece of cheese to our Subversion repository.

Sometimes, the cheese is warranted; let's say to get around a vendor issue. Our latest application involved rendering PDFs to the client screen via a smart client. We decided to use the TallPDF component suite for PDF creation and presentation. For the most part, these worked out really well. However, an issue was discovered that occasionally (*very occasionally*), the PDF would not update unless the mouse was bumped.

So, our developer wrote some code to nudge the mouse one pixel, just to get the PDF to display on the screen. On his 1920x1200 display, it was unnoticeable. However, the target resolution was 1024x768, so on the initial commit, we were *really* able to notice the nudge in the test environment. However, after some fine tuning, you can hardly notice anymore. With any luck, a fix from Tall Components will be forthcoming and we can remove it from our codebase.

All that said, this fix cracked enough of us up (not in a bad way) that we decided to order a [cheesehead hat][1] for him. We happened to order the 'Top Cheese' hat, but any of these would do.

[1]:http://www.cheesehead.com/products-all.asp
