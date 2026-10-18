# ContextPack

<p align='center'>
  <img src='https://raw.githubusercontent.com/NikitaBerezhnyj/ContextPack/main/assets/icon.png' alt='Extension Icon' style="width:50%">
</p>

ContextPack is a lightweight extension for Visual Studio Code that copies the contents of multiple files and folders to the clipboard in one click.

Select files in the Explorer, right-click, and paste everything into your AI assistant, a bug report, or a note, without opening and copying files one by one.

## 🌟 Features

- **Multi-file copy**: Select any number of files in the Explorer and copy their contents at once from the context menu.
- **Folder support**: Selected folders are expanded recursively, so every file inside is included.
- **Simple output format**: Each file is written as its relative path, a colon, and the file contents.
- **Safe by default**: Binary files and files larger than 1 MB are skipped, and you are told how many were skipped.
- **Configurable ignore list**: Folders like `node_modules` or `.git` are skipped when a folder is expanded, and the list can be changed in settings.

## 🚀 Usage

1. Select one or more files or folders in the Explorer.
2. Right-click the selection and choose **Copy Contents of Files**.
3. Paste the result wherever you need it:

```text
src/index.js:
console.log("Hello World!");

src/utils.js:
export const sum = (a, b) => a + b;
```

Files you select explicitly are always included, unless they are binary or larger than 1 MB. The ignore list only applies to the contents of selected folders.

## ⚙️ Settings

- `copyFileContents.ignoredFolders`: folder names skipped when a selected folder is expanded.

## ℹ️ Additional Information

- **Dependencies**: None.
- **Current Version**: 1.0.0.
- **Source Code**: [GitHub Repository](https://github.com/NikitaBerezhnyj/ContextPack).
