---
title: Serializing an IDictionary object
disqus_identifier: 2004-06-serializing-an-idictionary-object
comments: true
---

As of late, I really try to stay away from the XmlSerializer object, as I have found its limitations to be quite hindering in a lot of things I try to do.

One of the major drawbacks to this class is the serialization of an IDictionary based object. Every time that I need to do this, I end up looking towards [Aaron Skonnard's column][1] in the MSDN Magazine.

He details a fairly simple implementation that allows you to serialize an IDictionary by wrapping it in a custom object that implements IXmlSerializable.

I took his code and added a few convenience methods and present them here (mostly for my reference later). Enjoy!

``` csharp
class DictionarySerializer : IXmlSerializable
{
    private IDictionary dictionary;

    public DictionarySerializer()
    {
        this.dictionary = new Hashtable();
    }

    private DictionarySerializer(IDictionary dictionary)
    {
        this.dictionary = dictionary;
    }

    public static void Serialize(IDictionary dictionary, Stream stream)
    {
        DictionarySerializer ds = new DictionarySerializer(dictionary);
        XmlSerializer xs = new XmlSerializer(typeof(DictionarySerializer));
        xs.Serialize(stream, ds);
    }

    public static IDictionary Deserialize(Stream stream)
    {
        XmlSerializer xs = new XmlSerializer(typeof(DictionarySerializer));
        DictionarySerializer ds = (DictionarySerializer)xs.Deserialize(stream);
        return ds.dictionary;
    }

    XmlSchema IXmlSerializable.GetSchema()
    {
        return null;
    }

    void IXmlSerializable.ReadXml(XmlReader reader)
    {
        reader.Read();
        reader.ReadStartElement("dictionary");
        while (reader.NodeType != XmlNodeType.EndElement)
        {
            reader.ReadStartElement("item");
            string key = reader.ReadElementString("key");
            string value = reader.ReadElementString("value");
            reader.ReadEndElement();
            reader.MoveToContent();
            dictionary.Add(key, value);
        }
        reader.ReadEndElement();
    }

    void IXmlSerializable.WriteXml(XmlWriter writer)
    {
        writer.WriteStartElement("dictionary");
        foreach (object key in dictionary.Keys)
        {
            object value = dictionary[key];
            writer.WriteStartElement("item");
            writer.WriteElementString("key", key.ToString());
            writer.WriteElementString("value", value.ToString());
            writer.WriteEndElement();
        }
        writer.WriteEndElement();
    }
}
```

[1]:http://msdn.microsoft.com/msdnmag/issues/03/06/XMLFiles/
