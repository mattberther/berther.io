---
title: DateTime and Quarters
disqus_identifier: 2004-10-datetime-and-quarters
comments: true
---

This has been driving me absolutely up the wall. I'm trying to calculate the fiscal year quarter for a specific date...

I can get the calendar quarter using this formula...

quarter = (month + 2) / 3

* Quarter 1 : 07.01 - 09.30
* Quarter 2 : 10.01 - 12.31
* Quarter 3 : 01.01 - 03.31
* Quarter 4 : 04.01 - 06.30

Your mission, should you choose to accept it, is to write a formula that gets the correct quarter based on the table above. I want a pure formula, no if/else conditions...

*The prize:* I've got a GMail invite for the first one to post a working formula for this problem. Make sure that you leave an email address so that I can send you the GMail invite. Your email address is never shared, nor published on the website.

A hint: (((calendarQuarter + 2) % 4) + 1) works if the FY starts in April.

*Update:* A coworker emailed me privately with the solution to this problem.

``` csharp
public static void Main(string[] args)
{
    for (int month = 1; month <= 12; month++)
    {
        Console.WriteLine("Month {0} is in fiscal quarter {1}", month, GetQuarter(month));
    }
}

private static int GetQuarter(int month)
{
    int calendarQuarter = (month + 2) / 3;
    float f = 2.5f - (float)calendarQuarter;

    return calendarQuarter + ((int)(f / Math.Abs(f)) * 2);
}
```

Thanks, Eric...
