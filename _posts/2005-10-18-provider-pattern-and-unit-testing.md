---
title: Provider Pattern and Unit Testing
disqus_identifier: 2005-10-provider-pattern-and-unit-testing
comments: true
---

I've recently wrapped up a project using .NET 2.0 and this project manifested the need to have certain pluggable pieces. For these pieces, I chose to go along with the rest of the .NET 2.0 framework and implemented this using the Provider design pattern.

Following the pattern strictly involves deriving from ProviderBase and then using the ProvidersHelper class to instantiate all the classes from the [configuration section][1].

The ProviderBase class has an Initialize method that gets called by the ProvidersHelper.InstantiateProviders method. The other thing is that you should be creating static methods that delegate to the underlying (previously instantiated) provider. 

Does the Provider pattern lend itself well to unit testing? Let's look at a set of [unit testing rules][2] suggested by Michael Feathers. His last rule is that a test is not a test if you have to do special things to your environment (such as editing config files) to run it.

I'm leaning towards thinking that the extra layer (the class that has all the static methods) is not worth the headache. Would it be better if there was a base class or an interface defined, and then you could test the implementation directly?

Sure, you could test the implementation directly now, but to get the information into it now, you'd have to perform additional setup and pass that off to the Initialize method. The principles of [dependency inversion][3] state that an object should be given its dependencies, rather than asking for them. Given this, it makes sense that these items go into the constructor of the class.

As our company becomes more familiar with the principles of unit testing, I fear that we will fall into this situation more and more. Given what I know now, I will certainly advise against the Provider pattern in favor of an interface/factory class approach, which will also facilitate integration with a dependecy injection container (such as [Castle Windsor][4]).

Are you unit testing providers? Are your experiences similar? Id love to hear about it.

[1]:/2005/06/10/custom-configuration-sections-in-beta-2/
[2]:http://www.artima.com/weblogs/viewpost.jsp?thread=126923
[3]:http://www.martinfowler.com/articles/injection.html
[4]:http://www.castleproject.org/index.php/Container
