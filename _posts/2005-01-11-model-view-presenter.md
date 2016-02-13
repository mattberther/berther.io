---
title: Model View Presenter
disqus_identifier: 2005-01-model-view-presenter
comments: true
---

Martin Fowler has introduced several new enterprise patterns for his new book. The one that has intrigued me the most so far is [Model View Presenter][1].

Model View Presenter separates the behaviour of a presentation from the view while allowing the view to receive user events.

Take the code below as an example:

``` csharp
public interface IMyView
{
    string FirstName { get; set; }
    string LastName { get; set; }

    string FullName { get; set; }
}

public class MyPage1 : System.Web.UI.Page, IMyView
{
    IMyView.FirstName
    {
        get { return txtFirstName.Text; }
        set { txtFirstName.Text = value; }
    }

    IMyView.LastName
    {
        get { return txtLastName.Text; }
        set { txtLastName.Text = value; }
    }

    IMyView.FullName
    {
        get { return fullNameLabel.Text = value; }
        set { fullNameLabel.Text = value; }
    }

    void btnButton_Click(object sender, EventArgs e)
    {
        // this would probably be a class level declaration
        // so that it is not recreated every time. In this trivial example,
        // it doesnt matter
        MyPresenter presenter = new MyPresenter(this);
        presenter.CreateFullName();
    }
}

public class MyPresenter
{
    private IMyView view;

    public MyPresenter(IMyView view)
    {
        this.view = view;
    }

    public void CreateFullName()
    {
        view.FullName = String.Format("{0} {1}", view.FirstName, view.LastName);
    }
}
```

At this point, the Concrete View contains all the UI widgets. Since we do not have any UI components in our View interface, this would make the view and the presenter truly portable.

All of our business logic is contained in the Presenter. We could take the Presenter and the IMyView interface and create a winforms application just as easily. Even better, since we've completely abstracted the view and made it as dumb as possible, we could easily test our application as well.

Since we're using Constructor Injection ([Type 3 Inversion of Control][2]), we can easily create a MockView that derives from IMyView that merely contains accessor variables for the properties. Our test then passes the MockView object into the MyPresenter object. With that, we're able to completely test the presenter.

I'm looking forward to investigating this pattern more, and hope to show a working sample using this pattern soon.

[1]:http://martinfowler.com/eaaDev/ModelViewPresenter.html
[2]:http://www.martinfowler.com/articles/injection.html
