import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand(
    "copyFileContents.copy",
    async (clicked?: vscode.Uri, selected?: vscode.Uri[]) => {
      const uris = selected?.length ? selected : clicked ? [clicked] : [];
      const decoder = new TextDecoder();
      const parts: string[] = [];

      for (const uri of uris) {
        const stat = await vscode.workspace.fs.stat(uri);
        if (stat.type !== vscode.FileType.File) {
          continue;
        }

        const bytes = await vscode.workspace.fs.readFile(uri);
        const relativePath = vscode.workspace.asRelativePath(uri);

        parts.push(`${relativePath}:\n${decoder.decode(bytes)}`);
      }

      await vscode.env.clipboard.writeText(parts.join("\n\n"));
      vscode.window.showInformationMessage(`ContextPack: Copied ${parts.length} file(s)`);
    }
  );

  context.subscriptions.push(command);
}

export function deactivate() {}
