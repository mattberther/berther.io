---
title: Creating a FormsAuthentication compatible MD5 hash
disqus_identifier: 2005-03-creating-a-formsauthentication-compatible-md5-hash
comments: true
---

A very common question that Ive seen come up in the ASP.NET newsgroups is how to make an MD5 hash that is compatible with FormsAuthentication.HashPasswordForStoringInConfigFile.

A typical example for this is when you want to create a hash as part of an installer, where you dont want to include a reference to system.web (to gain access to the FormsAuthentication class).

``` csharp
using System;
using System.Security.Cryptography;
using System.Text;

class PasswordGenerator
{
    public static string GenerateHash(string plainText)
    {
        MD5 md5 = MD5.Create();
        byte[] hashBytes = md5.ComputeHash(Encoding.UTF8.GetBytes(plainText));

        StringBuilder result = new StringBuilder(32);
        foreach (byte b in hashBytes)
        {
            result.Append(b.ToString("x2").ToUpper()); // used to convert each byte to a hex string
        }

        return result.ToString();
    }
}

[TestFixture]
class PasswordGeneratorFixture
{
    [Test]
    public void TestEqual()
    {
        string expected = FormsAuthentication.HashPasswordForStoringInConfigFile("myTestPassword", "md5");
        string actual = PasswordGenerator.GenerateHash("myTestPassword");

        Assert.AreEqual(expected, actual);
    }
}
```

Currently, this only works with the MD5 password format, although the PasswordGenerator class could easily be updated to also support the SHA1 algorithm supported by FormsAuthentication.
