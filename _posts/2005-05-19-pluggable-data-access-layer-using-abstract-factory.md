---
title: Pluggable Data Access Layer using Abstract Factory
disqus_identifier: 2005-05-pluggable-data-access-layer-using-abstract-factory
comments: true
---

Recently, I made some changes to an application that I have been working on. The requirement was to support different data stores. As written, the application only supported MS SQL Server. I had hoped to allow this application to run on top of an Oracle database or even a pile of xml sitting on the file system.

To do this, I needed to find a way to abstract the implementation of the Data Access Layer (DAL) from the rest of the program. The approach I came up with involved the [Data Mapper][1] pattern and [Abstract Factory][2].

For the Data Mapper implementation, I created a CRUD interface for each table in my database. I already had objects defined around the individual rows in the table (ie: Person, Role, etc), so I did not need to do that. Using the Northwind database, I had an interface that looked something like this:

``` csharp
public class Customer
{
    // omitted for brevity
}

public interface ICustomerMapper
{
    Customer FindById(string id);
    void Save(Customer customer);
    void Remove(Customer customer);
}
```

The next step in achieving the pluggable DAL is to create a concrete implementation for the ICustomerMapper. We can create as many implementations for this as we need (ie: OracleCustomerMapper, SqlCustomerMapper, XmlCustomerMapper).

``` csharp
public class SqlCustomerMapper : ICustomerMapper
{
    // implementation omitted for brevity
}
```

Once we have our implementations in order, the last thing we need to do is author the abstract factory that our application can use to get at the implementations.

``` csharp
public abstract class NorthwindDataFactory
{
    public abstract ICustomerMapper CustomerMapper { get; }
    public abstract IOrdersMapper OrdersMapper { get; }
    public abstract IRegionMapper RegionMapper { get; }
    // remaining data mappers omitted for brevity

    public virtual void Initialize(IDictionary config)
    {
    }

    public static NorthwindDataFactory NewInstance()
    {
        string providerType = ConfigurationSettings.AppSettings["dataProviderType"];
        Type type = Type.GetType(providerType, true);
        return (NorthwindDataFactory)Activator.CreateInstance(type);
    }
}

public class SqlNorthwindDataFactory : NorthwindDataFactory
{
    public override ICustomerMapper CustomerMapper { get { return new SqlCustomerMapper(); } }
    public override IOrdersMapper OrdersMapper { get { return new SqlOrdersMapper(); } }
    public override IRegionMapper RegionMapper { get { return new SqlRegionMapper(); } }
}
```

The heart of the abstract factory lies in the NewInstance method. This method uses a configuration setting from the application's configuration file and uses reflection to instantiate the appropriate implementation. You'll notice that the base class also has an Initialize method, which can be used to provide any additional configuration items to the concrete factory implementations.

In my particular case, I've defined a custom configuration section and am using child nodes to pass values such as connection string into the sql specific factory, and a file path into the xml specific factory.

The best part of this is that anywhere I want to use data services in my application now, I do the following, for example:

``` csharp
ICustomerMapper mapper = NorthwindDataFactory.NewInstance().CustomerMapper;
Customer customer = mapper.FindById("someId");
```

You see here that the application has no concept of the data storage mechanism. Clients that do not wish to maintain a sql server license can use the xml data factory. Clients that only have an Oracle installation can use the Oracle data factory. The factories get plugged in at runtime with no changes at all to the main application.

I've been looking for a clean DAL design for the past year and a half, and I think this design encompasses the best of all worlds.

[1]:http://www.martinfowler.com/eaaCatalog/dataMapper.html
[2]:http://c2.com/cgi/wiki?AbstractFactoryPattern
