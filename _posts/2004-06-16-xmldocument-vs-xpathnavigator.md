---
title: XmlDocument vs XPathNavigator
disqus_identifier: 2004-06-xmldocument-vs-xpathnavigator
comments: true
---

I have been happily using the XmlDocument object, as it was a natural progression from the MSXML4 object model, which Ive used for years.

However, today, I was unbelievably amazed with the performance differences between XmlDocument and XPathNavigator. For a little demo project, I had a directory full of xml files (11,250 to be exact). The goal was to iterate these files, load each one up, and pull relevant information out of each one to populate a [Lucene.Net][1] index.

I implemented this using an XmlDocument that was loaded up with the contents of each file, and used SelectNodes and SelectSingleNode to get the information I wanted out of the xml file, and then placed those pieces in the index. This took approximately 8.5 minutes to complete.

This just seemed to be way to long, so after doing a bit of looking around online, I came across Dare's article regarding [Best Practices for Representing Xml in the .NET framework][2].

Since I had no need to update the xml, I was left with three APIs. System.Xml.XmlReader, System.Xml.XPath.XPathNavigator, and System.Xml.XmlDocument. I was already using System.Xml.XmlDocument, so that was out of the picture. System.Xml.XmlReader, was also out of the picture, since I needed to be able to use XPath queries to get items out.

That left the XPathNavigator. I went through and updated the code to use the XPathDocument to load the xml, and then passed it off to the method that actually did the parsing. For what its worth, I left the parameter to this method as IXPathNavigable, since both XmlDocument and XPathDocument implement this interface. This way, I could revert back in case the test failed.

I then updated all the code in the parsing method to use the XPathNavigator methods, and eagerly ran the test. All data came back the same, an identical index was created, however, this time it ran in 5.75 minutes.

Absolutely amazing that using a different object model could make *that* big of a difference (right around 2 minutes and 45 seconds).

The key thing to take away from this is that unless you *absolutely* need the editing capabilities of XmlDocument, performance wise, you would be much better to use the XPathNavigator.

[1]:http://sourceforge.net/projects/lucenedotnet
[2]:http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnexxml/html/xml03172004.asp
