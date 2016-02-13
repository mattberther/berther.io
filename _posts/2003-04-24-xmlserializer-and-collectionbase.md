---
title: XmlSerializer and CollectionBase
disqus_identifier: 2003-04-xmlserializer-and-collectionbase
comments: true
---

I just want to share some things that I have learned while fighting with getting an XML fragment to deserialize into a CollectionBase derived object. What a nightmare!

The XML fragment is similar to the following:

``` xml
<items>
    <item name='name1' uri='uri1'/>
    <item name='name2' uri='uri2'/>
</items>
```

I first start off with the way that every other class works:

``` csharp
[XmlRoot("items")]
public class ItemCollection : CollectionBase
{
    ... Complete implementation of a typed collection ...
    ... including typed Add method and indexer ...
}

[XmlRoot("item")]
public class Item
{
    ... Implementation of Item properties ...
}
```

This gives the very cryptic error along the lines of there was an error reflecting ItemCollection.  Finally, after some digging, I come across the real cause of the error. XML attributes are not allowed on the type ItemCollection. Why would that be the case? Who knows?

No problem, I think as I remove the XmlRoot attribute from ItemCollection. At this point, Im no longer receiving errors. However, none of my items are being deserialized. Argh!

So, finally I discover the XmlArray and XmlArrayItem elements, which seem to do the trick. The drawback is that I have to have a container class, as these attributes can't be applied to a class. Not necessarily my first choice, but, I suppose it will do.

Final chunk of code:

``` csharp
public class DataContainer
{
    [XmlArray("items")]
    [XmlArrayItem("item", typeof(Item))]
    public ItemCollection Items
    {
        get { return _items; }
        set { _items = value; }
    }
}
```

All in all, I dont see why the serialization of collections is so different for collections as opposed to other classes.
