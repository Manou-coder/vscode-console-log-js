import * as assert from 'assert'
import { beforeEach } from 'mocha'
import * as path from 'path'

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode'
import { writeConsoleLog } from '../../utils/disposables'
import { checkIsEditorOpenAndIfIsJsFile } from '../../utils/functions'
// import * as myExtension from '../../extension';

let document: any = null

suite('Extension Test Suite', async () => {
  beforeEach(async () => {
    vscode.window.showInformationMessage('Start all tests.')
    const fileName = 'sample-test.ts'
    const filePath = path.join(__dirname, `../../../src/test/suite/${fileName}`)
    document = await vscode.workspace.openTextDocument(filePath)
  })

  suite('Check if editor is open and file is a JS file', async () => {
    test('Should return null if editor is not active', async () => {
      const editor: vscode.TextEditor | undefined = undefined
      writeConsoleLog()
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const result = checkIsEditorOpenAndIfIsJsFile(editor)
      assert.equal(result, null, 'editor not active')
    })

    test('Should return the editor if it is active and a JS file', async () => {
      const fileNameTxt = 'sample-test.txt'
      const filePathTxt = path.join(
        __dirname,
        `../../../src/test/suite/${fileNameTxt}`
      )
      const documentTxt = await vscode.workspace.openTextDocument(filePathTxt)
      const editor = await vscode.window.showTextDocument(documentTxt)
      const result = checkIsEditorOpenAndIfIsJsFile(editor)
      assert.equal(result, null, 'not a JS file')
    })
  })

  test('writeConsoleLog should insert console.log statement', async () => {
    const editor = await vscode.window.showTextDocument(document)
    const testText = document.lineAt(0).text
    const expectedOutput = "const one = 1\r\nconsole.log('one: ', one)\r\n"
    // set the selection to cover the entire document
    // const end = document.lineAt(document.lineCount - 1).range.end
    // const end = new vscode.Position(0, 10)
    const position = new vscode.Position(0, 6)
    // const selection = new vscode.Selection(new vscode.Position(0, 7), end)
    // editor.selection = selection
    const selection = new vscode.Selection(position, position)
    editor.selection = selection

    // run writeConsoleLog command

    writeConsoleLog()

    await new Promise((resolve) => setTimeout(resolve, 1000))

    // check that the expected output was inserted
    const output = document.getText()
    assert.equal(output, expectedOutput)
  }).timeout(5000)
})
