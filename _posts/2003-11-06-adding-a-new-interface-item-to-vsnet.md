---
title: Adding a new interface item to VS.NET
disqus_identifier: 2003-11-adding-a-new-interface-item-to-vsnet
comments: true
---

One of the things that has bothered me for quite some time about Visual Studio .NET was the inability to be able to create a new interface file via the Add New Items wizard.

VS.NET's extensibility has once again come to my rescue.

If you want to be able to create new interface files from VS.NET follow the following steps:

1. Using Windows Explorer, locate your installation root (unless you changed it from the default, this will be C:\Program Files\Microsoft Visual Studio .NET 2003)
2. Inside your VC# folder, you will see a CSharpProjectItems folder. Go ahead and open the LocalProjectItems.vsdir file inside this folder with your favorite text editor.
3. Add the line: `..\CSharpAddInterfaceWiz.vsz|{FAE04EC1-301F-11d3-BF4B-00C04F79EFBC}|Interface|20|Interface|{FAE04EC1-301F-11d3-BF4B-00C04F79EFBC}|4515|0|Interface.cs` to the bottom of this file. With this line, I am placing the New Interface item directly after the New Class item. You can change the number in the 4th bar delimited position (20 in this case) to place the item wherever you would like.
4. (Optional) Add the same line to the code.vsdir file inside the Code folder. By doing this, you will also see the interface item when viewing the Code folder. When adding the line to this file, you will need to add another ..\ to the beginning of the line, because this folder is one level deeper in the heirarchy.
5. Moving back to the installation root/VC#/CSharpProjectItems, create a file named `CSharpAddInterfaceWiz.vsz`. The contents of this file are as follows:

``` console
VSWIZARD 7.0  
Wizard=VsWizard.VsWizardEngine.7.1  
Param="WIZARD_NAME = CSharpAddInterfaceWiz"  
Param="WIZARD_UI = FALSE"  
Param="PROJECT_TYPE = CSPROJ"
```

Lastly, extract the contents of [this zip file][1] to your installation root/VC#/VC#Wizards. Your template interface is located in this zip file (templates/1033/Interface.cs). Feel free to modify this as needed.

If you would like interface items to also be available to web projects, you will need to perform steps 3 and 4 in the WebProjectItems folder.

This guide assumes you are using Visual Studio .NET 2003, if you are using 2002, make sure you change the Wizard= line of CSharpAddInterfaceWiz.vsz to VsWizard.VsWizardEngine. Lastly, these steps detail the process for C#, although the process could be similiarly applied to VB.NET projects.

Enjoy!

[1]:/uploads/2003/11/CSharpAddInterfaceWiz.zip
