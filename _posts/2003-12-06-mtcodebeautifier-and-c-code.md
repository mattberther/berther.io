---
title: MTCodeBeautifier and C# code
disqus_identifier: 2003-12-mtcodebeautifier-and-c-code
comments: true
---

I just finished installing Sean Voisen's [MTCodeBeautifier][1] to colorize the code on this site.

MTCodeBeautifier is a MovableType plugin uses the [Beautifier][2] Perl scripts behind the scenes. Out of the box, the plugin supports PHP3, Java, Perl, Scheme and ActionScript.

The majority of the code I post is C#, so I had to make some changes to allow for this.

First of all, you will need to download the HFile for CSharp. I had a tough time finding this, so I'll make it available for you [here][3]. Once you have this, place it in the HFile folder underneath your MTCodeBeautifier installation.

In the beautifier.pl script, add the following lines of code:

``` perl
sub highlight_csharp
{
    require Beautifier::Core;
    require Output::HTML;
    require HFile::HFile_csharp;
    my $hf = new HFile::HFile_csharp;
    $hf->{notrim} = 1;
    my $highlighter = new Beautifier::Core($hf, new Output::HTML);
    return $highlighter-&gt;highlight_text($_[0]);
}
```

Also, in beaufitier.pl, find sub beautifier, and add the following directly after the check for `$language eq "scheme"`:

``` perl
elsif ( $language eq "csharp" )
{
    $result = highlight_csharp($builder->build($ctx, $tokens));
}
```

MTCodeBeautifier adds the following style elements to the output, which you can customize by editing your CSS template. The relevant portion of my CSS template currently looks like this:

``` css
.linecomment { color: green; }
.blockcomment { color: green; }
.prepro { color: #0000BB; }
.select {}
.quote { color: red; }
.category1 { color: blue; font-weight: bold; }
.category2 { color: blue; }
.category3 { color: blue; }
```

From here, if you use Brad Choate's MTMacro module, you should be good to go with the instructions listed on the MTCodeBeautifier page.

However, if you would like to integrate with Brad Choate's [MT-Textile 2.0 beta][4], you will need to follow another step.

Open up the Textile.pm file in the bradchoate folder, and add the following snippet underneath the big if block in sub highlight:

``` perl
elsif ($lang =~ m/csharp/i) {
    $code = Voisen::CodeBeautifier::highlight_csharp($code);
}
```

With the above modification to MT-Textile 2.0 beta, you will be able to colorize C# code in your MovableType posts.

[1]:http://voisen.org/archives/projects/000239.php
[2]:http://www.beautifier.org/
[3]:/uploads/2003/12/HFile_csharp.pm
[4]:http://www.bradchoate.com/past/001602.php#001602
