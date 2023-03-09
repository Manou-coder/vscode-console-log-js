import * as vscode from 'vscode'
import { extname } from 'path'
import { getIndent, isFileContainsSemi, isJsFile } from './utils/functions'
import { disposable1, disposable2, disposable3 } from './utils/disposables'

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "console-log-js" is now active!')
  // write console.log
  context.subscriptions.push(disposable1)
  // comment console.log
  context.subscriptions.push(disposable2)
  // delete console.log
  context.subscriptions.push(disposable3)
}

// This method is called when your extension is deactivated
export function deactivate() {}
