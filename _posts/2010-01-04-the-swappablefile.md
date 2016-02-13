---
title: The SwappableFile
disqus_identifier: 2010-01-the-swappablefile
comments: true
---

I was doing some testing on a javascript abstraction that we created earlier. In order to test that the validation was being properly called, I wanted to drop in a new target javascript and then use WatiN to execute and validate the various calls to that javascript.

I came up with (what I think is) a neat semantic for doing this. The SwappedFile implements the IDisposable interface, so you can wrap it up nicely in a using statement and make sure that the original file is reverted when completed.

``` csharp
class SwappedFile : IDisposable
{
    private readonly string originalFile;

    public SwappedFile(string originalFile, string newFile)
    {
        if (String.IsNullOrEmpty(originalFile)) throw new ArgumentNullException("originalFile");
        if (String.IsNullOrEmpty(newFile)) throw new ArgumentNullException("newFile");

        this.originalFile = originalFile;

        if (!File.Exists(String.Format("{0}-original", originalFile)))
        {
            File.Move(originalFile, String.Format("{0}-original", originalFile));
        }

        File.Copy(newFile, originalFile, true);
    }

    public void Dispose()
    {
        File.Delete(originalFile);
        File.Move(String.Format("{0}-original", originalFile), originalFile);
    }
}
```

Usage is simple:

``` csharp
using (new SwappedFile("original-file.txt", "new-file.txt"))
{
    // some operations using the new file
}
```

I kinda like this, plus it beats having all of my code cluttered up with file manipulation statements.
