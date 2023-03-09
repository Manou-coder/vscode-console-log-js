import * as vscode from 'vscode'
import {
  checkIsEditorOpenAndIfIsJsFile,
  getIndent,
  isFileContainsSemi,
  isJsFile,
} from './functions'
export const disposable1 = vscode.commands.registerCommand(
  'console-log-js.writeConsoleLog',
  () => {
    writeConsoleLog()
  }
)

export const disposable2 = vscode.commands.registerCommand(
  'console-log-js.commentConsoleLog',
  () => {
    commentConsoleLogs()
  }
)

export const disposable3 = vscode.commands.registerCommand(
  'console-log-js.removeConsoleLog',
  () => {
    removeConsoleLogs()
  }
)

// FUNCTIONS

export const writeConsoleLog = () => {
  const editor = checkIsEditorOpenAndIfIsJsFile(vscode.window.activeTextEditor)
  if (!editor) return
  let words = ['']
  const document = editor.document
  const selection = editor.selection
  const position = selection.active
  const wordRange = document.getWordRangeAtPosition(position)
  if (!selection.isEmpty) {
    words[0] = document.getText(selection)
    const wordsSelected = document.getText(selection)
    const wsArray = wordsSelected.trim().split('')
    if (
      (wsArray[0] === '{' || wsArray[0] === '[') &&
      (wsArray[wsArray.length - 1] === '}' ||
        wsArray[wsArray.length - 1] === ']')
    ) {
      const wsArrayOnlyAlphabetic = wsArray.filter((element) => {
        return (
          (element.trim() !== '' && element.match(/\w+/i)) ||
          element.includes(',')
        )
      })
      words = wsArrayOnlyAlphabetic.join('').split(',')
    }
  } else {
    words[0] = document.getText(wordRange)
  }
  const currentLine = position.line
  // console.log('currentLine: ', currentLine);
  const indent = getIndent(document, position)

  const semi = isFileContainsSemi(document) ? ';' : ''
  if (!wordRange && selection.isEmpty) {
    const message = `${indent}console.log()${semi}`
    const newPosition = new vscode.Position(currentLine, 0)
    editor.edit((editBuilder) => {
      editBuilder.insert(newPosition, message)
    })
  } else {
    const newLine = currentLine + 1
    const newPosition = new vscode.Position(newLine, 0)
    let message = ''
    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      message += `${indent}console.log('${word}: ', ${word})${semi}\n`
    }
    editor.edit((editBuilder) => {
      editBuilder.insert(newPosition, message)
    })
  }
}

export const commentConsoleLogs = () => {
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    return
  }
  if (!isJsFile(editor)) {
    return
  }
  const document = editor.document
  let count = 0
  editor.edit((editBuilder) => {
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i)
      if (line.text.includes('console.log')) {
        const indentationMatch = line.text.match(/^\s*/)
        const indentation = indentationMatch ? indentationMatch[0] : ''
        const lineTextTrim = line.text.trim()
        const commentedLine = `${indentation}// ${lineTextTrim}`
        editBuilder.replace(line.range, commentedLine)
        count++
      }
    }
  })
  vscode.window.showInformationMessage(
    `Commented ${count} console.log statements.`
  )
}

const removeConsoleLogs = () => {
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    return
  }
  if (!isJsFile(editor)) {
    return
  }
  const document = editor.document
  let count = 0
  editor.edit((editBuilder) => {
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i)
      const lineTextTrim = line.text.trim()
      if (line.text.includes('console.log') && lineTextTrim.match(/^console/)) {
        editBuilder.delete(line.rangeIncludingLineBreak)
        count++
      }
    }
  })
  vscode.window.showInformationMessage(
    `Removed ${count} console.log statements.`
  )
}
