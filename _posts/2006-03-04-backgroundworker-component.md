---
title: BackgroundWorker component
disqus_identifier: 2006-03-backgroundworker-component
comments: true
---

More and more, Im spending time in .NET 2.0 and more and more Im finding *really* cool things. The latest one I found was the BackgroundWorker component. This is probably old hat to most of you, but I was really impressed to see this. From the MSDN documentation:

>The BackgroundWorker class allows you to run an operation on a separate, dedicated thread. Time-consuming operations like downloads and database transactions can cause your user interface (UI) to seem as though it has stopped responding while they are running. When you want a responsive UI and you are faced with long delays associated with such operations, the BackgroundWorker class provides a convenient solution.

>To execute a time-consuming operation in the background, create a BackgroundWorker and listen for events that report the progress of your operation and signal when your operation is finished. You can create the BackgroundWorker programmatically or you can drag it onto your form from the Components tab of the Toolbox. If you create the BackgroundWorker in the Windows Forms Designer, it will appear in the Component Tray, and its properties will be displayed in the Properties window.

>To set up for a background operation, add an event handler for the DoWork event. Call your time-consuming operation in this event handler. To start the operation, call RunWorkerAsync. To receive notifications of progress updates, handle the ProgressChanged event. To receive a notification when the operation is completed, handle the RunWorkerCompleted event.

Instantiating code on a background thread is as simple as this:

``` csharp
private void button1_Click(object sender, EventArgs e)
{
    BackgroundWorker worker = new BackgroundWorker();
    worker.DoWork += new DoWorkEventHandler(worker_DoWork);
    worker.RunWorkerCompleted += new RunWorkerCompletedEventHandler(worker_RunWorkerCompleted);
    worker.RunWorkerAsync();
}

private void worker_DoWork(object sender, DoWorkEventArgs e)
{
    // This is the method that gets executed on a background thread.
    // Since you should not update the UI from a thread, make sure
    // you use the RunWorkerCompleted handler if you need to do that.
    // You can assign e.Result to a value which can be used in that handler.
    SomeLongRunningWebServiceCall();
}

private void worker_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
{
    // this is back on the main UI thread, so you can update the UI
    // e.Result is assigned to whatever you've assigned it to in the
    // DoWork handler
}
```

How cool and easy is that?
