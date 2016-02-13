---
title: XmlSerializer
disqus_identifier: 2003-09-xmlserializer
comments: true
---

Today I stumbled across a post from Douglas Purdy that talked about [diagnostic switches for the XmlSerializer][1].

Create an application configuration file with the following contents:

``` xml
<configuration>
   <system.diagnostics>
      <switches>
         <add name="XmlSerialization.Compilation" value="1" />
      </switches>
   </system.diagnostics>
</configuration>
```

By doing this, you will have some files that are created and retained in your %TEMP% directory.

* xxxx.cmdline -- contains the command line used to compile the command
* xxxx.0.cs and xxxx.out -- contains the output of the compile command
* xxxx.err -- contains any error messages output by the command
* xxxx.pdb -- contains debugging symbols

[1]:http://www.gotdotnet.com/team/douglasp/default.aspx?key=2003-02-10T08:00:00Z
