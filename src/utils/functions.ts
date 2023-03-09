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
  const currentLineContent = document.lineAt(currentLine)
  const indentMatch = currentLineContent.text.match(/^\s*/)
  const indent = indentMatch ? indentMatch[0] : ''
  return indent
}

export const checkIsEditorOpenAndIfIsJsFile = (
  editor: vscode.TextEditor | undefined
) => {
  if (!editor) {
    vscode.window.showInformationMessage('not editor active')
    return null
  }
  if (!isJsFile(editor)) {
    vscode.window.showInformationMessage('not js file')
    return null
  }
  return editor
}
