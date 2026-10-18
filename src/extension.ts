import * as vscode from "vscode";

const MAX_FILE_SIZE = 1024 * 1024;

function isBinary(bytes: Uint8Array): boolean {
  return bytes.subarray(0, 8000).includes(0);
}

async function collectFiles(uri: vscode.Uri, ignored: Set<string>): Promise<vscode.Uri[]> {
  const stat = await vscode.workspace.fs.stat(uri);

  if (stat.type === vscode.FileType.File) {
    return [uri];
  }

  if (stat.type === vscode.FileType.Directory) {
    const entries = await vscode.workspace.fs.readDirectory(uri);
    const nested = await Promise.all(
      entries
        .filter(([name]) => !ignored.has(name))
        .map(([name]) => collectFiles(vscode.Uri.joinPath(uri, name), ignored))
    );
    return nested.flat();
  }

  return [];
}

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand(
    "copyFileContents.copy",
    async (clicked?: vscode.Uri, selected?: vscode.Uri[]) => {
      const roots = selected?.length ? selected : clicked ? [clicked] : [];
      const ignored = new Set(
        vscode.workspace.getConfiguration("copyFileContents").get<string[]>("ignoredFolders", [])
      );
      const files = (await Promise.all(roots.map(root => collectFiles(root, ignored)))).flat();
      const decoder = new TextDecoder();
      const parts: string[] = [];
      let skipped = 0;

      for (const uri of files) {
        try {
          const bytes = await vscode.workspace.fs.readFile(uri);

          if (bytes.length > MAX_FILE_SIZE || isBinary(bytes)) {
            skipped++;
            continue;
          }

          const relativePath = vscode.workspace.asRelativePath(uri);
          parts.push(`${relativePath}:\n${decoder.decode(bytes)}`);
        } catch {
          skipped++;
        }
      }

      await vscode.env.clipboard.writeText(parts.join("\n\n"));

      const message = `ContextPack: Copied ${parts.length} file(s)`;
      vscode.window.showInformationMessage(skipped ? `${message}, skipped ${skipped}` : message);
    }
  );

  context.subscriptions.push(command);
}

export function deactivate() {}
