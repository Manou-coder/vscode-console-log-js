import * as vscode from 'vscode';
import { extname } from 'path';


export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "console-log-js" is now active!');
  // write console.log
  context.subscriptions.push(disposable1);
  // comment console.log
  context.subscriptions.push(disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() {}


export const disposable1 = vscode.commands.registerCommand(
  'console-log-js.writeConsoleLog',
  () => {
    const writeConsoleLog = () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      if (!isJsFile(editor)) {
        return;
      }
      let words = [''];
      const document = editor.document;
      const selection = editor.selection;
      const position = selection.active;
      const wordRange = document.getWordRangeAtPosition(position);
      if (!selection.isEmpty) {
        console.log('selection not empty');
        words[0] = document.getText(selection);
        const wordsSelected = document.getText(selection);
        console.log('wordsSelected: ', wordsSelected);
        const wsArray = wordsSelected.trim().split('');
        console.log('wsArray: ', wsArray);
        if (
          (wsArray[0] === '{' || wsArray[0] === '[') &&
          (wsArray[wsArray.length - 1] === '}' ||
            wsArray[wsArray.length - 1] === ']')
        ) {
          console.log('that is object');
          const wsArrayOnlyAlphabetic = wsArray.filter((element) => {
            return (
              (element.trim() !== '' && element.match(/\w+/i)) ||
              element.includes(',')
            );
          });
          console.log('wsArrayOnlyAlphabetic: ', wsArrayOnlyAlphabetic);
          words = wsArrayOnlyAlphabetic.join('').split(',');
        }
      } else {
        console.log('selection empty');
        words[0] = document.getText(wordRange);
      }
      const currentLine = position.line;
      const indent = getIndent(document, position);
      console.log('indent: ', indent);

      const semi = isFileContainsSemi(document) ? ';' : '';
      if (!wordRange && selection.isEmpty) {
        const message = `${indent}console.log()${semi}`;
        console.log('no word range');
        const newLine = new vscode.Position(currentLine, 0);
        editor.edit((editBuilder) => {
          editBuilder.insert(newLine, message);
        });
      } else {
        console.log('word range existe');
        const newLine = new vscode.Position(currentLine + 1, 0);
        let message = '';
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          message += `${indent}console.log('${word}: ', ${word})${semi}\n`;
        }
        console.log('message: ', message);
        editor.edit((editBuilder) => {
          editBuilder.insert(newLine, message);
        });
      }
    };
    writeConsoleLog();
  }
);

export const disposable2 = vscode.commands.registerCommand(
  'console-log-js.commentConsoleLog',
  () => {
    const commentConsoleLogs = () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      if (!isJsFile(editor)) {
        return;
      }
      const document = editor.document;
      let count = 0;
      editor.edit((editBuilder) => {
        for (let i = 0; i < document.lineCount; i++) {
          const line = document.lineAt(i);
          if (line.text.includes('console.log')) {
            console.log('line: ', line);
            const indentationMatch = line.text.match(/^\s*/);
            const indentation = indentationMatch ? indentationMatch[0] : '';
            const lineTextTrim = line.text.trim();
            const commentedLine = `${indentation}// ${lineTextTrim}`;
            editBuilder.replace(line.range, commentedLine);
            count++;
          }
        }
      });
      vscode.window.showInformationMessage(
        `Commented ${count} console.log statements.`
      );
    };
    commentConsoleLogs();
  }
);


export const isJsFile = (editor: vscode.TextEditor) => {
  const filePath = editor.document.uri.fsPath;
  const fileExtension = extname(filePath);
  const jsExtensions = ['.js', '.jsx', '.ts', '.tsx'];
  return jsExtensions.includes(fileExtension);
};

export const isFileContainsSemi = (document: vscode.TextDocument) => {
  const textFile = document.getText();
  return textFile.includes(';');
};

export const getIndent = (
  document: vscode.TextDocument,
  position: vscode.Position
) => {
  let newLine: vscode.TextLine | null = null;
  let nextLine = position.line + 1;
  while (
    nextLine < document.lineCount &&
    !document.lineAt(nextLine).text.trim()
  ) {
    nextLine++;
  }
  const nextLineContent =
    nextLine < document.lineCount ? document.lineAt(nextLine) : null;
  const firstCharacterIndex = nextLineContent?.firstNonWhitespaceCharacterIndex;
  const firstCharacter =
    nextLineContent?.text[firstCharacterIndex ? firstCharacterIndex : 0];
  const isFirstCharacterAlphabetic = firstCharacter?.match(/\w+/i);
  if (isFirstCharacterAlphabetic) {
    newLine = nextLineContent;
  } else {
    let previousLine = position.line;
    while (
      previousLine < document.lineCount &&
      !document.lineAt(previousLine).text.trim()
    ) {
      previousLine--;
    }
    const previousLineContent = document.lineAt(previousLine);
    newLine = previousLineContent;
  }
  const indentMatch = newLine?.text.match(/^\s*/);
  const indent = indentMatch ? indentMatch[0] : '';
  return indent;
};
