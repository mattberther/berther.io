---
title: RegSvr32.exe on Vista
disqus_identifier: 2007-01-regsvr32exe-on-vista
comments: true
---

Calling regsvr32.exe against a COM dll will give you a 0x80004005 error from DllRegisterServer. As it turns out, the UAC in Vista was what was causing this.

The way to get around this is to Right Click on Start | All Programs | Accessories | Command Prompt, and click Run as administrator. Once you have the elevated command prompt, you can run the command as you normally would.
