---
title: The humour of programmers
disqus_identifier: 2007-06-the-humour-of-programmers
comments: true
---

A partial stack trace of Resharper build 351 on Visual Studio 2005:

``` console
JetBrains.ReSharper.Util.InternalErrorException: Shit happened
Shit happened ---> JetBrains.ReSharper.Util.InternalErrorException: Shit happened

at JetBrains.ReSharper.Util.Logger.LogError(String) in c:\Agent\work\Server\ReSharper2.5\src\Util\src\Logger.cs:line 389 column 7
at JetBrains.ReSharper.VS.ProjectModel.WebProjectReferenceManager.ProcessAssemblyReferences(AssemblyReferenceProcessor) in c:\Agent\work\Server\ReSharper2.5\src\VS\src\ProjectModel\WebProjectReferenceManager.cs:line 415 column 9
at JetBrains.ReSharper.VS.ProjectModel.WebProjectReferenceManager.PopulateReferences() in c:\Agent\work\Server\ReSharper2.5\src\VS\src\ProjectModel\WebProjectReferenceManager.cs:line 449 column 7
at JetBrains.ReSharper.VS.ProjectModel.WebProjectReferenceManager.UpdateAssemblyReferences() in c:\Agent\work\Server\ReSharper2.5\src\VS\src\ProjectModel\WebProjectReferenceManager.cs:line 207 column 7
at JetBrains.ReSharper.Shell.<>c_DisplayClass1.<Invoke>b_0() in c:\Agent\work\Server\ReSharper2.5\src\Shell\src\Invocator.cs:line 225 column 33
at System.RuntimeMethodHandle._InvokeMethodFast(Object, Object[], SignatureStruct&, MethodAttributes, RuntimeTypeHandle)
at System.RuntimeMethodHandle.InvokeMethodFast(Object, Object[], Signature, MethodAttributes, RuntimeTypeHandle)
at System.Reflection.RuntimeMethodInfo.Invoke(Object, BindingFlags, Binder, Object[], CultureInfo, Boolean)
at System.Delegate.DynamicInvokeImpl(Object[])
at System.Windows.Forms.Control.InvokeMarshaledCallbackDo(ThreadMethodEntry)
at System.Windows.Forms.Control.InvokeMarshaledCallbackHelper(Object)
at System.Threading.ExecutionContext.runTryCode(Object)
at System.Runtime.CompilerServices.RuntimeHelpers.ExecuteCodeWithGuaranteedCleanup(TryCode, CleanupCode, Object)
at System.Threading.ExecutionContext.RunInternal(ExecutionContext, ContextCallback, Object)
at System.Threading.ExecutionContext.Run(ExecutionContext, ContextCallback, Object)
at System.Windows.Forms.Control.InvokeMarshaledCallback(ThreadMethodEntry)
at System.Windows.Forms.Control.InvokeMarshaledCallbacks()
at System.Windows.Forms.Control.WndProc(Message&)
at System.Windows.Forms.ScrollableControl.WndProc(Message&)
at System.Windows.Forms.ContainerControl.WndProc(Message&)
at System.Windows.Forms.Form.WndProc(Message&)
at System.Windows.Forms.ControlNativeWindow.OnMessage(Message&)
at System.Windows.Forms.ControlNativeWindow.WndProc(Message&)
at System.Windows.Forms.NativeWindow.DebuggableCallback(IntPtr, Int32, IntPtr, IntPtr)
at System.Windows.Forms.UnsafeNativeMethods.CallWindowProc(IntPtr, IntPtr, Int32, IntPtr, IntPtr)
at System.Windows.Forms.NativeWindow.DefWndProc(Message&)
at System.Windows.Forms.NativeWindow.WndProc(Message&)
at JetBrains.ReSharper.Shell.VSIntegration.MyMainWindow.WndProc(Message&) in c:\Agent\work\Server\ReSharper2.5\src\VSAddin\src\Shell\VSShell.cs:line 136 column 15
at System.Windows.Forms.NativeWindow.Callback(IntPtr, Int32, IntPtr, IntPtr)
at System.Windows.Forms.NativeWindow.DefWndProc(Message&)
at System.Windows.Forms.NativeWindow.WndProc(Message&)
at JetBrains.ReSharper.CommonControls.WindowListener.WndProc(Message&) in c:\Agent\work\Server\ReSharper2.5\src\CommonControls\src\Utils\WindowListener.cs:line 37 column 5
at System.Windows.Forms.NativeWindow.DebuggableCallback(IntPtr, Int32, IntPtr, IntPtr)
```

via <http://www.jetbrains.net/jira/browse/RSRP-36491>
