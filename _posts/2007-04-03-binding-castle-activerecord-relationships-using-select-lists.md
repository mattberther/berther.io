---
title: Binding Castle ActiveRecord relationships using select lists
disqus_identifier: 2007-04-binding-castle-activerecord-relationships-using-select-lists
comments: true
---

Consider the following data class:

``` csharp
[ActiveRecord("states")]
public class State : ActiveRecordBase<State>
{
	private string name = String.Empty;
	private string abbreviation = String.Empty;

	[PrimaryKey(PrimaryKeyType.Assigned, "name")]
	public string Name
	{
		get { return name; }
		set { name = value; }
	}

	[Property]
	public string Abbreviation
	{
		get { return abbreviation; }
		set { abbreviation = value; }
	}

	public static State[] FindAllOrderedAlphabetically()
	{
		return FindAll(new Order[] {Order.Asc("Name")});
	}

	public override bool Equals(object obj)
	{
		if (this == obj) return true;
		State state = obj as State;
		if (state == null) return false;
		return Equals(name, state.name) && Equals(abbreviation, state.abbreviation);
	}

	public override int GetHashCode()
	{
		return (name != null ? name.GetHashCode() : 0) + 29*(abbreviation != null ? abbreviation.GetHashCode() : 0);
	}

	public override string ToString()
	{
		return name;
	}
}
```

This is a pretty straightforward ActiveRecord class. The problem comes when you set up a relationship and try to bind this to a select list. A multi-select list comes back as an array of Strings. This clearly can not be bound to a list of State objects. How do you get around this?

As usual, the guys at Castle have already thought about situations like this, and have introduced support for System.ComponentModel.TypeConverter implementations for DataBinding.

``` csharp
public class StateTypeConverter : TypeConverter
{
	public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
	{
		return sourceType == typeof (String);
	}

	public override object ConvertFrom(ITypeDescriptorContext context, CultureInfo culture, object value)
	{
		return State.Find(value);
	}
}
```

With this, you can now set use this in your NVelocity view:

``` erb
$Form.Select("mydata.states", $states, "%{multiple='multiple', size='10}")
```

and when you bind the mydata prefix in your controller, the states property will use the StateTypeConverter to appropriately convert from string to State.
