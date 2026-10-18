# ContextPack

<p align='center'>
  <img src='assets/icon.png' alt='Extension Icon' style="width:50%">
</p>

## Overview

ContextPack is a Visual Studio Code extension that copies the contents of all selected files in the Explorer to the clipboard in one click. It is built for sharing code with AI assistants: select the files, right-click, paste the result into a chat.

## Features

- **Multi-file copy**: Select any number of files in the Explorer and copy their contents at once from the context menu.
- **Folder support**: Selected folders are expanded recursively, so all files inside them are included.
- **Simple output format**: Every file is written as its relative path followed by a colon and the file contents.
- **Safe by default**: Binary files and files larger than 1 MB are skipped, and the notification tells you how many were skipped.
- **Configurable ignore list**: Folders such as `node_modules` or `.git` are skipped when a folder is expanded, and the list can be changed in settings.

## Technologies Used

- TypeScript
- Visual Studio Code Extension API
- esbuild
- VSCE (Visual Studio Code Extension packaging tool)

## Getting Started

To get started with ContextPack, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/NikitaBerezhnyj/ContextPack.git
   ```

2. Navigate to the project folder:

   ```bash
   cd ContextPack
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Press `F5` to open debug extension

## Build

For build extension follow this steps:

1. Build the extension:

   ```bash
   npm run vsix
   ```

2. Install the extension in Visual Studio Code using the **"Install from VSIX"** option.

## Usage

Once ContextPack is installed:

1. Open Visual Studio Code with a workspace folder.
2. Select one or more files or folders in the Explorer.
3. Right-click the selection and choose **Copy Contents of Files**.
4. Paste the result wherever you need it. The output looks like this:

   ```text
   src/index.js:
   console.log("Hello World!");

   src/utils.js:
   export const sum = (a, b) => a + b;
   ```

5. A notification shows how many files were copied and how many were skipped.

Files you select explicitly are always included, unless they are binary or larger than 1 MB. The ignore list only applies to the contents of selected folders.

### Settings

- `copyFileContents.ignoredFolders` — folder names that are skipped when a selected folder is expanded (for example `node_modules`, `.git`, `dist`).

## License & Community Guidelines

- [License](LICENSE) — project license.
- [Code of Conduct](CODE_OF_CONDUCT.md) — expected behavior for contributors.
- [Contributing Guide](CONTRIBUTING.md) — how to help the project.
- [Security Policy](SECURITY.md) — reporting security issues.
