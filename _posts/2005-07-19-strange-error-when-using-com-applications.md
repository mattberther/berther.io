---
title: Strange error when using COM+ applications
disqus_identifier: 2005-07-strange-error-when-using-com-applications
comments: true
---

I was working on integrating a COM+ application (service) into my .NET application. The goal was to have this service layer on a different machine and the calling application would use the service over DCOM.

This seemed to be pretty straightforward, but I kept coming up against this very strange error that said, "The component or application containing the component has been disabled".

I scoured the Windows 2003 Component Services Explorer looking for a way to enable my application and/or component, however there was no luck. Finally, I stumbled across the answer which is that the server had been misconfigured.

With Windows 2003, you have to manually enable Network COM+ Access. You can do this with Add/Remove Programs | Add/Remove Windows Components | Application Server | Details | Enable Network COM+ Access.

This was a pretty maddening error to get past and hopefully this helps someone else out.

On another note, I did recently pick up Christian Nagel's book entitled [Enterprise Services with the .NET Framework][1]. What I've read so far is very educational, and this books seems to be a real winner. Great work, Christian.

[1]:http://www.amazon.com/exec/obidos/redirect?path=ASIN/032124673X&amp;link_code=as2&amp;camp=1789&amp;tag=mattbertherco-20&amp;creative=9325
