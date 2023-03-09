import * as vscode from 'vscode'
import { extname } from 'path'

export const isJsFile = (editor: vscode.TextEditor) => {
  const filePath = editor.document.uri.fsPath
  const fileExtension = extname(filePath)
  const jsExtensions = ['.js', '.jsx', '.ts', '.tsx']
  return jsExtensions.includes(fileExtension)
}

export const isFileContainsSemi = (document: vscode.TextDocument) => {
  const textFile = document.getText()
  return textFile.includes(';')
}

export const getIndent = (
  document: vscode.TextDocument,
  position: vscode.Position
) => {
  const currentLine = position.line
  console.log('currentLine: ', currentLine)
  const currentLineContent = document.lineAt(currentLine)
  const indentMatch = currentLineContent.text.match(/^\s*/)
  const indent = indentMatch ? indentMatch[0] : ''
  return indent
}
