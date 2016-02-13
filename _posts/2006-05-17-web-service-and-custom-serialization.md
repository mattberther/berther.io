---
title: Web service and custom serialization
disqus_identifier: 2006-05-web-service-and-custom-serialization
comments: true
---

Why is it that it seems to be so difficult (if not impossible) to utilize the ISerializable interface when using web services?

I have a number of objects that I do not wish to provide default constructors on that I need to pass back and forth across the web service. I could implement ISerializable on them, but I cant figure out a way to set the serialization mechanism to use SOAPFormatter instead of IXmlSerializable.

I could do something like:

``` csharp
[WebMethod]
public void SaveUser(string userXml)
{
    // create soap formatter and deserialize userXml
}
```

but it seems hackish to do that... What Id like to do is have a hook into the framework that allows me to specify the serialization type, and then I could have

``` csharp
[WebMethod]
public void SaveUser(User user)
{
}
```

The other workaround would be to have two copies of the objects... One that is used only for serialization, but that stinks even more, I think... If I make a change to one, I have to remember to change it in the other. This will end up leading to a maintenance nightmare.

Any suggestions?
