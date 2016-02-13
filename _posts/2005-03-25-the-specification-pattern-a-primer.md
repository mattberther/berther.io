---
title: "The Specification Pattern: A Primer"
disqus_identifier: 2005-03-the-specification-pattern-a-primer
comments: true
---

The [Specification pattern][1] is a very powerful design pattern which can be used to remove a lot of cruft from a class's interface while decreasing coupling and increasing extensibility. It's primary use is to select a subset of objects based on some criteria, and to refresh the selection at various times.

For example, I've seen a lot of classes that have interfaces that look something similar to this:

``` csharp
public class User
{
    public string Company;
    public string Name;
    public string City;
}

public class UserProvider
{
    public User[] GetUserByName(string name)
    {
    }

    public User[] GetUsersByCity(string name)
    {
    }

    public User[] GetUsersByCompany(string company)
    {
    }
}
```

Using this model, you can see that every time you want to add a new condition for user retrieval, you have to add a method to the UserProvider class which obfuscates the interface.

Now, lets look at the same example using the specification pattern.

``` csharp
public class User
{
    public string Company;
    public string Name;
    public string City;
}

public class UserSpecification
{
    public virtual bool IsSatisfiedBy(User user)
    {
        return true;
    }
}

public class UserProvider
{
    public User[] GetBySpecification(UserSpecification spec)
    {
        ArrayList list = new ArrayList();

        UserCollection coll = SomeMethodToPopulateTheUserCollection();
        foreach (User user in coll)
        {
            if (spec.IsSatisfiedBy(user))
            {
                list.Add(user);
            }
        }

        return (User[])list.ToArray(typeof(User));
    }
}

class UserCompanySpecification : UserSpecification
{
    private readonly string companyName;

    public UserCompanySpecification(string companyName)
    {
        this.companyName = companyName;
    }

    public override bool IsSatisfiedBy(User user)
    {
        return user.Company.Equals(companyName);
    }
}
```

Using the specification pattern, we have removed all of the specialized methods from the UserProvider class. Also, because of the loose coupling, any time we want an additional condition for user retrieval, we need to only implement a new UserSpecification and pass this instance off to the GetBySpecification method, rather than polluting the existing interface.

This allows the calling code to determine exactly how it wants to filter any given collection, rather than the provider code assuming that it knows how the user wants it.

Of course, there is nothing preventing an API designer from putting a few commonly used specifications into the API itself.

This pattern is very powerful, but like anything can be overused. Make sure to review the consequences in the linked description of the pattern for when you should and shouldnt use this pattern.

[1]:http://www.martinfowler.com/apsupp/spec.pdf
