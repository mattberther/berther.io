---
title: The importance of CultureInfo
disqus_identifier: 2005-03-the-importance-of-cultureinfo
comments: true
---

The latest issue of the MSDN magazine offers a wonderful article by Michael Kaplan entitled "[Make the .NET World a Friendlier Place With the CultureInfo class][1]". In this article Michael shows the many possible uses of this class, as well as how to choose the correct one.

I think that CultureInfo is one of the more important, and yet less understood classes in the .NET framework.

Let me give an example of its importance. In a project that Im working on, we have a tiny data object that just holds some information about a specific piece of data. One piece of this information is a DateTime that details when this data should expire.

The requirement was that for any new pieces, we want them to expire on a specific date, allowing the user the capability to change this date. What we did was something similar to this:

``` csharp
class MyDataObject
{
    private DateTime expireDate;

    public MyDataObject()
    {
        expireDate = DateTime.Parse("12/31/2099");
    }
}
```

Ok. Granted, I could have done this differently by using one of the DateTime constructors. However, Im kind of glad I didn't, because otherwise I would not have discovered how important the CultureInfo class is.

This class was working great. It passed all of our testing with flying colors. We deployed and no issues. One day our support staff received a phone call from a client. Every time they attempted to create a new piece of data, the application would throw an exception about an invalid date format.

I had looked through the code and could see nothing out of the ordinary, and of course was unable to reproduce this on my development environment. After some more troubleshooting, I found out that this client happened to be in the United Kingdom. For those of you unfamiliar, the United Kingdom (and most European nations) have a DateTime format of DD/MM/YYYY.

Given my code above, it was attempting to parse the 12th day of the 31st month, because that Parse method was using the current culture. Clearly this should throw an error. The resolution to the issue was to pass CultureInfo.InvariantCulture to the Parse method.

When you're taking a string that is purely data, rather than written words in the default culture, you need to be careful to treat it with the invariant culture. Most routines that have culture dependent behavior (String.ToUpper, String.ToLower, String.Compare, DateTime.Parse) will give you the opportunity to pass in the culture directly. Passing in CultureInfo.InvariantCulture is the way to make sure that your data parsing and comparison operations are correct.

CultureInfo.InvariantCulture should be used by methods that require culture independent results. Otherwise, it produces results that may be culturally inappropriate or linguistically incorrect.

[1]:http://msdn.microsoft.com/msdnmag/issues/05/03/CultureInfo/
